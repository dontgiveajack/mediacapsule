import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceNoticeComponent } from './service-notice.component';

describe('ServiceNoticeComponent', () => {
  let component: ServiceNoticeComponent;
  let fixture: ComponentFixture<ServiceNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
