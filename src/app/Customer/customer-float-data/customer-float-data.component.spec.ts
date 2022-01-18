import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFloatDataComponent } from './customer-float-data.component';

describe('CustomerFloatDataComponent', () => {
  let component: CustomerFloatDataComponent;
  let fixture: ComponentFixture<CustomerFloatDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerFloatDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerFloatDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
