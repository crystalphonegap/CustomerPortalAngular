import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMappingComponent } from './upload-mapping.component';

describe('UploadMappingComponent', () => {
  let component: UploadMappingComponent;
  let fixture: ComponentFixture<UploadMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
