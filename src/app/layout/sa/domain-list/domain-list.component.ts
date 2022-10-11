import { Component, OnInit } from '@angular/core';
import { Domain } from 'src/models/app/admin/domain';
import { AdminService } from 'src/services/admin.service';
import { AccountLevel } from 'src/models/app/admin/accountLevel';

@Component({
  selector: 'app-domain-list',
  templateUrl: './domain-list.component.html',
  styleUrls: ['./domain-list.component.scss'],
  providers: [AdminService]
})
export class DomainListComponent implements OnInit {

  public domains: Domain[] = [];
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getAllDomains().subscribe(data => {
      this.domains = data;
    });
  }

  planLevelName(planLevel: AccountLevel): string {
    switch (planLevel) {
      case AccountLevel.Enterprise:
        return 'Enterprise';
      case AccountLevel.Free:
        return 'Free';
      case AccountLevel.Pro:
        return 'Pro';
      case AccountLevel.Standard:
        return 'Standard';
      default:
        return 'Unknown';
    }
  }

}
