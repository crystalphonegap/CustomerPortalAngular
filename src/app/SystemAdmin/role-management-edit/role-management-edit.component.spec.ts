import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleManagementEditComponent } from './role-management-edit.component';

describe('RoleManagementEditComponent', () => {
  let component: RoleManagementEditComponent;
  let fixture: ComponentFixture<RoleManagementEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleManagementEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleManagementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
