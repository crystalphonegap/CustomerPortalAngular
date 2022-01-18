import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAdminNewLoginReportComponent } from './system-admin-new-login-report.component';

describe('SystemAdminNewLoginReportComponent', () => {
  let component: SystemAdminNewLoginReportComponent;
  let fixture: ComponentFixture<SystemAdminNewLoginReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemAdminNewLoginReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemAdminNewLoginReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
