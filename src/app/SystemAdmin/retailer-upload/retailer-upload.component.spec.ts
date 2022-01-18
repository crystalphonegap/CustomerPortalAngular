import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerUploadComponent } from './retailer-upload.component';

describe('RetailerUploadComponent', () => {
  let component: RetailerUploadComponent;
  let fixture: ComponentFixture<RetailerUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailerUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
