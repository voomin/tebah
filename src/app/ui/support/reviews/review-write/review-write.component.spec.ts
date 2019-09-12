import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewWriteComponent } from './review-write.component';

describe('ReviewWriteComponent', () => {
  let component: ReviewWriteComponent;
  let fixture: ComponentFixture<ReviewWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
