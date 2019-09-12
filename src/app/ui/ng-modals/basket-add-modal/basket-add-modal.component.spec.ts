import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketAddModalComponent } from './basket-add-modal.component';

describe('BasketAddModalComponent', () => {
  let component: BasketAddModalComponent;
  let fixture: ComponentFixture<BasketAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasketAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
