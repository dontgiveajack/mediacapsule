import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreeningRoomComponent } from './screening-room.component';

describe('ScreeningRoomComponent', () => {
  let component: ScreeningRoomComponent;
  let fixture: ComponentFixture<ScreeningRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreeningRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreeningRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
