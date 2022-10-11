import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ConfirmationService]
})
export class AppComponent implements OnInit {
  title = 'CapsuleMedia-FrontEnd';
  constructor(
    private swUpdate: SwUpdate,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        console.log('update available');
        this.confirmationService.confirm({
          header: 'Update Media Capsule',
          message: `There is an update available.<br />Do you wish to update?`,
          accept: () => {
            window.location.reload();
          }
        });
      });
    }
  }
}
