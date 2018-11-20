import { SharedModule } from './modules/shared/shared.module';
import { AuthorModule } from './modules/author/author.module';
import { StudentModule } from './modules/student/student.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { AppRoutingModule } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { CookieModule } from 'ngx-cookie';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CookieModule.forRoot(),
    StudentModule,
    AuthorModule,
    AuthenticationModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
