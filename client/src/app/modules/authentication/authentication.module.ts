import { ReactiveFormsModule } from '@angular/forms';
import { CookieModule } from 'ngx-cookie';
import { AuthenticationRoutingModule } from './authetication.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    CookieModule.forRoot()
  ],
  declarations: [
    AuthenticationComponent,
    LoginComponent
  ]
})
export class AuthenticationModule {
 }
