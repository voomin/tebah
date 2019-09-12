import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMngComponent } from './event-mng.component';

describe('EventMngComponent', () => {
  let component: EventMngComponent;
  let fixture: ComponentFixture<EventMngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventMngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventMngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
