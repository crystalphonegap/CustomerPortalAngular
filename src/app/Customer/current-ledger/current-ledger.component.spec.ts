import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentLedgerComponent } from './current-ledger.component';

describe('CurrentLedgerComponent', () => {
  let component: CurrentLedgerComponent;
  let fixture: ComponentFixture<CurrentLedgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentLedgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
