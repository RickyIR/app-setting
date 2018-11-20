import { AriaService } from './../services/aria.service';
import { Directive, Input, ElementRef, HostListener } from '@angular/core';

import * as _ from 'lodash';

@Directive({
  selector: '[hdPopup]'
})
export class PopupDirective {

  @Input() popupText: string;

  LINKS: {href?: string, id?: string, title: string, content: string}[];

  constructor(private el: ElementRef, private aria: AriaService) {

    this.LINKS = [
      {
        id: 'startConversation',
        title: 'Start a Conversation',
        content: 'Takes you to the new discussion page.'
      },
      {
        id: 'viewAllDiscussions',
        title: 'View all discussions',
        content: 'All discussions will be expanded'
      },
      {
        id: 'moreWorkshops',
        title: 'More workshops',
        content: 'Selecting this will bring up more workshops we think you may enjoy.'
      },
      {
        id: 'views-button-1',
        title: 'Viewers',
        content: 'Viewers: 2,203 have viewed this workshop already'
      },
      {
        id: 'views-button-2',
        title: 'Viewers',
        content: 'Viewers: 8,424 have viewed this workshop already'
      },
      {
        id: 'views-button-3',
        title: 'Viewers',
        content: 'Viewers: 1,324 have viewed this workshop already'
      },
      {
          href: '#home-page',
          title: 'Home Page',
          content: 'Takes you to Hadley.edu home page.'
      },
         {
          href: '#workshop',
          title: 'Workshops',
          content: 'Takes you to a searchable list of all the learning workshops available through Hadley'
      },
      {
          href: '#community',
          title: 'Community',
          content: 'Takes you to a new learning community section where you can interact with peers'
      },
     {
          href: '#help',
          title: 'Help',
          content: 'Takes you to a page where you can contact Hadley’s customer service team (including tech support)'
      },
        {
          href: '#settings',
          title: 'My Hadley Settings',
          content: 'Where you would set up your personal account.'
      },
       {
          href: '#favorites',
          title: 'My Hadley Favorites',
          content: 'Quick access to learning workshops you’ve favorited'
      },
      {
        href: '#playlist',
        title: 'My Hadley Playlists',
        content: 'Access personalized playlists of learning workshops curated for you and by you.'
      },
      {
        href: '#mycommunity',
        title: 'My Hadley Community',
        content: 'Access peer community discussions on any learning workshop you’ve taken.'
      },
     {
        href: '#badges',
        title: 'My Hadley Badges',
        content: 'Where you see your progress on various series and identify future goals.'
      },
      {
        href: '#workshop-profile',
        title: 'Author Profile',
        content: 'Gives you a quick bio of this author.'
      },
      {
        href: '#submit-idea',
        title: 'Submit an Idea',
        content: 'Here is where you could submit an idea for something you’d like to learn. If we have a workshop we think may meet your needs we will recommend that. If not, we will have the community vote on this idea for future development.”'
      },
      {
        href: '#workshop-title-one',
        title: 'Playtime with your pup',
        content: 'Quick description of this workshop.'
      },
          {
          href: '#workshop-title-two',
          title: 'Keyboarding Basics',
          content: 'Quick description of this workshop.'
      },
          {
          href: '#workshop-title-three',
          title: '101: Becoming a Blogger',
          content: 'Quick description of this workshop.'
      },
      {
        href: '#workshop-image-one',
        title: 'Playtime with your pup',
        content: 'Takes you to Playtime with Your Pup workshop'
      },
          {
          href: '#workshop-image-two',
          title: 'Keyboarding Basics',
          content: 'Takes you to Keyboarding Basics workshop'
      },
          {
          href: '#workshop-image-three',
          title: '101: Becoming a Blogger',
          content: 'Takes you to 101: Becoming a Blogger” workshop'
      }
    ];
  }

  @HostListener('click', ['$event']) onclick(e: Event) {
    e.preventDefault();

    try {
      let title, content;
      if(this.popupText){
        title = _.split(this.popupText, "||")[0];
        content = _.split(this.popupText, "||")[1];
      }else{
        const href = this.el.nativeElement.getAttribute('href');
        const id = this.el.nativeElement.getAttribute('id');

        if (!href && !id) {
          throw Error('href or id is not defined');
        }

        if(href==="#"){
          return;
        }

        const foundByHref = _.find(this.LINKS, {href: href});
        const foundById = _.find(this.LINKS, {id: id});

        if (!foundByHref && !foundById) {
          throw Error('Object is not found');
        }

        title = (foundByHref) ? foundByHref.title : foundById.title;
        content = (foundByHref) ? foundByHref.content : foundById.content;
      }

      this.aria.ariaSwal({
        title: title,
        text: content,
        type: 'info'
      });

    } catch (e) {
      console.log(e.message);
    }

  }
}
