import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockOrderListComponent } from './block-order-list.component';

describe('BlockOrderListComponent', () => {
  let component: BlockOrderListComponent;
  let fixture: ComponentFixture<BlockOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
