import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';

@Component({
  selector: 'app-single-line-entry',
  templateUrl: './single-line-entry.component.html',
  styleUrls: ['./single-line-entry.component.scss']
})
export class SingleLineEntryComponent implements OnInit {

  message: string;
  response: string;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig) {
    this.message = config.data.message;
  }

  ngOnInit() { }

  ok(): void {
    this.ref.close(this.response);
  }

  cancel(): void {
    this.ref.close();
  }
}
