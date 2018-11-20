import { trigger, transition, animate, style } from '@angular/animations';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hd-progressbar-pointer',
  templateUrl: './pointer.component.html',
  styleUrls: ['./pointer.component.scss'],
  animations: [
    trigger('pointerAnim', [
      transition(':enter', [
        style({
          transform: 'translate(0, 0)',
          opacity: 0
        }),
        animate('.5s ease-in', style({
          transform: 'translate(0, 0)',
          opacity: '1'
        }))
      ]),
      transition(':leave', [
        style({
          transform: 'translate(0, 0)',
          opacity: 1
        }),
        animate('.5s ease-in', style({
          transform: 'translate(0, 0)',
          opacity: 0
        }))
      ])
    ])
  ]
})

export class PointerComponent implements OnInit {

  constructor() { }

  @Input() showPointer: string;

  ngOnInit() {
  }

}
