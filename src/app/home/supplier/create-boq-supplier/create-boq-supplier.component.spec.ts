import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBoqSupplierComponent } from './create-boq-supplier.component';

describe('CreateBoqSupplierComponent', () => {
  let component: CreateBoqSupplierComponent;
  let fixture: ComponentFixture<CreateBoqSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBoqSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBoqSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
