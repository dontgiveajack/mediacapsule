import { Component, OnInit } from '@angular/core';
import { NoticeService } from 'src/services/notice.service';
import { ServiceNotice } from 'src/models/notice/serviceNotice';
import { SelectItem, MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-service-notice',
  templateUrl: './service-notice.component.html',
  styleUrls: ['./service-notice.component.scss'],
  providers: [NoticeService, MessageService]
})
export class ServiceNoticeComponent implements OnInit {

  pageSize = 10;
  pageCount = 1;
  currentPage = 1;
  totalRecords = 0;
  notices: ServiceNotice[] = [];

  domains: SelectItem[] = [];
  currentDomain: number;
  users: SelectItem[] = [];
  currentUser: number;
  noteText = '';
  rangeDates: Date[];

  globalNotice: string;

  constructor(
    private noticeService: NoticeService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.getData(1);

    this.currentDomain = null;
    this.domains = [
      { value: null, label: 'All Users / Domains' },
      { value: 1, label: 'system (Capsule Media)' }
    ];

    this.currentUser = null;
    this.users = [
      { value: null, label: 'All Users' }
    ];
  }

  paginate(event: any) {
    const pageNumber = event.page + 1;
    this.getData(pageNumber);
  }

  private getData(pageNumber: number) {
    this.noticeService.report(pageNumber, this.pageSize).subscribe(data => {
      this.notices = data.result;

      this.pageSize = data.metaData.pageSize;
      this.pageCount = data.metaData.pageCount;
      this.totalRecords = data.metaData.totalItemCount;
      this.currentPage = pageNumber;
    });

    this.getGlobalNotice();
  }

  private getGlobalNotice() {
    this.noticeService.getGlobal()
      .pipe(take(1))
      .subscribe(data => {
        this.globalNotice = data.result.note;
      });
  }

  expireGlobalNotice() {
    this.noticeService.expireGlobal().pipe(take(1)).subscribe();
    this.globalNotice = '';
  }

  updateGlobalNotice() {
    this.noticeService.updateGlobal(this.globalNotice).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Global Notice Posted', detail: 'Global notice has been updated.' });
    });
  }


  domainChanged(event): void {
    this.currentUser = null;
    if (!this.currentDomain) {
      this.users = [
        { value: null, label: 'All Users' }
      ];
    } else {
      this.users = [
        { value: null, label: 'All Users' },
        { value: 1, label: 'manager (Corby Simpson)' }
      ];
    }
  }

  createNote(): void {
    if (this.noteText.trim() === '') {
      alert('Please enter a note body');
      return;
    }

    const startDate = (this.rangeDates) && this.rangeDates.length > 1 ? this.rangeDates[0] : null;
    const endDate = (this.rangeDates) && this.rangeDates.length > 1 ? this.rangeDates[1] : null;

    const body = {
      Note: this.noteText,
      StartDate: startDate,
      EndDate: endDate,
      UserId: this.currentUser,
      DomainId: this.currentDomain
    };

    this.noticeService.create(body).subscribe((data) => {
      if (data.success) {
        this.notices.concat(data.result);
        this.totalRecords += data.result.length;

        this.messageService.add({ severity: 'success', summary: 'Notices Posted', detail: `${data.result.length} message(s) posted` });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: data.errorMessage });
      }
    });
  }

  deleteNote(notice: ServiceNotice): void {
    this.noticeService.delete(notice.id).subscribe(() => {
      this.getData(this.currentPage);
    });
  }
}

