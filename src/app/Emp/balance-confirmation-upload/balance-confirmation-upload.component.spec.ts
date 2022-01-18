import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceConfirmationUploadComponent } from './balance-confirmation-upload.component';

describe('BalanceConfirmationUploadComponent', () => {
  let component: BalanceConfirmationUploadComponent;
  let fixture: ComponentFixture<BalanceConfirmationUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceConfirmationUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceConfirmationUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
