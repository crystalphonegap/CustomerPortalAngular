import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInvoiceDetailComponent } from './Invoice-detail.component';

describe('CustomerDetailComponent', () => {
  let component: CustomerInvoiceDetailComponent;
  let fixture: ComponentFixture<CustomerInvoiceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerInvoiceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerInvoiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
