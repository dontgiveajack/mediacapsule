import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AssetService } from 'src/services/asset.service';
import { AssetDetail } from 'src/models/asset/asset-details';
import { BreadCrumbItemType, BreadcrumbItem } from 'src/models/app/breadcrumb-item';
import { environment } from 'src/environments/environment';
import { DashboardReportActivity } from 'src/models/namespace/dashboard-report';

@Component({
  selector: 'app-screening-room',
  templateUrl: './catalogue-asset.component.html',
  styleUrls: ['./catalogue-asset.component.scss'],
  providers: [AssetService]
})
export class CatalogueAssetComponent implements OnInit {

  fileSize: string;
  thumbnail: any;
  hasThumbnail = false;
  asset: AssetDetail = new AssetDetail();
  breadcrumbItem: BreadcrumbItem;
  activeKey: string;
  apiRoot: string;

  chainOfCustody: DashboardReportActivity[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private assetService: AssetService) {
    this.activeKey = localStorage.getItem('token').replace(/\//g, '.');
    this.apiRoot = environment.apiUrl;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        // tslint:disable-next-line: radix
        const currentId = parseInt(params.get('id'));
        this.assetService.getDetails(currentId).subscribe(data => {
          this.asset = data.result;
          this.fileSize = '0';
          if (this.asset.content && this.asset.content.length > 0 && this.asset.content[0].size) {
            this.fileSize = this.asset.content[0].size.formattedSize;
          }

          this.breadcrumbItem = {
            id: data.result.id,
            path: data.result.path,
            type: BreadCrumbItemType.Asset
          };
        });

        this.assetService.hasThumbnail(currentId).subscribe(data => {
          this.hasThumbnail = data.result;
          if (this.hasThumbnail) {
            this.getThumbnail();
          }
        });

        this.assetService.getAssetActivity(currentId).subscribe(data => {
          this.chainOfCustody = data.result;
        });

      } else {
        this.router.navigate(['/catalogue']);
      }
    });
  }

  getThumbnail() {
    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        // tslint:disable-next-line: radix
        const currentId = parseInt(params.get('id'));

        this.assetService.getThumbnnail(currentId).subscribe(data => {
          const reader = new FileReader();
          reader.addEventListener('load', () => {
            this.thumbnail = reader.result;
          }, false);

          if (data) {
            reader.readAsDataURL(data);
          }
        });
      }
    });
  }

  displayNoPreview(): boolean {
    if (this.hasThumbnail) { return false; }
    if (this.asset && this.asset.fileType === 'video/mp4') { return false; }
    if (this.asset && this.asset.fileType === 'application/pdf') { return false; }
    return true;
  }
}
