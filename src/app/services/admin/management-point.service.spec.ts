import { TestBed } from '@angular/core/testing';

import { ManagementPointService } from './management-point.service';

describe('ManagementPointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManagementPointService = TestBed.get(ManagementPointService);
    expect(service).toBeTruthy();
  });
});
