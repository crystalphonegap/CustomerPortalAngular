import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBalanceConfirmationViewComponent } from './customer-balance-confirmation-view.component';

describe('CustomerBalanceConfirmationViewComponent', () => {
  let component: CustomerBalanceConfirmationViewComponent;
  let fixture: ComponentFixture<CustomerBalanceConfirmationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerBalanceConfirmationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerBalanceConfirmationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
