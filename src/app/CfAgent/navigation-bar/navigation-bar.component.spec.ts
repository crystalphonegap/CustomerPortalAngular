import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfNavigationBarComponent } from './navigation-bar.component';

describe('CfNavigationBarComponent', () => {
  let component: CfNavigationBarComponent;
  let fixture: ComponentFixture<CfNavigationBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfNavigationBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfNavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
