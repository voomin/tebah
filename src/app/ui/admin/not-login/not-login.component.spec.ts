import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotLoginComponent } from './not-login.component';

describe('NotLoginComponent', () => {
  let component: NotLoginComponent;
  let fixture: ComponentFixture<NotLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
