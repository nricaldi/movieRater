import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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

  public errors;
  public registerMode : boolean = false;

  authForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private apiService: ApiService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    const token = this.cookieService.get('token');
    if(token) {
      this.router.navigate(['/movies']);
    }
  }

  saveForm() {

    if (this.registerMode) { // we register the new user
      let observable = this.apiService.registerUser(this.authForm.value);
      observable.subscribe(res => { // create the new user 
        this.loginUser(); // log the new user in
      });
      
    } else { // we log in
      this.loginUser();
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
          this.errors = error;
        }
      );
  }
}