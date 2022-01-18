import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCreateTicketComponent } from './customer-create-ticket.component';

describe('CustomerCreateTicketComponent', () => {
  let component: CustomerCreateTicketComponent;
  let fixture: ComponentFixture<CustomerCreateTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCreateTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCreateTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
