import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTicketListComponent } from './customer-ticket-list.component';

describe('CustomerTicketListComponent', () => {
  let component: CustomerTicketListComponent;
  let fixture: ComponentFixture<CustomerTicketListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerTicketListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTicketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
