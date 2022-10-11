import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NoticeService } from 'src/services/notice.service';
import { Subscription, interval } from 'rxjs';
import { ServiceNotice } from 'src/models/notice/serviceNotice';
import { tap, take } from 'rxjs/operators';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [NoticeService]
})
export class HeaderComponent implements OnInit, OnDestroy {

    public pushRightClass: string;

    private subscriptions: Subscription = new Subscription();

    public notices: ServiceNotice[] = [];

    constructor(
        public router: Router,
        private noticeService: NoticeService
    ) {
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
        this.subscriptions.add(interval(30000).subscribe(() => {
            this.checkNotices();
        }));
        this.checkNotices();
    }

    private checkNotices(): void {
        this.noticeService.getAll().pipe(
            tap(data => {
                if (data.success) {
                    this.notices = data.result;
                }
            }),
            take(1)
        ).subscribe();
    }

    public get noticeCount(): string {
        return (this.notices.length > 9) ? '9+' : this.notices.length.toString();
    }

    public acknoweldgeNotice(id: number): void {
        this.noticeService.acknowledge(id).subscribe(() => {
            this.checkNotices();
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }


    logout() {
        localStorage.removeItem('imu');
        localStorage.removeItem('token');
        this.router.navigate(['/public/login']);
    }
}
