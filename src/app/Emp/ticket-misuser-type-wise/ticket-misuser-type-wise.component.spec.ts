import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketMISUserTypeWiseComponent } from './ticket-misuser-type-wise.component';

describe('TicketMISUserTypeWiseComponent', () => {
  let component: TicketMISUserTypeWiseComponent;
  let fixture: ComponentFixture<TicketMISUserTypeWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketMISUserTypeWiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketMISUserTypeWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
