import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TebahMallComponent } from './tebah-mall.component';

describe('TebahMallComponent', () => {
  let component: TebahMallComponent;
  let fixture: ComponentFixture<TebahMallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TebahMallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TebahMallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
