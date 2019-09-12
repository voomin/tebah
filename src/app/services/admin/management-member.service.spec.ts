import { TestBed } from '@angular/core/testing';

import { ManagementMemberService } from './management-member.service';

describe('ManagementMemberService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManagementMemberService = TestBed.get(ManagementMemberService);
    expect(service).toBeTruthy();
  });
});
