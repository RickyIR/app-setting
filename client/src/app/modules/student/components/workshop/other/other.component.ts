import { Workshop } from './../../../../../interface/main';
import { WorkshopComponent } from './../workshop.component';
import { Component, OnInit } from '@angular/core';

import _ from 'lodash';

@Component({
  selector: 'hd-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss']
})
export class OtherComponent implements OnInit {
  public tags: string[];

  constructor(private WorkshopComponent: WorkshopComponent) { }

  ngOnInit() {
    if(this.WorkshopComponent && this.WorkshopComponent.workshop && this.WorkshopComponent.workshop.tags){
      this.tags = this.WorkshopComponent.workshop.tags;

      this.tags = _.slice(this.tags, 0, 2);
      console.log(this.tags);
    }
  }

}
