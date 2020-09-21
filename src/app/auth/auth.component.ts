import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../_helpers/must-match.validator';

import { Router } from '@angular/router';

import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';


interface Token {
  token : string
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit { 

  // public formError : string;
  // public usernameError : string;
  // public passwordError : string;
  // public confirmError : string;
  // public loginError : string;
  // public registerError : string;

  public registerMode : boolean = true;

  public authForm: FormGroup;

  // authForm = new FormGroup({
  //   username: new FormControl(''),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl('')
  // })

  constructor(private apiService: ApiService, private cookieService: CookieService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    const token = this.cookieService.get('token');
    if(token) {
      this.router.navigate(['/movies']);
    }
    this.initForm();
  }

  initializeRegisterForm(): void {
    this.authForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  initializeLoginForm(): void {
    this.authForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  initForm(): void {
    this.registerMode = !this.registerMode;

    if(this.registerMode) {
      this.initializeRegisterForm();
    } else {
      this.initializeLoginForm();
    }

    console.log(this.authForm);
    console.log(this.authForm.get('username'));

  }



  saveForm() {
  //   if (this.registerMode) { // we register the new user
  //     if(this.checkForm()){
  //       // i need to pass username and pass and not confirm pass
  //       let formData = {
  //         username: this.authForm.value.username,
  //         password: this.authForm.value.password,
  //       }
  //       let observable = this.apiService.registerUser(formData);
  //       observable.subscribe(res => { // create the new user 
  //         this.loginUser(); // log the new user in
  //       }, 
  //       error => {
  //         this.registerError = 'Username already exists';
  //         this.loginError = '';
  //         this.formError = '';
  //       });
  //     }
      
  //   } else { // we log in
  //     if(this.checkForm())
  //       this.loginUser();
  //   }
  }

  loginUser() {
  //     // save values of form and send a post request to the api with the form data 
  //     // the response from the api we get from correct credentials is a token for the user
  //     // set the token value in cookies to dynamically change token value in the api.service
  //     let observable = this.apiService.loginUser(this.authForm.value);
  //     observable.subscribe(
  //       (token: Token) => {
  //         // using the cookie service's built in methods to set the token in the cookies
  //         this.cookieService.set('token', token.token);
  //         // route to the /movies page that displays the movie list
  //         this.router.navigate(['/movies']);

  //       },
  //       error => {
  //         // setting the error we get back for front end validation
  //         this.loginError = 'Username or password incorrect';
  //         this.formError = '';
  //       }
  //     );
  }

  // // Form Validation
  // checkForm() {
  //   // validates if username is shorter than 
  //   let isValidated = true;

  //   // check if form is empty
  //   if (this.authForm.value.username.length == 0 &&
  //       this.authForm.value.password.length == 0 && 
  //       this.authForm.value.confirmPassword.length == 0) {
  //         this.formError = 'Form cannot be empty';
  //         this.confirmError = '';
  //         isValidated = false;
  //   } else {
  //     // check if username is 3+ characters in length
  //     if (this.authForm.value.username.length < 3 ) {
  //       this.usernameError = 'username must be at least 3 characters';
  //       isValidated = false;
  //     } else {
  //         this.usernameError = '';
  //       }
  
  //     // check if password is 8+ characters in length
  //     if (this.authForm.value.password.length < 8 ) {
  //       this.passwordError = 'password must be at least 8 characters';
  //       isValidated = false;
  //     } else {
  //         this.passwordError = '';
  //       }
  
      
  //     // check if password and confirm password match
  //     if(this.registerMode) {
  //       if(this.authForm.value.password !== this.authForm.value.confirmPassword) {
  //         this.confirmError = 'passwords do not match';
  //         this.formError = '';
  //         isValidated = false;
  //       }
  //     } else {
  //       this.confirmError = '';
  //     }
  //   }


  //   return isValidated;
  // }

}