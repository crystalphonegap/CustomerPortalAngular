import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketMisListForCategoryComponent } from './ticket-mis-list-for-category.component';

describe('TicketMisListForCategoryComponent', () => {
  let component: TicketMisListForCategoryComponent;
  let fixture: ComponentFixture<TicketMisListForCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketMisListForCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketMisListForCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
