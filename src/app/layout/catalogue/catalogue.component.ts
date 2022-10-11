import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NamespaceService } from 'src/services/namespace.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { NamespaceHierarchyResult } from 'src/models/namespace/namespace-hierarchy.result';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import * as moment from 'moment';
import { AssetService } from 'src/services/asset.service';
import { AssetNamespaceListResponse } from 'src/models/namespace/asset-namespace-list-response';
import { NamespaceSimple } from 'src/models/namespace/namespace-simple';
import { DialogService, MessageService, SortEvent, ConfirmationService, Confirmation } from 'primeng/api';
import { SelectFolderModalComponent } from 'src/app/dialogs/select-folder-modal/select-folder-modal.component';
import { SingleLineEntryComponent } from 'src/app/dialogs/single-line-entry/single-line-entry.component';
import { BreadCrumbItemType, BreadcrumbItem } from 'src/models/app/breadcrumb-item';
import { ITypedBaseResponse } from 'src/models/IBaseResponse';
import { AssetSimple } from 'src/models/namespace/asset-simple';


// tslint:disable-next-line: component-class-suffix
class RowInfo {
  id: number;
  icon: string;
  name: string;
  size: string;
  updated: Date;
  selected: boolean;
  isFavorite: boolean;
  isNamespace: boolean;
  sizeSortable: number;

  isOnline: boolean;
  isArchived: boolean;
}

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
  providers: [AuthenticationService, NamespaceService, AssetService,
    DialogService, MessageService, ConfirmationService,
    Location, { provide: LocationStrategy, useClass: PathLocationStrategy }],
  encapsulation: ViewEncapsulation.None,
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

export class CatalogueComponent implements OnInit {

  @ViewChild('myTable', { static: false }) table: any; public editTmpl: TemplateRef<any>;
  rows: Array<RowInfo> = Array();

  draggedRow: RowInfo;
  parentNamespaceId = 0;
  selected: RowInfo[] = [];
  breadcrumbItem: BreadcrumbItem;
  currentNamespaceId: number = null;
  namespaces: NamespaceHierarchyResult[] = [];
  currentNamespace: NamespaceSimple = new NamespaceSimple();

