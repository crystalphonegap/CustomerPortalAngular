import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTicketViewComponent } from './customer-ticket-view.component';

describe('CustomerTicketViewComponent', () => {
  let component: CustomerTicketViewComponent;
  let fixture: ComponentFixture<CustomerTicketViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerTicketViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTicketViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
