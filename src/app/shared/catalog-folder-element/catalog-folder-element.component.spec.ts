import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogFolderElementComponent } from './catalog-folder-element.component';

describe('CatalogFolderElementComponent', () => {
  let component: CatalogFolderElementComponent;
  let fixture: ComponentFixture<CatalogFolderElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogFolderElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogFolderElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
