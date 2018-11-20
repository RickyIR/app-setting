import { TestBed, async, inject } from '@angular/core/testing';

import { AuthorChildGuard } from './author.child.guard';

describe('AuthorGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorChildGuard]
    });
  });

  it('should ...', inject([AuthorChildGuard], (guard: AuthorChildGuard) => {
    expect(guard).toBeTruthy();
  }));
});
