import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceApprovalViewComponent } from './price-approval-view.component';

describe('PriceApprovalViewComponent', () => {
  let component: PriceApprovalViewComponent;
  let fixture: ComponentFixture<PriceApprovalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceApprovalViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceApprovalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
