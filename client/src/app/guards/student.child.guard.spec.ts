import { TestBed, async, inject } from '@angular/core/testing';

import { StudentChildGuard } from './student.child.guard';

describe('Student.ChildGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentChildGuard]
    });
  });

  it('should ...', inject([StudentChildGuard], (guard: StudentChildGuard) => {
    expect(guard).toBeTruthy();
  }));
});
