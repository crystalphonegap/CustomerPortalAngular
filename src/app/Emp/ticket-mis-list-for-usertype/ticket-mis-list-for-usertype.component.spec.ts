import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketMisListForUsertypeComponent } from './ticket-mis-list-for-usertype.component';

describe('TicketMisListForUsertypeComponent', () => {
  let component: TicketMisListForUsertypeComponent;
  let fixture: ComponentFixture<TicketMisListForUsertypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketMisListForUsertypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketMisListForUsertypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
