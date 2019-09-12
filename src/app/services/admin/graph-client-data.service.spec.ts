import { TestBed } from '@angular/core/testing';

import { GraphClientDataService } from './graph-client-data.service';

describe('GraphClientDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraphClientDataService = TestBed.get(GraphClientDataService);
    expect(service).toBeTruthy();
  });
});
