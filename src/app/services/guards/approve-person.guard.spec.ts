import { TestBed, async, inject } from '@angular/core/testing';

import { ApprovePersonGuard } from './approve-person.guard';

describe('ApprovePersonGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApprovePersonGuard]
    });
  });

  it('should ...', inject([ApprovePersonGuard], (guard: ApprovePersonGuard) => {
    expect(guard).toBeTruthy();
  }));
});
