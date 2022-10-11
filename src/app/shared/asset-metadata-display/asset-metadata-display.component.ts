import { Component, OnInit, Input } from '@angular/core';
import { AssetMetaDataGroup } from 'src/models/asset/asset-details';

@Component({
  selector: 'app-asset-metadata-display',
  templateUrl: './asset-metadata-display.component.html',
  styleUrls: ['./asset-metadata-display.component.scss']
})
export class AssetMetadataDisplayComponent implements OnInit {

  myMetadata: AssetMetaDataGroup;
  @Input() set metadata(metadata: AssetMetaDataGroup) {
    this.myMetadata = metadata;
  }

  constructor() { }

  ngOnInit() { }

}
