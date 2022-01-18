import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenOrdersViewComponent } from './open-orders-view.component';

describe('OpenOrdersViewComponent', () => {
  let component: OpenOrdersViewComponent;
  let fixture: ComponentFixture<OpenOrdersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenOrdersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenOrdersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
