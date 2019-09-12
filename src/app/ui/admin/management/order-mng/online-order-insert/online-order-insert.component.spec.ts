import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineOrderInsertComponent } from './online-order-insert.component';

describe('OnlineOrderInsertComponent', () => {
  let component: OnlineOrderInsertComponent;
  let fixture: ComponentFixture<OnlineOrderInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineOrderInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineOrderInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
