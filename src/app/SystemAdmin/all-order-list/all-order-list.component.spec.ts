import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOrderListComponent } from './all-order-list.component';

describe('AllOrderListComponent', () => {
  let component: AllOrderListComponent;
  let fixture: ComponentFixture<AllOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
