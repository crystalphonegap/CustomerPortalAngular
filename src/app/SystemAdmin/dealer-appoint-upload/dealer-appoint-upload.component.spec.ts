import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerAppointUploadComponent } from './dealer-appoint-upload.component';

describe('DealerAppointUploadComponent', () => {
  let component: DealerAppointUploadComponent;
  let fixture: ComponentFixture<DealerAppointUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerAppointUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerAppointUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
