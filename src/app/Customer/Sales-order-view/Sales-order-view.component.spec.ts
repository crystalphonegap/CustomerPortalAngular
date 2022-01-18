import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSalesOrderViewComponent } from './Sales-order-view.component';

describe('CustomerSalesOrderViewComponent', () => {
  let component: CustomerSalesOrderViewComponent;
  let fixture: ComponentFixture<CustomerSalesOrderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSalesOrderViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSalesOrderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
