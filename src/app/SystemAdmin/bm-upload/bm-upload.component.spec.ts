import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BmUploadComponent } from './bm-upload.component';

describe('BmUploadComponent', () => {
  let component: BmUploadComponent;
  let fixture: ComponentFixture<BmUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
