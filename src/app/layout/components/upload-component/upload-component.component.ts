import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AssetService } from 'src/services/asset.service';
import { UploadFileModel } from 'src/models/app/upload-file-model';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs/operators';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { ITypedBaseResponse } from 'src/models/IBaseResponse';
import { AssetSimple } from 'src/models/namespace/asset-simple';

@Component({
  selector: 'app-upload-component',
  templateUrl: './upload-component.component.html',
  styleUrls: ['./upload-component.component.scss'],
  providers: [AssetService, MessageService],
  styles: [`
        :host ::ng-deep .drag-column {
            padding-right: .5em;
        }
        :host ::ng-deep .drop-column {
            border: 1px solid #c8c8c8;
            background-color: #ffffff;
        }
        .ui-g li {
            list-style-type: none;
            padding: 10px;
            margin-bottom: 5px;
            border: 1px solid #c8c8c8;
            background-color: #ffffff;
        }

        :host ::ng-deep button {
            margin-right: .25em;
        }

        :host ::ng-deep .custom-toast .ui-toast-message {
            color: #ffffff;
            background: #FC466B;
            background: -webkit-linear-gradient(to right, #3F5EFB, #FC466B);
            background: linear-gradient(to right, #3F5EFB, #FC466B);
        }

        :host ::ng-deep .custom-toast .ui-toast-close-icon {
            color: #ffffff;
        }
    `]
})
export class UploadComponentComponent implements OnInit {

  currentFile: File;
  uploadStatus: string;
  progress = 0;

  @Input() set UploadModel(uploadModel: UploadFileModel) {
    this.doUpload(uploadModel);
  }

  @Output() FileUploaded: EventEmitter<ITypedBaseResponse<AssetSimple>> =
    new EventEmitter<ITypedBaseResponse<AssetSimple>>();

  constructor(
    private assetService: AssetService,
    private messageService: MessageService) { }

  ngOnInit() { }

  doUpload(uploadModel: UploadFileModel) {
    this.currentFile = uploadModel.file;
    const formData: FormData = new FormData();

    formData.append('Path', uploadModel.currentPath);
    formData.append('RelativePath', uploadModel.relativePath);
    formData.append('File', uploadModel.file, uploadModel.file.name);

    this.uploadStatus = 'Uploading...';
    this.assetService.upload(formData).pipe(
      map((event: HttpEvent<any>) => this.getEventMessage(event, uploadModel.file)),
    ).subscribe();
  }

  getEventMessage(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        if (event.total > 0) {
          this.progress = Math.floor((event.loaded / event.total) * 100);
          this.uploadStatus = this.progress + '% sent';
        }
        break;
      case HttpEventType.Sent:
        this.uploadStatus = 'Uploaded waiting response';
        break;
      case HttpEventType.Response:
        const responseBody = event.body as ITypedBaseResponse<AssetSimple>;
        this.uploadStatus = 'Complete';
        this.FileUploaded.emit(responseBody);
        break;
      default:
        console.log(event.type, event);
    }
  }
}
