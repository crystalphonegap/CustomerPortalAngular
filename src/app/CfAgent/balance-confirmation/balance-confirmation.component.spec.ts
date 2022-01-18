import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBalanceConfirmationComponent } from './customer-balance-confirmation.component';

describe('CustomerBalanceConfirmationComponent', () => {
  let component: CustomerBalanceConfirmationComponent;
  let fixture: ComponentFixture<CustomerBalanceConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerBalanceConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerBalanceConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
