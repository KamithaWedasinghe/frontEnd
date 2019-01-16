import { TestBed } from '@angular/core/testing';

import { MainHttpService } from './main-http.service';

describe('MainhttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MainHttpService = TestBed.get(MainHttpService);
    expect(service).toBeTruthy();
  });
});
