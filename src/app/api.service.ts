import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://127.0.0.1:8000/';
  baseMovieUrl = `${this.baseUrl}api/movies/`;

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    //'Authorization': 'Token 789caa50535533ebe2c6ae77e4a286131417b947'
  });
  
  constructor(private _http: HttpClient, private cookieService: CookieService) { }

  // get all movies from api
  getMovies() : Observable<any> {
    return this._http.get(this.baseMovieUrl, {headers: this.getAuthHeaders()});
  }

  // get one movie
  getMovie(movieId: number) : Observable<any> {
    return this._http.get(`${this.baseMovieUrl}${movieId}/`, {headers: this.getAuthHeaders()});
  }

  // create a new movie
  createMovie(title: string, description: string) : Observable<any> {
    const body = JSON.stringify( { title, description } );
    // if the key and value pairs are the same name you only need to provide the name once instead of traditionl object
    // {title} = {title: title}
    return this._http.post(`${this.baseMovieUrl}`, body, {headers: this.getAuthHeaders()});
  }

  // update selected movie
  updateMovie(movieId: number, title: string, description: string) : Observable<any> {
    const body = JSON.stringify( { title, description } );
    // if the key and value pairs are the same name you only need to provide the name once instead of traditionl object
    // {title} = {title: title}
    return this._http.put(`${this.baseMovieUrl}${movieId}/`, body, {headers: this.getAuthHeaders()});
  }
  
  deleteMovie(movieId: number) : Observable<any> {
    return this._http.delete(`${this.baseMovieUrl}${movieId}/`, {headers: this.getAuthHeaders()})
  }

  // send rating to api
  rateMovie(rating : number, movieId : number) : Observable<any> {
    const body = JSON.stringify({stars: rating});
    return this._http.post(`${this.baseMovieUrl}${movieId}/rate_movie/`, body, {headers: this.getAuthHeaders()});
  }

  getUser(userId : number) {
    return this._http.get(`${this.baseUrl}api/users/${userId}`, {headers: this.headers});
  }

  loginUser(authData) {
    const body = JSON.stringify(authData);
    return this._http.post(`${this.baseUrl}auth/`, body, {headers: this.getAuthHeaders()})
  }

  registerUser(authData) {
    const body = JSON.stringify(authData);
    return this._http.post(`${this.baseUrl}api/users/`, body, {headers: this.headers})
  }
  
  // used to dynamically get the token for the logged in user
  getAuthHeaders() {
    const token = this.cookieService.get('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'Token 789caa50535533ebe2c6ae77e4a286131417b947'
      'Authorization': `Token ${token}`
    });
  }
  
}
 