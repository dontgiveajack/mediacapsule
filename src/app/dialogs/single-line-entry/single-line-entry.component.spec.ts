import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleLineEntryComponent } from './single-line-entry.component';

describe('SingleLineEntryComponent', () => {
  let component: SingleLineEntryComponent;
  let fixture: ComponentFixture<SingleLineEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleLineEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleLineEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
