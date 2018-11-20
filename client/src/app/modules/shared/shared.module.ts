import { AriaDirective } from './../../directive/aria.directive';
import { PopupDirective } from './../../directive/popup.directive';
import { RouterModule } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { TimeAgoPipe } from 'time-ago-pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    NavComponent,
    HeaderComponent,
    PopupDirective,
    TimeAgoPipe,
    AriaDirective
  ],
  exports: [
    HeaderComponent,
    PopupDirective,
    TimeAgoPipe,
    AriaDirective
  ]
})
export class SharedModule { }
