import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedTicketsViewComponent } from './completed-tickets-view.component';

describe('CompletedTicketsViewComponent', () => {
  let component: CompletedTicketsViewComponent;
  let fixture: ComponentFixture<CompletedTicketsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedTicketsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedTicketsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
