import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigleProductComponent } from './sigle-product.component';

describe('SigleProductComponent', () => {
  let component: SigleProductComponent;
  let fixture: ComponentFixture<SigleProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigleProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigleProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
