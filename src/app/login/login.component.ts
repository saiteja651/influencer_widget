import { Component, OnInit, inject } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';

import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(private toastr: ToastrService) { }
  reactiveForm: FormGroup;
  router: Router = inject(Router)
  loginClicked: boolean = false;
  notLoggedin: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = ''
  authService: AuthService = inject(AuthService)
  ngOnInit(): void {
    if(this.authService.autoLogin()){
      this.router.navigate(['/home']);
    }
    this.reactiveForm = new FormGroup({
      username: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', Validators.required)
    })

  }
  onLogin() {
    if(this.reactiveForm.valid){
    this.isLoading = true;
    const data = new User(
      this.reactiveForm.get('username').value,
      this.reactiveForm.get('password').value
    )
    this.authService.login(data).subscribe({
      next: (res) => {
        if (res['status'] === "failure") {
          setTimeout(() => {
            this.isLoading = false;
            this.notLoggedin = true
            this.errorMessage = res['error']
          }, 2000)
          setTimeout(() => {
            window.location.reload();
          }, 4000)
        }
        else {
          setTimeout(() => {
            this.isLoading = false;
            this.loginClicked = true
          }, 2000)
          setTimeout(() => {
            this.router.navigate(['/home'])
          }, 4000)
        }

      },
      error: (res) => {

      }
    })
  }
  else{
    this.reactiveForm.markAllAsTouched();
  }
  }
}
