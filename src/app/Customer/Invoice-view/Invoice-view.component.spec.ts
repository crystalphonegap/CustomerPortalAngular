import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInvoiceViewComponent } from './Invoice-view.component';

describe('CustomerInvoiceViewComponent', () => {
  let component: CustomerInvoiceViewComponent;
  let fixture: ComponentFixture<CustomerInvoiceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerInvoiceViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerInvoiceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
