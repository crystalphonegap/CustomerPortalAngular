import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderReportListComponent } from './order-report-list.component';

describe('OrderReportListComponent', () => {
  let component: OrderReportListComponent;
  let fixture: ComponentFixture<OrderReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderReportListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
