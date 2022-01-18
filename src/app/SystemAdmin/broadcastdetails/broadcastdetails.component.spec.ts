import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadcastdetailsComponent } from './broadcastdetails.component';

describe('BroadcastdetailsComponent', () => {
  let component: BroadcastdetailsComponent;
  let fixture: ComponentFixture<BroadcastdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BroadcastdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BroadcastdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
