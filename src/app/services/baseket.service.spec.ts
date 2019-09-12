import { TestBed } from '@angular/core/testing';

import { BaseketService } from './baseket.service';

describe('BaseketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaseketService = TestBed.get(BaseketService);
    expect(service).toBeTruthy();
  });
});
