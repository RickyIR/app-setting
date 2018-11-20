import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hd-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.scss']
})
export class RatingStarsComponent implements OnInit {

  stars: number;
  starsOffset: number;

  @Input('rating') rating: string;

  constructor() {
  }

  ngOnInit() {
    this.stars = +this.rating;
    this.starsOffset = (this.stars - Math.floor(this.stars)) ? ((this.stars - Math.floor(this.stars)) * 100) : 0;
  }

}
