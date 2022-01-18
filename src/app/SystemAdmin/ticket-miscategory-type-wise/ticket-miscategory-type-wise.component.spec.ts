import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketMISCategoryTypeWiseComponent } from './ticket-miscategory-type-wise.component';

describe('TicketMISCategoryTypeWiseComponent', () => {
  let component: TicketMISCategoryTypeWiseComponent;
  let fixture: ComponentFixture<TicketMISCategoryTypeWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketMISCategoryTypeWiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketMISCategoryTypeWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
