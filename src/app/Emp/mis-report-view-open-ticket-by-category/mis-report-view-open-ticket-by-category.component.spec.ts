import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisReportViewOpenTicketByCategoryComponent } from './mis-report-view-open-ticket-by-category.component';

describe('MisReportViewOpenTicketByCategoryComponent', () => {
  let component: MisReportViewOpenTicketByCategoryComponent;
  let fixture: ComponentFixture<MisReportViewOpenTicketByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisReportViewOpenTicketByCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisReportViewOpenTicketByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
