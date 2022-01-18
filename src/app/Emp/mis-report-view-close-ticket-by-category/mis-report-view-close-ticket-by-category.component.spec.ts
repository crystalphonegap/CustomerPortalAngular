import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisReportViewCloseTicketByCategoryComponent } from './mis-report-view-close-ticket-by-category.component';

describe('MisReportViewCloseTicketByCategoryComponent', () => {
  let component: MisReportViewCloseTicketByCategoryComponent;
  let fixture: ComponentFixture<MisReportViewCloseTicketByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisReportViewCloseTicketByCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisReportViewCloseTicketByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
