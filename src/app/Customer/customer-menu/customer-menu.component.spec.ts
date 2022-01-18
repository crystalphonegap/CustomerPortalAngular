import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMenuComponent } from './customer-menu.component';

describe('CustomerMenuComponent', () => {
  let component: CustomerMenuComponent;
  let fixture: ComponentFixture<CustomerMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
