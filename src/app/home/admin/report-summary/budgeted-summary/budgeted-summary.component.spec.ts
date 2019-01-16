import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetedSummaryComponent } from './budgeted-summary.component';

describe('BudgetedSummaryComponent', () => {
  let component: BudgetedSummaryComponent;
  let fixture: ComponentFixture<BudgetedSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetedSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetedSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
