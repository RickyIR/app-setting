import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hd-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  ratingGroupId: number;
  knowledgeGroupId: number;
  videoDuration: string;

  constructor() {
   }

  ngOnInit() {
  }
}
