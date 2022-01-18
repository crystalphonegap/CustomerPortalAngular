import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenTicketsComponent } from './open-tickets.component';

describe('OpenTicketsComponent', () => {
  let component: OpenTicketsComponent;
  let fixture: ComponentFixture<OpenTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
