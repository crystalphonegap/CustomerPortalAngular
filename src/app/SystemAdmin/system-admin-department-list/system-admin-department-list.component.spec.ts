import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAdminDepartmentListComponent } from './system-admin-department-list.component';

describe('SystemAdminDepartmentListComponent', () => {
  let component: SystemAdminDepartmentListComponent;
  let fixture: ComponentFixture<SystemAdminDepartmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemAdminDepartmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemAdminDepartmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
