import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAsideComponent } from './system-aside.component';

describe('SystemAsideComponent', () => {
  let component: SystemAsideComponent;
  let fixture: ComponentFixture<SystemAsideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemAsideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
