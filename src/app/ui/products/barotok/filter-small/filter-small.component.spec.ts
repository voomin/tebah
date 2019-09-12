import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSmallComponent } from './filter-small.component';

describe('FilterSmallComponent', () => {
  let component: FilterSmallComponent;
  let fixture: ComponentFixture<FilterSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterSmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
