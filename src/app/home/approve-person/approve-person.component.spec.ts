import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovePersonComponent } from './approve-person.component';

describe('ApprovePersonComponent', () => {
  let component: ApprovePersonComponent;
  let fixture: ComponentFixture<ApprovePersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovePersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
