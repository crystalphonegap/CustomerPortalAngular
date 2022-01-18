import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceConfirmationListForAllComponent } from './balance-confirmation-list-for-all.component';

describe('BalanceConfirmationListForAllComponent', () => {
  let component: BalanceConfirmationListForAllComponent;
  let fixture: ComponentFixture<BalanceConfirmationListForAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceConfirmationListForAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceConfirmationListForAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
