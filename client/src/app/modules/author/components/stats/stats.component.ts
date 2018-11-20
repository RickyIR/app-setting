import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';

@Component({
  selector: 'hd-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  public fonts: any[];
  public totalCount: number;
  public stats: any;
  public isLoading: boolean;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadFonts();
  }

  loadFonts(e?: Event): void{
    this.isLoading = true;

    if(e){
      e.preventDefault();
    }

    this.http.get<any>(`font-research/stats/`).subscribe((res) => {
      this.isLoading = false;

      if(res && res.result && res.stats){
        this.fonts = res.result.data;
        this.totalCount = res.result.totalCount;
        this.stats = {
          gothic: Number.prototype.toFixed.call(_.find(res.stats, {_id: 'Century Gothic'}).count / this.totalCount * 100),
          univers: Number.prototype.toFixed.call(_.find(res.stats, {_id: 'Univers'}).count / this.totalCount * 100),
          gotham: Number.prototype.toFixed.call(_.find(res.stats, {_id: 'Gotham'}).count / this.totalCount * 100),
          none: Number.prototype.toFixed.call(_.find(res.stats, {_id: 'none'}).count / this.totalCount * 100)
        };
      }
    })
  }
}
