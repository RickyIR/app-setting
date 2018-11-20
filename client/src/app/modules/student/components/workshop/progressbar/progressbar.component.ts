import { WorkshopComponent } from './../workshop.component';
import { SoundsService } from './../../../../../services/sounds.service';
import { Component, OnInit, ElementRef, Input, OnChanges } from '@angular/core';
import { Workshop } from '../../../../../interface/main';

import * as _ from 'lodash';

import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'hd-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss'],
})
export class ProgressbarComponent implements OnInit, OnChanges {

  public currentWorkshop: number;
  public pointerWorkshop: number;
  public workshop: Workshop;
  public allworkshops: string[];

  constructor(private el: ElementRef, private sound: SoundsService, private WorkshopComponent: WorkshopComponent) { }

  @Input() finished: string; // false or true STRINGS

  ngOnInit() {
    this.workshop = this.WorkshopComponent.workshop;
    this.pointerWorkshop = this.currentWorkshop = _.indexOf(this.workshop.series.workshops, this.workshop.name) + 1;
    this.allworkshops = this.workshop.series.workshops;

    if(!this.currentWorkshop){
      swal('Oops', 'Current workshops is not in the progress series', 'error');
    }
  }

  ngAfterViewInit() {
    try{
      let progressWidth = $('.completion-bar').find('ul li').eq(this.currentWorkshop - 1).position().left + 20;

      if(!progressWidth){
       throw Error('Progress Bar Width cannot be figured');
      }

      progressWidth = progressWidth.toFixed();

      $('.completion-bar--overflow-progress').css({
        width: progressWidth
      });


    }catch(e){
      swal('Opps', e.message || 'Something went wrong', 'error');
    }
  }

  ngOnChanges(): void {
    this.completed();
  }

  completed(): void {

    if (this.finished === 'false') {
      return;
    }

    const completionScrollTop = $('.completion-bar-wrapper').offset().top - ($( window ).height() / 2) + 150; // offset - (window's height / 2) + 150px (half of the progressbar height)

    $('html, body').animate({
      scrollTop: completionScrollTop
    }, 300);

    const nextWorkshop = this.currentWorkshop + 1;

    this.pointerWorkshop = 0; // to hide the pointer

    const bar = $('.completion-bar');

    try {
      if (!bar.find('ul li') || !bar.find('ul li').length) {
        throw Error('ul li is not defined');
      }

      bar.find('ul li .completion-bar-item--current').removeClass('completion-bar-item--current');

      const newWidth = bar.find('ul li').eq(nextWorkshop - 1).position().left + 20;

      $('.completion-bar--overflow-progress').delay(1000).animate({
        width: newWidth
      }, 1300);

      setTimeout(() => {
        this.pointerWorkshop = nextWorkshop;

        this.sound.play('tada');

        bar.find('ul li').eq(nextWorkshop - 1).find('.completion-bar-item').addClass('completion-bar-item--current');
      }, 2200);

      setTimeout(() => {
        $('.completion-bar-afterbox').css({
          display: 'block'
        });
      }, 3500);

    } catch (e) {
      console.error(e.message);
    }
  }

  rate(): void{
    this.WorkshopComponent.showAlert = true;
  }

}
