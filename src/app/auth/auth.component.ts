import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../_helpers/must-match.validator';

import { Router } from '@angular/router';

import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import { observable } from 'rxjs';


interface Token {
  token : string
}
 
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit { 

  public loginError : boolean;
  public registerError : boolean;
  public registerMode : boolean = true;
  public authForm: FormGroup;

  constructor(private apiService: ApiService, private cookieService: CookieService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    const token = this.cookieService.get('token');
    if(token) {
      this.router.navigate(['/movies']);
    }
    this.initForm();
  }

  initializeRegisterForm(): void {
    let currentUser: string= this.authForm.get('username').value;
    let currentPass: string = this.authForm.get('password').value;

    this.authForm = this.fb.group({
      username: [currentUser, [Validators.required, Validators.minLength(3)]],
      password: [currentPass, [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  initializeLoginForm(): void {
    let currentUser: string = '';
    let currentPass: string = '';
    
    if(this.authForm) {
      currentUser= this.authForm.get('username').value;
      currentPass = this.authForm.get('password').value;
    } 


    this.authForm = this.fb.group({
      username: [currentUser, [Validators.required, Validators.minLength(3)]],
      password: [currentPass, [Validators.required, Validators.minLength(8)]],
    });
  }

  initForm(): void {
    this.registerMode = !this.registerMode;

    if(this.registerMode) {
      this.initializeRegisterForm();
    } else {
      this.initializeLoginForm();
    }
  }

  saveForm() {

    if(this.authForm.valid) {

      if(this.registerMode) { // we register the new user
        
        // i need to pass username and pass and not confirm pass bc confirm pass is not in the db
        let formData = {
          username: this.authForm.get('username').value,
          password: this.authForm.get('password').value,
        }

        // make api call to create user with form data
        let observable = this.apiService.registerUser(formData);
        observable.subscribe(res => this.loginUser(), 
        error => {
          this.loginError = false;
          this.registerError = true;
        })
      } else {
        // we just have to log in the user and not create a new in the db
        this.loginUser();
      }

    }
  }

  loginUser() {
      // save values of form and send a post request to the api with the form data 
      // the response from the api we get from correct credentials is a token for the user
      // set the token value in cookies to dynamically change token value in the api.service
      let observable = this.apiService.loginUser(this.authForm.value);
      observable.subscribe(
        (token: Token) => {
          // using the cookie service's built in methods to set the token in the cookies
          this.cookieService.set('token', token.token);
          // route to the /movies page that displays the movie list
          this.router.navigate(['/movies']);

        },
        error => {
          // setting the error we get back for front end validation
          console.log('error maidy')
          this.registerError = false;
          this.loginError = true;
        }
      );
  }
}