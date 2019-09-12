import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageProductComponent } from './package-product.component';

describe('PackageProductComponent', () => {
  let component: PackageProductComponent;
  let fixture: ComponentFixture<PackageProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
