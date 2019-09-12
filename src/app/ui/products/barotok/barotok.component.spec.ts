import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarotokComponent } from './barotok.component';

describe('BarotokComponent', () => {
  let component: BarotokComponent;
  let fixture: ComponentFixture<BarotokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarotokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarotokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
