import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { NoticeService } from 'src/services/notice.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [NoticeService]
})
export class LayoutComponent implements OnInit, OnDestroy {

  collapedSideBar: boolean;
  globalNotice = '';
  private subscriptions: Subscription = new Subscription();

  constructor(private noticeService: NoticeService) { }

  ngOnInit() {
    this.refreshGlobalNotice();
    this.subscriptions.add(interval(30000).subscribe(() => {
      this.refreshGlobalNotice();
    }));
  }
  private refreshGlobalNotice(): void {
    this.noticeService.getGlobal().subscribe(data => {
      if (data && data.result) {
        this.globalNotice = data.result.note;
      } else {
        this.globalNotice = '';
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }

}
