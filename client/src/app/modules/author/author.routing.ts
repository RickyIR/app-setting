import { QuizComponent } from './components/quiz/quiz.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { AuthorChildGuard } from './../../guards/author.child.guard';
import { AuthorGuard } from './../../guards/author.guard';
import { AuthorComponent } from './author.component';
import { WorkshopListComponent } from './components/workshop-list/workshop-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkshopComponent } from './components/workshop/workshop.component';
import { StatsComponent } from './components/stats/stats.component';

const routes: Routes = [
  {
    path: 'author',
    component: AuthorComponent,
    canActivate: [AuthorGuard],
    canActivateChild: [AuthorChildGuard],
    children: [
      {
        path: '',
        redirectTo: '/author/workshop',
        pathMatch: 'full'
      },
      {
        path: 'workshop',
        component: WorkshopListComponent
      },
      {
        path: 'workshop/:name', // or new for new Workshop
        component: WorkshopComponent
      },
      {
        path: 'quiz',
        component: QuizListComponent
      },
      {
        path: 'quiz/:id', // or new for new Quiz
        component: QuizComponent
      },
      {
        path: 'stats',
        component: StatsComponent
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class AuthorRoutingModule {

}
