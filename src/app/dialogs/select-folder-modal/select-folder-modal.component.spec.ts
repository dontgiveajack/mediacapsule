import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFolderModalComponent } from './select-folder-modal.component';

describe('SelectFolderModalComponent', () => {
  let component: SelectFolderModalComponent;
  let fixture: ComponentFixture<SelectFolderModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectFolderModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFolderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
