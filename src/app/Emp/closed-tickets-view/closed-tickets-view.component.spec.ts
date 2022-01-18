import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedTicketsViewComponent } from './closed-tickets-view.component';

describe('ClosedTicketsViewComponent', () => {
  let component: ClosedTicketsViewComponent;
  let fixture: ComponentFixture<ClosedTicketsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedTicketsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedTicketsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
