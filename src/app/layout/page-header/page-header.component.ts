import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbItem, BreadCrumbItemType } from 'src/models/app/breadcrumb-item';
import { NamespaceService } from 'src/services/namespace.service';
import { NamespaceSimple } from 'src/models/namespace/namespace-simple';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  providers: [NamespaceService]
})
export class PageHeaderComponent implements OnInit {

  @Input() subTitle: string;

  breadcrumbTrail: MenuItem[];



  @Input() set breadcrumbItem(breadcrumbItem: BreadcrumbItem) {
    this.namespaceService.getTree().subscribe(treeData => {
      if (!breadcrumbItem) { return; }

      let path = breadcrumbItem.path.split('/');
      if (!path[0]) { path = path.slice(1); }

      this.breadcrumbTrail = path.map((p, idx, arr) => {
        const fullPath = '/' + path.slice(0, idx + 1).join('/');

        const treeItem = this.findTreeRecursive(treeData.result, fullPath);
        const treeId = treeItem ? treeItem.id : 0;

        if (idx === 0) {
          let storageType = localStorage.getItem('RootFolder');
          if (!storageType) { storageType = 'Personal Folders'; }
          if (storageType === 'Favorite') {
            return { routerLink: '/catalogue/favorite', label: `Catalogue (${storageType})` };
          } else {
            return { routerLink: '/catalogue', label: `Catalogue (${storageType})` };
          }
        } else if (idx === arr.length - 1) {
          if (breadcrumbItem.type === BreadCrumbItemType.Namespace) {
            return { routerLink: `/catalogue/${treeId}`, label: p };
          } else if (breadcrumbItem.type === BreadCrumbItemType.Asset) {
            return { label: p, diabled: true };
          } else {
            return { label: p };
          }
        } else {
          return { routerLink: `/catalogue/${treeId}`, label: p };
        }
      });
    });

  }

  constructor(private namespaceService: NamespaceService) { }

  ngOnInit() {
    if (!this.subTitle) {
      this.subTitle = 'Welcome back';
    }

  }

  findTreeRecursive(treeData: NamespaceSimple[], findPath: string) {
    let item = null;
    if (!treeData) { return null; }

    item = treeData.find(t => t.path.toLowerCase() === findPath.toLowerCase());
    if (item) { return item; }

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < treeData.length; i++) {
      const currentTree = treeData[i];
      if (!currentTree.namespaces) { continue; }

      item = this.findTreeRecursive(currentTree.namespaces, findPath);
      if (item) { return item; }
    }

    return null;
  }

}

