import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KAMNavigationBarComponent } from './navigation-bar.component';

describe('KAMNavigationBarComponent', () => {
  let component: KAMNavigationBarComponent;
  let fixture: ComponentFixture<KAMNavigationBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KAMNavigationBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KAMNavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
