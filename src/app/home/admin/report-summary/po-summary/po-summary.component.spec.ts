import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoSummaryComponent } from './po-summary.component';

describe('PoSummaryComponent', () => {
  let component: PoSummaryComponent;
  let fixture: ComponentFixture<PoSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
