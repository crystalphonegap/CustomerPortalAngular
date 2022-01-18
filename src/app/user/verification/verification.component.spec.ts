import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVerificationComponent } from './verification.component';

describe('CustomerVerificationComponent', () => {
  let component: CustomerVerificationComponent;
  let fixture: ComponentFixture<CustomerVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
