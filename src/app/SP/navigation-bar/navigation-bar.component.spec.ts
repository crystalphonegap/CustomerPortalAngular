import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SPNavigationBarComponent } from './navigation-bar.component';

describe('SPNavigationBarComponent', () => {
  let component: SPNavigationBarComponent;
  let fixture: ComponentFixture<SPNavigationBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SPNavigationBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SPNavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
