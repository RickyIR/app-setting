import { WorkshopComponent } from './../../workshop.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hd-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.scss']
})
export class ExpertComponent implements OnInit {

  public author: any;

  constructor(private WorkshopComponent: WorkshopComponent) { }

  ngOnInit() {
    if (this.WorkshopComponent.workshop && this.WorkshopComponent.workshop.author){
      this.author = this.WorkshopComponent.workshop.author;
    }
  }

}
