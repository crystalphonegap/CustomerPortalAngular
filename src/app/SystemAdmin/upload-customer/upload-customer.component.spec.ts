import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCustomerComponent } from './upload-customer.component';

describe('UploadCustomerComponent', () => {
  let component: UploadCustomerComponent;
  let fixture: ComponentFixture<UploadCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
