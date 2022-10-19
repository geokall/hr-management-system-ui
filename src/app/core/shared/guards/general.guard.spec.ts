import {TestBed} from '@angular/core/testing';

import {GeneralGuard} from './general.guard';

describe('GeneralGuard', () => {
  let guard: GeneralGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GeneralGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
