import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FSmallComponent } from './f-small.component';

describe('FSmallComponent', () => {
  let component: FSmallComponent;
  let fixture: ComponentFixture<FSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FSmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
