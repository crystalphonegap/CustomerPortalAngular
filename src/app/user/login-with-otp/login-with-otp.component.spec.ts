import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWithOTPComponent } from './login-with-otp.component';

describe('LoginWithOTPComponent', () => {
  let component: LoginWithOTPComponent;
  let fixture: ComponentFixture<LoginWithOTPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginWithOTPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginWithOTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
