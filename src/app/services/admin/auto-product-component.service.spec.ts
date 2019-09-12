import { TestBed } from '@angular/core/testing';

import { AutoProductComponentService } from './auto-product-component.service';

describe('AutoProductComponentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutoProductComponentService = TestBed.get(AutoProductComponentService);
    expect(service).toBeTruthy();
  });
});
