import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderResponseComponent } from './order-response.component';

describe('OrderResponseComponent', () => {
  let component: OrderResponseComponent;
  let fixture: ComponentFixture<OrderResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
