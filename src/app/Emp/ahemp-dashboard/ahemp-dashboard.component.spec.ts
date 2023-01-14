import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AHEmpDashboardComponent } from './ahemp-dashboard.component';

describe('AHEmpDashboardComponent', () => {
  let component: AHEmpDashboardComponent;
  let fixture: ComponentFixture<AHEmpDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AHEmpDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AHEmpDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
