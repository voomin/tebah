import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispenserSmallComponent } from './dispenser-small.component';

describe('DispenserSmallComponent', () => {
  let component: DispenserSmallComponent;
  let fixture: ComponentFixture<DispenserSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispenserSmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispenserSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
