import { Component, OnInit } from '@angular/core';
import { NamespaceService } from 'src/services/namespace.service';
import { DashboardReport } from 'src/models/namespace/dashboard-report';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [NamespaceService, UserService]
})
export class DashboardComponent implements OnInit {

  public usageChartLabels: string[] = [
    'Available',
    'Used',
  ];

  public rows = [];
  public usageChartType: string;
  public onlineUsageData: number[] = [0, 1];
  public archiveUsageData: number[] = [0, 1];

  public data: DashboardReport = new DashboardReport();

  public doughnutColors: any[] = [
    { backgroundColor: ['#62b125'] }];

  public chartHovered(e: any): void { }

  public chartClicked(e: any): void { }

  constructor(
    private router: Router,
    private namespaceService: NamespaceService,
    private userService: UserService) {
    if (this.userService.isau()) {
      router.navigate(['/sa/service-availability']);
    }
  }

  ngOnInit() {
    this.usageChartType = 'doughnut';

    this.namespaceService.getDashboardReport().subscribe(data => {
      this.data = data.result;
      this.rows = data.result.activities;
      this.onlineUsageData = [data.result.onlineTotalAvailable - data.result.onlineUsed, data.result.onlineUsed];
      this.archiveUsageData = [data.result.archiveTotalAvailable - data.result.archiveUsed, data.result.archiveUsed];
    });
  }

}
