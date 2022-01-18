import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceConfirmationViewComponent } from './balance-confirmation-view.component';

describe('BalanceConfirmationViewComponent', () => {
  let component: BalanceConfirmationViewComponent;
  let fixture: ComponentFixture<BalanceConfirmationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceConfirmationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceConfirmationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
