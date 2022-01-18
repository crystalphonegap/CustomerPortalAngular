import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SAPOrderListComponent } from './saporder-list.component';

describe('SAPOrderListComponent', () => {
  let component: SAPOrderListComponent;
  let fixture: ComponentFixture<SAPOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SAPOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SAPOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
