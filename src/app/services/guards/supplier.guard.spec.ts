import { TestBed, async, inject } from '@angular/core/testing';

import { SupplierGuard } from './supplier.guard';

describe('SupplierGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupplierGuard]
    });
  });

  it('should ...', inject([SupplierGuard], (guard: SupplierGuard) => {
    expect(guard).toBeTruthy();
  }));
});
