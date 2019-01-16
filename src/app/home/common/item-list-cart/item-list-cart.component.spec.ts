import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListCartComponent } from './item-list-cart.component';

describe('ItemListCartComponent', () => {
  let component: ItemListCartComponent;
  let fixture: ComponentFixture<ItemListCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemListCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
