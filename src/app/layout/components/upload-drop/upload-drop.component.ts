import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AssetService } from 'src/services/asset.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { UploadFileModel } from 'src/models/app/upload-file-model';
import { ITypedBaseResponse } from 'src/models/IBaseResponse';
import { AssetSimple } from 'src/models/namespace/asset-simple';

@Component({
  selector: 'app-upload-drop',
  templateUrl: './upload-drop.component.html',
  styleUrls: ['./upload-drop.component.scss'],
  providers: [AssetService],
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
export class UploadDropComponent implements OnInit {

  uploadFiles: Array<UploadFileModel> = [];

  @Input() currentPath;
  @Output() FileUploaded: EventEmitter<ITypedBaseResponse<AssetSimple>> =
    new EventEmitter<ITypedBaseResponse<AssetSimple>>();

  constructor() { }

  ngOnInit() { }

  onFileUploaded(fileInfo: ITypedBaseResponse<AssetSimple>) {
    this.FileUploaded.emit(fileInfo);
  }

  fileDrop(dropped: NgxFileDropEntry[]): void {
    this.uploadFiles = [];

    if (!dropped || dropped.length <= 0) { return; }
    dropped.forEach(currentDropped => {
      if (currentDropped.fileEntry.isFile) {
        const fileEntry = currentDropped.fileEntry as FileSystemFileEntry;

        fileEntry.file((file: File) => {
          this.uploadFiles.push({ file, currentPath: this.currentPath, relativePath: currentDropped.relativePath });
        });
      } else if (currentDropped.fileEntry.isDirectory) {
        const dirEntry = currentDropped.fileEntry as FileSystemDirectoryEntry;
        dirEntry.createReader().readEntries(fse => {
          fse.forEach(entry => {
            if (entry.isFile) {
              const fileEntry = entry as FileSystemFileEntry;

              fileEntry.file((file: File) => {
                this.uploadFiles.push({ file, currentPath: this.currentPath, relativePath: currentDropped.relativePath });
              });
            }
          });
        });
      }
    });
  }
}
