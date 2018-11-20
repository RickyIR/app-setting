import { Observable, of } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';

import swal from 'sweetalert2';

interface NavLink{
  url: string;
  title: string;
  isRouter: boolean;
}

@Component({
  selector: 'hd-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {

  @Input('module') module: string;

  public links: NavLink[];

  constructor() { }

  ngOnInit() {
    console.log(this.module);
    this.getLinks(this.module).subscribe((data) => {
      if(!data){
        swal('Oops', 'Can\'t load data for the navigation bar. Please contact support team.', 'error');
        return;
      }

      this.links = data;
    })
  }

  // should be in separate service
  private getLinks(webModule: string): Observable<NavLink[]>{
    if(webModule == 'student'){
      return of([{
        url: '#workshop',
        title: 'Workshops',
        isRouter: false
      },
      {
        url: '#community',
        title: 'Community',
        isRouter: false
      },
      {
        url: '#help',
        title: 'Help',
        isRouter: false
      }])
    }

    if(webModule == 'author'){
      return of([{
        url: '/author/workshop',
        title: 'All workshops',
        isRouter: true
      },
      {
        url: '/author/quiz',
        title: 'All quizzes',
        isRouter: true
      },
      {
        url: '/author/stats',
        title: 'Font Research',
        isRouter: true
      }])
    }

    return of(null);
  }

}
