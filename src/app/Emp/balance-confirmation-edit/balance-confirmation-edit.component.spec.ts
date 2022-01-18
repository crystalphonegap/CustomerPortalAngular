import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceConfirmationEditComponent } from './balance-confirmation-edit.component';

describe('BalanceConfirmationEditComponent', () => {
  let component: BalanceConfirmationEditComponent;
  let fixture: ComponentFixture<BalanceConfirmationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceConfirmationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceConfirmationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
