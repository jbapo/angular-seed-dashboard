import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatProgressBar, MatButton } from '@angular/material';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from "../../../services/auth/auth.service";

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { HttpErrorResponse } from '@angular/common/http/src/response';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  signinForm: FormGroup;
  returnUrl: string;
  

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._authService.logout();
    this.signinForm = new FormGroup({
      grant_type: new FormControl('password', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false)
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';    
  }

  signin() {
    const SIGNINDATA = this.signinForm.value
    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';
    this._authService.signin(SIGNINDATA)
    .subscribe(
      user => {
        //Go to Dashboard
        user.username = SIGNINDATA.username;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this._router.navigateByUrl('/dashboard');
      },
      (err: HttpErrorResponse) => {console.log(err);
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      });
  }//end signin()
  
}
