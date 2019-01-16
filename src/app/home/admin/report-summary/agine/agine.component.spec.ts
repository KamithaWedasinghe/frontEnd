import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgineComponent } from './agine.component';

describe('AgineComponent', () => {
  let component: AgineComponent;
  let fixture: ComponentFixture<AgineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
