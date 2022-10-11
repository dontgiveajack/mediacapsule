import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoMp4Component } from './video-mp4.component';

describe('VideoMp4Component', () => {
  let component: VideoMp4Component;
  let fixture: ComponentFixture<VideoMp4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoMp4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoMp4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
