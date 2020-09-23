import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../api.service';
import { Movie } from '../models/Movie';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  // list of all movies
  public movies : Movie[] = [];
  // Movie selected to view or update 
  public selectedMovie: Movie = null;
  // Movie to edit
  public movieToEdit: Movie = null;
  // Logged in user or not 
  public isLoggedIn: boolean = false;

  public home: boolean = true;
  // public test: boolean = false;

  constructor(private apiService: ApiService,  private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    const token = this.cookieService.get('token');
    console.log(token);
    if(token) {
      // this.router.navigate(['/auth']);'  
      this.getAuthMovies();
      this.isLoggedIn = true;
    }
    else {
      this.getAllMovies();
    }
  }

  getAllMovies() {
    // make api call to get all movies
    let observable = this.apiService.getMovies();
    observable.subscribe((data: Movie[]) => {
      this.movies = data;
    });
    // console.log('movies updated')
  }

  getAuthMovies(): void {
    let observable = this.apiService.getAuthMovies();
    observable.subscribe((data: Movie[]) => {
      this.movies = data;
    });
  }

  // set the movie to view or to send updated information
  selectMovie(movie: Movie) {
    this.movieToEdit = null;
    this.selectedMovie = movie; 
    this.home = false;
    this.movieUpdated(movie);
    // console.log('nicolas ricaldi 2 ');
  }

  // set the movie to edit to send to the form component 
  editMovie(movie: Movie) {
    this.selectedMovie = null;
    this.home = false;
    this.movieToEdit = movie;
  }

  createMovie() {
    this.selectedMovie = null;
    this.home = false;
    this.movieToEdit = {id: null, title: '', description: '', avg_rating: null, no_of_ratings: null};
  }

  deleteMovie(movie: Movie) {
    let observable = this.apiService.deleteMovie(movie.id);
    observable.subscribe( () => {
      this.getAllMovies();
      // You can also remove the movie from the movies array using the filter method
      // this.movies = this.movies.filter(m => m.id !== movie.id);
    });
  }
  
  movieCreated(movie: Movie) {
    this.movies.push(movie);
    this.movieToEdit = null;
  }

  movieUpdated(movie: Movie) {
    const index = this.movies.findIndex(m => m.id == movie.id);

    if (index >= 0)
      this.movies[index] = movie;

    // this.getAllMovies();
    
    this.movieToEdit = null;
  }
}