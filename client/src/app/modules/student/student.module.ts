import { SharedModule } from './../shared/shared.module';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { WorkshopDashboardComponent } from './components/workshop-dashboard/workshop-dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StudentRoutingModule } from './student.routing';

import { CheckNameDirective } from './../../directive/checkname.directive';
import { VideoTimePipe } from './../../pipe/videotime.pipe';

import { StudentComponent } from './student.component';
import { PointerComponent } from './components/workshop/progressbar/pointer/pointer.component';
import { ExpertComponent } from './components/workshop/video/expert/expert.component';
import { RatingStarsComponent } from './components/workshop/other/rating-stars/rating-stars.component';
import { DiscussionsComponent } from './components/workshop/video/discussions/discussions.component';
import { VideoPlayerComponent } from './components/workshop/video/video-player/video-player.component';
import { MainComponent } from './components/main.component';
import { OtherComponent } from './components/workshop/other/other.component';
import { KnowledgeComponent } from './components/workshop/knowledge/knowledge.component';
import { RatingComponent } from './components/workshop/rating/rating.component';
import { VideoComponent } from './components/workshop/video/video.component';
import { WorkshopComponent } from './components/workshop/workshop.component';

import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { ProgressbarComponent } from './components/workshop/progressbar/progressbar.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StudentRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot()
  ],
  declarations: [
    VideoComponent,
    RatingComponent,
    KnowledgeComponent,
    OtherComponent,
    ProgressbarComponent,
    MainComponent,
    VideoTimePipe,
    VideoPlayerComponent,
    CheckNameDirective,
    DiscussionsComponent,
    RatingStarsComponent,
    ExpertComponent,
    PointerComponent,
    StudentComponent,
    WorkshopComponent,
    RatingComponent,
    WorkshopDashboardComponent
  ],
  providers: [
    WorkshopComponent,
    VideoComponent,
    RatingComponent,
    VideoPlayerComponent,
    {
      provide: 'StudentChildGuard',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => true
    }
  ]
})
export class StudentModule { }
