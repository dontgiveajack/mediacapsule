import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueAssetComponent } from './catalogue-asset.component';

describe('ScreeningRoomComponent', () => {
  let component: CatalogueAssetComponent;
  let fixture: ComponentFixture<CatalogueAssetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogueAssetComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogueAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
