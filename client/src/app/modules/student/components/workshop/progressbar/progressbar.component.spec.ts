import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Progressbar2Component } from './progressbar.component';

describe('Progressbar2Component', () => {
  let component: Progressbar2Component;
  let fixture: ComponentFixture<Progressbar2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Progressbar2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Progressbar2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
