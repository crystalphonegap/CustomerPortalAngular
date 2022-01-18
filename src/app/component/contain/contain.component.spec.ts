import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainComponent } from './contain.component';

describe('ContainComponent', () => {
  let component: ContainComponent;
  let fixture: ComponentFixture<ContainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
