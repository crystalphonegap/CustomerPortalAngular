import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceConfirmationViewForAllComponent } from './balance-confirmation-view-for-all.component';

describe('BalanceConfirmationViewForAllComponent', () => {
  let component: BalanceConfirmationViewForAllComponent;
  let fixture: ComponentFixture<BalanceConfirmationViewForAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceConfirmationViewForAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceConfirmationViewForAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
