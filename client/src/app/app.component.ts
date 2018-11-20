import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import _ from 'lodash';
import swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'hd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor() {

  }
  ngOnInit() {
  }
}
