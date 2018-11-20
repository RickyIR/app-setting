import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[hdCheckName]'
})


export class CheckNameDirective implements OnInit {

  @Input('hdCheckName') hdCheckName: string;

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    if (!this.el.nativeElement.name) {
      this.el.nativeElement.name = 'question_' + this.hdCheckName;
    }
  }
}
