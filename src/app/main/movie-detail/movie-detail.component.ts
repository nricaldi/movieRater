import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

import { ApiService } from '../../api.service';
import { Movie } from '../../models/Movie';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'] 
})
export class MovieDetailComponent implements OnInit {  

  @Input() public movie : Movie = null;
  @Input() public isLoggedIn : boolean;
  @Output() public updateMovie = new EventEmitter<Movie>();
  @Output() public editedMovie = new EventEmitter<Movie>();
  @Output() public createMovie = new EventEmitter();
  @Output() public deletedMovie = new EventEmitter<Movie>();

  public username : string = '';

  faStar = faStar;
  ratingHovered = 0;

  constructor(private apiService: ApiService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    // let observable = this.apiService.getUser()
    console.log('is logged in? ', this.isLoggedIn)
  }

  ratingHover(rating: number) {
    this.ratingHovered = rating;
  }

  // sends the rating and id of movie to the api service to rate selected movie 
  // 
  rate(rating: number) {

    if(this.isLoggedIn) {
      this.apiService.rateMovie(rating, this.movie.id).subscribe(res => {
        console.log(res);
        this.update();
      });
    } else {
      alert('Please log in to access all features.');
    }

  }

  newMovie(): void {
    this.createMovie.emit();
  }

  // updates the selected movie 
  update(): void {
    this.apiService.getMovie(this.movie.id).subscribe((movie: Movie) => {
      this.updateMovie.emit(movie);
      console.log('nicolas ricaldi');
      
    });
  }

  editMovie(): void {
    this.editedMovie.emit(this.movie);
  }

  deleteMovie(): void {
    if(confirm("Are you sure you want to delete " + this.movie.title + "?")) {
      this.deletedMovie.emit(this.movie);
    }
  }

} 