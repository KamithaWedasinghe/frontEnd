import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCreateBoqComponent } from './view-create-boq.component';

describe('ViewCreateBoqComponent', () => {
  let component: ViewCreateBoqComponent;
  let fixture: ComponentFixture<ViewCreateBoqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCreateBoqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCreateBoqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
