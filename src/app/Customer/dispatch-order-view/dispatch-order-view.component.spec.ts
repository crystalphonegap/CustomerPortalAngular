import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchOrderViewComponent } from './dispatch-order-view.component';

describe('DispatchOrderViewComponent', () => {
  let component: DispatchOrderViewComponent;
  let fixture: ComponentFixture<DispatchOrderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchOrderViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchOrderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
