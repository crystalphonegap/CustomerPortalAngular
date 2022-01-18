import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceApprovalCreateComponent } from './price-approval-create.component';

describe('PriceApprovalCreateComponent', () => {
  let component: PriceApprovalCreateComponent;
  let fixture: ComponentFixture<PriceApprovalCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceApprovalCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceApprovalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
