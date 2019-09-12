import { TestBed } from '@angular/core/testing';

import { SalesChannelsService } from './sales-channels.service';

describe('SalesChannelsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalesChannelsService = TestBed.get(SalesChannelsService);
    expect(service).toBeTruthy();
  });
});
