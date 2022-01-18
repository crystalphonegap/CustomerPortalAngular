import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAccountStatementComponent } from './account-statement.component';

describe('CustomerAccountStatementComponent', () => {
  let component: CustomerAccountStatementComponent;
  let fixture: ComponentFixture<CustomerAccountStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAccountStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAccountStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
