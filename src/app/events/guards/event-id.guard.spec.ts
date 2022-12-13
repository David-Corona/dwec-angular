import { TestBed } from '@angular/core/testing';

import { EventIdGuard } from './event-id.guard';

describe('EventIdGuard', () => {
  let guard: EventIdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EventIdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
