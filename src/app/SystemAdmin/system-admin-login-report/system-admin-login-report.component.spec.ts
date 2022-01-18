import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAdminLoginReportComponent } from './system-admin-login-report.component';

describe('SystemAdminLoginReportComponent', () => {
  let component: SystemAdminLoginReportComponent;
  let fixture: ComponentFixture<SystemAdminLoginReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemAdminLoginReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemAdminLoginReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
