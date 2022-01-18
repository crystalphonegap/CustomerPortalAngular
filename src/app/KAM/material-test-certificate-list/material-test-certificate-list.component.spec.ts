import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTestCertificateListComponent } from './material-test-certificate-list.component';

describe('MaterialTestCertificateListComponent', () => {
  let component: MaterialTestCertificateListComponent;
  let fixture: ComponentFixture<MaterialTestCertificateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialTestCertificateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialTestCertificateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
