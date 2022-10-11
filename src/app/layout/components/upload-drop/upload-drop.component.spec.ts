import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDropComponent } from './upload-drop.component';

describe('UploadDropComponent', () => {
  let component: UploadDropComponent;
  let fixture: ComponentFixture<UploadDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
