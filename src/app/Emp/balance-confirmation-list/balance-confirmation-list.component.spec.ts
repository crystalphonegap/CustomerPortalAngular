import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceConfirmationListComponent } from './balance-confirmation-list.component';

describe('BalanceConfirmationListComponent', () => {
  let component: BalanceConfirmationListComponent;
  let fixture: ComponentFixture<BalanceConfirmationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceConfirmationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceConfirmationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
