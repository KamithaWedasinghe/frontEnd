import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveRejectBoqComponent } from './approve-reject-boq.component';

describe('ApproveRejectBoqComponent', () => {
  let component: ApproveRejectBoqComponent;
  let fixture: ComponentFixture<ApproveRejectBoqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveRejectBoqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveRejectBoqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
