import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfAgentAsideComponent } from './CfAgent-aside.component';

describe('CfAgentAsideComponent', () => {
  let component: CfAgentAsideComponent;
  let fixture: ComponentFixture<CfAgentAsideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfAgentAsideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfAgentAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
