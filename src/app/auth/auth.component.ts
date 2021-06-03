import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {observable, Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  authObs: Observable<AuthResponseData>

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (!form.value) {
      return
    }
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;
    if (this.isLoginMode) {
      this.authObs = this.authService.login(email, password)
    } else {
      this.authObs = this.authService.signup(email, password)
    }
    this.authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes'])
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }

}
