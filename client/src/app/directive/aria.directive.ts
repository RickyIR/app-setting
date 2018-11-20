import { Directive, Input, ElementRef, SimpleChanges } from '@angular/core';

import * as _ from 'lodash';

@Directive({
  selector: '[hdAria]'
})
export class AriaDirective {

  @Input('hdAria') hdAria: string;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.parseAttrObject(this.hdAria);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.parseAttrObject(this.hdAria);
  }

  parseAttrObject(attrObj: any): void{
    let keys = _.keys(attrObj);

    for(let key of keys){
      this.setAriaAttr(key, attrObj[key]);
    }
  }

  setAriaAttr(attr: string, value: boolean | string): void{
    if(value !== undefined){
      this.el.nativeElement.setAttribute(`aria-${attr}`, value);
    }
  }
}
