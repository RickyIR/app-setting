import { TestBed, inject } from '@angular/core/testing';

import { AriaService } from './aria.service';

describe('AriaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AriaService]
    });
  });

  it('should be created', inject([AriaService], (service: AriaService) => {
    expect(service).toBeTruthy();
  }));
});
