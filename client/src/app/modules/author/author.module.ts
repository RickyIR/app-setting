import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkshopComponent } from './components/workshop/workshop.component';
import { MainComponent } from './components/main.component';
import { WorkshopListComponent } from './components/workshop-list/workshop-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { AuthorRoutingModule } from './author.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorComponent } from './author.component';
import { CookieModule } from 'ngx-cookie';
import { SharedModule } from '../shared/shared.module';
import { StatsComponent } from './components/stats/stats.component';

import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthorRoutingModule,
    ReactiveFormsModule,
    CookieModule.forRoot(),
    NgCircleProgressModule.forRoot({
      radius: 60,
      space: -10,
      maxPercent: 100,
      outerStrokeWidth: 10,
      outerStrokeColor: '#4882c2',
      innerStrokeColor: '#e7e8ea',
      innerStrokeWidth: 10,
      animateTitle: false,
      animationDuration: 300,
      showUnits: false,
      showBackground: false,
      clockwise: true,
      startFromZero: false
    })
  ],
  declarations: [
    AuthorComponent,
    WorkshopListComponent,
    MainComponent,
    WorkshopComponent,
    HomeComponent,
    QuizComponent,
    QuizListComponent,
    StatsComponent
  ],
  providers: [
    {
      provide: 'AuthorChildGuard',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => true
    }
  ]
})
export class AuthorModule { }
