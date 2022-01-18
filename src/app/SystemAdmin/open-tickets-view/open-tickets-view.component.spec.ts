import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenTicketsViewComponent } from './open-tickets-view.component';

describe('OpenTicketsViewComponent', () => {
  let component: OpenTicketsViewComponent;
  let fixture: ComponentFixture<OpenTicketsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenTicketsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenTicketsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
