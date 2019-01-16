import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContractBoqComponent } from './view-contract-boq.component';

describe('ViewContractBoqComponent', () => {
  let component: ViewContractBoqComponent;
  let fixture: ComponentFixture<ViewContractBoqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewContractBoqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewContractBoqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
