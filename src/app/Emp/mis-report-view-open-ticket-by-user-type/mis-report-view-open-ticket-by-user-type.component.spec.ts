import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisReportViewOpenTicketByUserTypeComponent } from './mis-report-view-open-ticket-by-user-type.component';

describe('MisReportViewOpenTicketByUserTypeComponent', () => {
  let component: MisReportViewOpenTicketByUserTypeComponent;
  let fixture: ComponentFixture<MisReportViewOpenTicketByUserTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisReportViewOpenTicketByUserTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisReportViewOpenTicketByUserTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
