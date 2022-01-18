import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerProfileDataUploadComponent } from './material-test-certificate-list-upload.component';

describe('CustomerProfileDataUploadComponent', () => {
  let component: CustomerProfileDataUploadComponent;
  let fixture: ComponentFixture<CustomerProfileDataUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerProfileDataUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerProfileDataUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
