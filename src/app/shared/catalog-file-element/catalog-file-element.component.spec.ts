import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogFileElementComponent } from './catalog-file-element.component';

describe('CatalogFileElementComponent', () => {
  let component: CatalogFileElementComponent;
  let fixture: ComponentFixture<CatalogFileElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogFileElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogFileElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
