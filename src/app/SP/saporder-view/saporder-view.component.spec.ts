import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SAPOrderViewComponent } from './saporder-view.component';

describe('SAPOrderViewComponent', () => {
  let component: SAPOrderViewComponent;
  let fixture: ComponentFixture<SAPOrderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SAPOrderViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SAPOrderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
