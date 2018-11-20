import { AuthorizationService } from './../../../../services/authorization.service';
import { Component, OnInit, ElementRef, Input } from '@angular/core';

declare var $:any;
declare var window: any;

import * as _ from 'lodash';

@Component({
  selector: 'hd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input('module') module: string;

  constructor(private el: ElementRef, public auth: AuthorizationService) { }

  ngOnInit() {
    /**
    * Function that closes the collapsed menu if another collapsed menu is open
     */
    const nodeMenus = $('[data-toggle="collapse"]');

    _.forEach(nodeMenus, (item) => {
      $(item).click((e) => {
        if (e.isTrigger) {
          return;
        }
        _.forEach(nodeMenus, (itemInside) => {
          if ($(itemInside).attr('aria-expanded') === 'true' && item !== itemInside) {
            $(itemInside).click();
          }
        });
      });
    });

    $('.dropdown').on('show.bs.dropdown', (e) => {
      $('#dropdownProfile').slideDown();
    });

    $('.dropdown').on('hide.bs.dropdown', (e) => {
      $('#dropdownProfile').slideUp();
    });

    $(window).scroll(() => {
      const scrollTop = $(window).scrollTop();

      if ($(window).innerWidth() < 767) {
        return;
      }

      if (scrollTop > 50) {
        $('.navbar').removeClass('navbar-static').addClass('navbar-fixed');
      } else {
        $('.navbar').removeClass('navbar-fixed').addClass('navbar-static');
      }

    });
  }

  changeFontSize(size: number): void {
    $('.page-wrapper').removeClass('fc-32').removeClass('fc-24');
    $('.navbar-mid-right').find('#demo').collapse('toggle');

    if (size === 16) {
      $('html').attr('fSize', '');
    } else {
      $('html').attr('fSize', size);
      $('.page-wrapper').addClass(`fc-${size}`);
    }

    window.AblePlayer.lastCreated.refreshControls();
  }

  changeColor(color: string): void {
    $('.page-wrapper').removeClass('fc-yellow').removeClass('fc-white');
    $('html, body').removeClass('fc-yellow').removeClass('fc-white');
    $('.navbar-mid-right').find('#demo').collapse('toggle');

    if (color === 'white' || color === 'yellow') {
      $('.page-wrapper').addClass(`fc-${color}`);
      $('html, body').addClass(`fc-${color}`);
    }
  }

}
