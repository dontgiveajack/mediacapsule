import { Component, OnInit } from '@angular/core';
import { Domain, EncryptionTypes } from 'src/models/app/admin/domain';
import { AdminService } from 'src/services/admin.service';
import { FileCatalystStorageMethods } from 'src/models/app/admin/fileCatalystStorageMethods';
import { AutomaticArchiveMethods } from 'src/models/app/admin/automaticArchiveMethods';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-domain-details',
  templateUrl: './domain-details.component.html',
  styleUrls: ['./domain-details.component.scss'],
  providers: [AdminService]
})
export class DomainDetailsComponent implements OnInit {

  currentDomain: Domain = new Domain();
  availableStores = [];
  encryptionTypes = [];
  archiveMethods = [];
  fileCatalystArchiveMethods = [];

  constructor(
    private router: Router,
    private adminService: AdminService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.availableStores = [
      {
        value: 1,
        label: 's3_east'
      },
      {
        value: 2,
        label: 's3_west'
      }
    ];

    this.encryptionTypes = [
      { value: EncryptionTypes.None, label: 'None' },
      { value: EncryptionTypes.AtRest, label: 'Encryption at Rest' }
    ];

    this.archiveMethods = [
      { value: AutomaticArchiveMethods.None, label: 'None' },
      { value: AutomaticArchiveMethods.Scheduled, label: 'Scheduled' }
    ];

    this.fileCatalystArchiveMethods = [
      { value: FileCatalystStorageMethods.Archive, label: 'Archive' },
      { value: FileCatalystStorageMethods.Online, label: 'Online' },
      { value: FileCatalystStorageMethods.Both, label: 'Both' }
    ];

    this.activeRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id || isNaN(id as any)) {
        this.router.navigate(['/sa/domains']);
      }
      this.adminService.getDomain(parseInt(id, 10)).subscribe(data => {
        if (data == null) {
          this.router.navigate(['/sa/domains']);
          return;
        }

        this.currentDomain = data;
      });
    });
  }

  addStorage(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (!this.currentDomain.dataStores) { this.currentDomain.dataStores = []; }
    this.currentDomain.dataStores.push({
      encryptionType: EncryptionTypes.AtRest,
      immutable: true,
      isDefaultOnline: true,
      key: 'abc123',
      label: 'Location 001',
      location: {
        id: 1,
        name: 's3-east-001'
      }
    });
  }
}
