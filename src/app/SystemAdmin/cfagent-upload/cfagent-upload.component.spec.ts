import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CFAgentUploadComponent } from './cfagent-upload.component';

describe('CFAgentUploadComponent', () => {
  let component: CFAgentUploadComponent;
  let fixture: ComponentFixture<CFAgentUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CFAgentUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CFAgentUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
