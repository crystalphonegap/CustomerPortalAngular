import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAsideComponent } from './customer-aside.component';

describe('CustomerAsideComponent', () => {
  let component: CustomerAsideComponent;
  let fixture: ComponentFixture<CustomerAsideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAsideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
