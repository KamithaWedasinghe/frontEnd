import { TestBed, async, inject } from '@angular/core/testing';

import { ApiResolverGuard } from './api-resolver.guard';

describe('ApiResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiResolverGuard]
    });
  });

  it('should ...', inject([ApiResolverGuard], (guard: ApiResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
