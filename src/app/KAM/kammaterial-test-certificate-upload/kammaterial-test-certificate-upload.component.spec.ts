import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KAMMaterialTestCertificateUploadComponent } from './kammaterial-test-certificate-upload.component';

describe('KAMMaterialTestCertificateUploadComponent', () => {
  let component: KAMMaterialTestCertificateUploadComponent;
  let fixture: ComponentFixture<KAMMaterialTestCertificateUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KAMMaterialTestCertificateUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KAMMaterialTestCertificateUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
