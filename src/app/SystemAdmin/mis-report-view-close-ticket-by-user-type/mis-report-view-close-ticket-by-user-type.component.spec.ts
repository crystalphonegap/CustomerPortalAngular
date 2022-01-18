import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisReportViewCloseTicketByUserTypeComponent } from './mis-report-view-close-ticket-by-user-type.component';

describe('MisReportViewCloseTicketByUserTypeComponent', () => {
  let component: MisReportViewCloseTicketByUserTypeComponent;
  let fixture: ComponentFixture<MisReportViewCloseTicketByUserTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisReportViewCloseTicketByUserTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisReportViewCloseTicketByUserTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
