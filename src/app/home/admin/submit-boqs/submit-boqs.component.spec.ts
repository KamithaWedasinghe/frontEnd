import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitBoqsComponent } from './submit-boqs.component';

describe('SubmitBoqsComponent', () => {
  let component: SubmitBoqsComponent;
  let fixture: ComponentFixture<SubmitBoqsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitBoqsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitBoqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