  showUpload = false;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private assetService: AssetService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private namespaceService: NamespaceService,
    private confirmationService: ConfirmationService) { }

  refreshSelected() {
    this.selected = this.rows.filter(r => r.selected);

    if (this.selected.length > 0) {
      document.getElementById('folder-actions').classList.add('d-block');
    } else {
      document.getElementById('folder-actions').classList.remove('d-block');
    }
  }

  ngOnInit() {
    this.getNamespaceContent();
  }

  private getNamespaceContent(): void {
    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        if (!isNaN(params.get('id') as any)) {
          this.showUpload = true;
          // tslint:disable-next-line: radix
          this.currentNamespaceId = parseInt(params.get('id'));
          this.namespaceService.getContent(this.currentNamespaceId).subscribe(data => this.loadData(data));
        } else if (params.get('id') === 'favorite') {
          this.showUpload = false;
          localStorage.setItem('RootFolder', 'Favorite');
          this.currentNamespaceId = null;
          this.namespaceService.getFavorites().subscribe(data => this.loadData(data));
        } else {
          this.showUpload = true;
          localStorage.setItem('RootFolder', 'Personal');
          this.currentNamespaceId = null;
          this.namespaceService.getContent(this.currentNamespaceId).subscribe(data => this.loadData(data));
        }
      } else {
        this.showUpload = true;
        this.currentNamespaceId = null;
        localStorage.setItem('RootFolder', 'Personal');
        this.namespaceService.getContent(this.currentNamespaceId).subscribe(data => this.loadData(data));
      }
    });
  }

  onFileUploaded(fileInfo: ITypedBaseResponse<AssetSimple>) {
    this.rows.push({
      id: fileInfo.result.id,
      selected: false,
      isNamespace: false,
      name: fileInfo.result.displayName,
      icon: 'fa-file',
      sizeSortable: fileInfo.result.fileSize,
      size: fileInfo.result.fileSizeFormatted,
      updated: fileInfo.result.lastModifiedOn,
      isFavorite: fileInfo.result.tags && fileInfo.result.tags.indexOf('isFavorite') > -1,
      isOnline: fileInfo.result.isOnline,
      isArchived: fileInfo.result.isArchived
    });
  }

  loadData(data: AssetNamespaceListResponse): void {
    this.rows = [];
    data.result.namespaces.forEach(a => {
      this.rows.push({
        id: a.id, selected: false,
        name: a.name,
        sizeSortable: a.size,
        size: a.sizeFormatted,
        updated: null,
        isNamespace: true, icon: 'fa-folder',
        isFavorite: false,
        isArchived: false,
        isOnline: false
      });
    });
    data.result.assets.forEach(a => {
      this.rows.push({
        id: a.id,
        selected: false,
        isNamespace: false,
        name: a.displayName,
        icon: 'fa-file',
        sizeSortable: a.fileSize,
        size: a.fileSizeFormatted,
        updated: a.lastModifiedOn,
        isFavorite: a.tags && a.tags.indexOf('isFavorite') > -1,
        isOnline: a.isOnline,
        isArchived: a.isArchived
      });
    });
    this.refreshSelected();
    this.currentNamespace = data.result.currentNamespace;
    this.parentNamespaceId = data.result.parentNamespace ? data.result.parentNamespace.id : -1;

    if (this.currentNamespace) {
      this.breadcrumbItem = {
        id: data.result.currentNamespace.id,
        path: data.result.currentNamespace.path,
        type: BreadCrumbItemType.Namespace
      };
    }
  }

  changeFavorite(id: number): void {
    const dr = this.rows.find(r => r.id === id);
    if (dr.isFavorite) {
      this.assetService.unflagFavorite(id).subscribe(response => {
        if (!response.success) {
          alert('error unsetting favorite');
        }
      });
    } else {
      this.assetService.flagFavorite(id).subscribe(response => {
        if (!response.success) {
          alert('error setting favorite');
        }
      });
    }

    dr.isFavorite = !dr.isFavorite;
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) { }


  dragFileStart(evt: Event, row: RowInfo) {
    this.draggedRow = row;
  }
  dragFileEnd(evt: Event, row: any) {
    this.draggedRow = null;
  }

  fileDrop(evt: Event, destinationRow: RowInfo) {
    if (!this.draggedRow) { return; }
    if (destinationRow && destinationRow.isNamespace && !this.draggedRow.isNamespace) {
      const namespacePath = this.currentNamespace.path + '/' + destinationRow.name;
      this.assetService.move([this.draggedRow.id], namespacePath).subscribe(() => {
        this.namespaceService.getContent(this.currentNamespaceId).subscribe(data => this.loadData(data));
      });
    } else if (destinationRow && destinationRow.isNamespace && this.draggedRow.isNamespace) {
      this.namespaceService.move(this.draggedRow.id, destinationRow.id).subscribe(() => {
        this.namespaceService.getContent(this.currentNamespaceId).subscribe(data => this.loadData(data));
      });
    }
  }

  deleteSelectedAssets(event: Event) {
    const target = event.target as any;
    if (target.nodeName !== 'LABEL') { return; }

    this.confirmationService.confirm({
      header: 'Delete Files?',
      message: `This will delete ${this.selected.length} files and folders.  Are you sure you wish to continue?`,
      accept: () => {
        const assetsToDelete = this.selected.filter(s => !s.isNamespace).map(s => s.id);
        const namespacesToDelete = this.selected.filter(s => s.isNamespace).map(s => this.currentNamespace.path + '/' + s.name);

        this.assetService.delete(assetsToDelete).subscribe(() => {
          this.rows = this.rows.filter(r => !r.isNamespace && (this.selected.findIndex(s => s.id === r.id) === -1));
          this.getNamespaceContent();
          this.selected = [];
        });

        this.namespaceService.deleteBulk(namespacesToDelete).subscribe(() => {
          this.getNamespaceContent();
          this.selected = [];
        });
      }
    });
  }

  moveSelectedAssets(event: Event) {
    const target = event.target as any;
    if (target.nodeName !== 'LABEL') { return; }

    const ref = this.dialogService.open(SelectFolderModalComponent, {
      header: `Move ${this.selected.length} files to...`
    });

    ref.onClose.subscribe((selectedPath: any) => {
      if (selectedPath) {
        this.assetService.move(this.selected.filter(s => !s.isNamespace).map(s => s.id), selectedPath.fullPath).subscribe(() => {

          this.selected.filter(s => s.isNamespace).forEach(ns => {
            this.namespaceService.move(ns.id, selectedPath.id).subscribe(() => {
              this.namespaceService.getContent(this.currentNamespaceId).subscribe(data => this.loadData(data));
            });
          });
        });
      }
    });
  }

  createFolder(): void {
    const ref = this.dialogService.open(SingleLineEntryComponent, {
      header: 'New Folder',
      width: '300px',
      data: {
        message: 'Enter the name for the new folder'
      }
    });

    ref.onClose.subscribe((selectedPath: string) => {
      if (!selectedPath || selectedPath.trim() === '') { return; }

      this.namespaceService.create(this.currentNamespace.path + '/' + selectedPath).subscribe((data) => {
        if (data.success) {
          this.router.navigate([`/catalogue/${data.result.id}`]);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error Message', detail: data.errorMessage });
        }
      });
    });
  }
}
