import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerProfileDataListComponent } from './customer-profile-data-list.component';

describe('CustomerProfileDataListComponent', () => {
  let component: CustomerProfileDataListComponent;
  let fixture: ComponentFixture<CustomerProfileDataListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerProfileDataListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerProfileDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
