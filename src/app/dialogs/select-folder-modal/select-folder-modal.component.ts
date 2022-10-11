import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef, DynamicDialogConfig, TreeNode } from 'primeng/api';
import { NamespaceSimple } from 'src/models/namespace/namespace-simple';
import { NamespaceService } from 'src/services/namespace.service';
import { ITypedBaseResponse } from 'src/models/IBaseResponse';

@Component({
  selector: 'app-select-folder-modal',
  templateUrl: './select-folder-modal.component.html',
  styleUrls: ['./select-folder-modal.component.scss'],
  providers: [DialogService]
})
export class SelectFolderModalComponent implements OnInit {

  public treeData: Array<TreeNode> = [];
  public selectedPath: TreeNode;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private namespaceService: NamespaceService
  ) { }

  ngOnInit() {
    this.namespaceService.getTree().subscribe(data => this.loadData(data));
  }

  loadData(data: ITypedBaseResponse<NamespaceSimple[]>) {
    data.result.forEach(t => {
      this.treeData.push(this.getTreeFromNamepsace(t));
    });
  }

  getTreeFromNamepsace(ns: NamespaceSimple): TreeNode {
    return {
      label: ns.name,
      data: { fullPath: ns.path, id: ns.id },
      children: ns.namespaces && ns.namespaces.map(t => this.getTreeFromNamepsace(t))
    };
  }

  selectPath() {
    if (!this.selectedPath) {
      return this.ref.close();
    }
    this.ref.close(this.selectedPath.data);
  }

  cancelDialog() {
    this.selectedPath = null;
    this.selectPath();
  }

}
