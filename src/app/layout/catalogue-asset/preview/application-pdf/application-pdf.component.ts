import { Component, OnInit, Input, AfterViewInit, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { AssetService } from 'src/services/asset.service';
import { PdfJsViewerComponent } from 'ng2-pdfjs-viewer';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-application-pdf',
  templateUrl: './application-pdf.component.html',
  styleUrls: ['./application-pdf.component.scss'],
  providers: [AssetService]
})
export class ApplicationPdfComponent implements OnInit, AfterViewInit, OnDestroy {

  assetUrl: string;
  // tslint:disable-next-line: variable-name
  _assetId: number;
  // tslint:disable-next-line: variable-name
  _fileType = '';

  @ViewChildren('pdfViewWindow') pdfViewWindow: QueryList<PdfJsViewerComponent>;

  currentViewWindow: PdfJsViewerComponent;
  viewWindowSubscription: Subscription;


  @Input() set assetId(assetId: number) {
    this._assetId = assetId;
    this.loadAsset();
  }
  @Input() set fileType(fileType: string) {
    this._fileType = fileType;
    this.loadAsset();
  }

  constructor(private assetService: AssetService) { }

  ngOnInit() { }

  ngOnDestroy(): void {
    if (this.viewWindowSubscription) {
      this.viewWindowSubscription.unsubscribe();
    }
  }
  ngAfterViewInit(): void {
    this.viewWindowSubscription = this.pdfViewWindow.changes.subscribe((comps: QueryList<PdfJsViewerComponent>) => {
      this.currentViewWindow = comps.first;
      this.loadAsset();
    });
  }

  loadAsset() {
    if (!this.currentViewWindow) { return; }
    if (!this._assetId || !this._fileType) { return; }

    this.assetService.download(this._assetId).subscribe(data => {
      this.currentViewWindow.pdfSrc = data;
      this.currentViewWindow.refresh();
    });
  }

}
