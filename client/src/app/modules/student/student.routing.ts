import { StudentChildGuard } from './../../guards/student.child.guard';
import { WorkshopComponent } from './components/workshop/workshop.component';
import { StudentComponent } from './student.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkshopDashboardComponent } from './components/workshop-dashboard/workshop-dashboard.component';
import { StudentGuard } from '../../guards/student.guard';


const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    canActivate: [StudentGuard],
    canActivateChild: [StudentChildGuard],
    children: [
      {
        path: 'workshop',
        component: WorkshopDashboardComponent
      },
      {
        path: 'workshop/:name',
        component: WorkshopComponent
      },
      {
        path: '',
        redirectTo: '/workshop',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class StudentRoutingModule {

}
