import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesPromoterComponent } from './sales-promoter.component';

describe('SalesPromoterComponent', () => {
  let component: SalesPromoterComponent;
  let fixture: ComponentFixture<SalesPromoterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesPromoterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesPromoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
