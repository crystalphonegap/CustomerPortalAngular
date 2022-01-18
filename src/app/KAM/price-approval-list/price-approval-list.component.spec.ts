import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceApprovalListComponent } from './price-approval-list.component';

describe('PriceApprovalListComponent', () => {
  let component: PriceApprovalListComponent;
  let fixture: ComponentFixture<PriceApprovalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceApprovalListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceApprovalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
