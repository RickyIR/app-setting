import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import swal from 'sweetalert2';
import { AuthorizationService } from '../../../../services/authorization.service';

@Component({
  selector: 'hd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public isError: boolean;

  constructor(private auth: AuthorizationService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      code: ['', Validators.required]
    })

    this.isError = false;
  }

  login(values): void{
    try{
      if(!values){
        throw Error('Forms values are not defined');
      }

      if(!values.code){
        throw Error('Code is not defined');
      }

      this.isError = false;

      this.auth.login(values.code).subscribe((status) => {
        if(!status){
          return;
        }

        if(status === 200){
          this.router.navigate(['/workshop']);
        }else{
          this.isError = true;
        }
      })


    }catch(e){
      swal('Oops', e.message || 'Something went wrong', 'error');
    }
  }

}
