import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCreateOrderComponent } from './create-order.component';

describe('CustomerCreateOrderComponent', () => {
  let component: CustomerCreateOrderComponent;
  let fixture: ComponentFixture<CustomerCreateOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCreateOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCreateOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
