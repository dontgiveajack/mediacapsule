import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NamespaceAsset } from 'src/models/namespace/namespace-details.result';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[catalog-folder]',
  templateUrl: './catalog-folder-element.component.html',
  styleUrls: ['./catalog-folder-element.component.scss']
})
export class CatalogFolderElementComponent implements OnInit {

  @Input() ns: NamespaceAsset;
  // tslint:disable-next-line: no-output-rename
  @Output('changeNamespace')
  change: EventEmitter<NamespaceAsset> = new EventEmitter<NamespaceAsset>();

  constructor() { }

  changeNamespace(ns: NamespaceAsset): void {
    this.change.emit(ns);
  }

  ngOnInit() { }
}
