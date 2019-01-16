import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContractBoqComponent } from './create-contract-boq.component';

describe('CreateContractBoqComponent', () => {
  let component: CreateContractBoqComponent;
  let fixture: ComponentFixture<CreateContractBoqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateContractBoqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContractBoqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
