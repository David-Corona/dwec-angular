import { TestBed } from '@angular/core/testing';

import { EditEventGuard } from './edit-event.guard';

describe('EditEventGuard', () => {
  let guard: EditEventGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EditEventGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
