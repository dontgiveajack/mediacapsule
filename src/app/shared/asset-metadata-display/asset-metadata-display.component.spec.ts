import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetMetadataDisplayComponent } from './asset-metadata-display.component';

describe('AssetMetadataDisplayComponent', () => {
  let component: AssetMetadataDisplayComponent;
  let fixture: ComponentFixture<AssetMetadataDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetMetadataDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetMetadataDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
