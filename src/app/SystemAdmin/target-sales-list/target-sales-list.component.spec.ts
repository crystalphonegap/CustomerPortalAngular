import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAdminTargetSalesListComponent } from './target-sales-list.component';

describe('SystemAdminTargetSalesListComponent', () => {
  let component: SystemAdminTargetSalesListComponent;
  let fixture: ComponentFixture<SystemAdminTargetSalesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemAdminTargetSalesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemAdminTargetSalesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
