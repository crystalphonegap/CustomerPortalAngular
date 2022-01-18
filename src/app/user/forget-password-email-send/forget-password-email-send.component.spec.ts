import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPasswordEmailSendComponent } from './forget-password-email-send.component';

describe('ForgetPasswordEmailSendComponent', () => {
  let component: ForgetPasswordEmailSendComponent;
  let fixture: ComponentFixture<ForgetPasswordEmailSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetPasswordEmailSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetPasswordEmailSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
