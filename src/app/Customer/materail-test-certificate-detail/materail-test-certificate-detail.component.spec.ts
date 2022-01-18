import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterailTestCertificateDetailComponent } from './materail-test-certificate-detail.component';

describe('MaterailTestCertificateDetailComponent', () => {
  let component: MaterailTestCertificateDetailComponent;
  let fixture: ComponentFixture<MaterailTestCertificateDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterailTestCertificateDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterailTestCertificateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
