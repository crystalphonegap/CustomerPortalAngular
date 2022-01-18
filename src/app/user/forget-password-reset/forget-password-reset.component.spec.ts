import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPasswordResetComponent } from './forget-password-reset.component';

describe('ForgetPasswordResetComponent', () => {
  let component: ForgetPasswordResetComponent;
  let fixture: ComponentFixture<ForgetPasswordResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetPasswordResetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetPasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
