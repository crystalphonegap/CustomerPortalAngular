import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerAppointListComponent } from './dealer-appoint-list.component';

describe('DealerAppointListComponent', () => {
  let component: DealerAppointListComponent;
  let fixture: ComponentFixture<DealerAppointListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerAppointListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerAppointListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
