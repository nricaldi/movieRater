import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Movie } from '../../models/Movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  faStar = faStar;
  // faTrash = faTrash;
  // faPlus = faPlus;

  // Fetch the data from main component to Input to child components
  @Input() public movies : Movie[] = [];
  @Input() public isLoggedIn : boolean;
  @Output() public createMovie = new EventEmitter();
  @Output() public editedMovie = new EventEmitter<Movie>();
  @Output() public selectMovie = new EventEmitter<Movie>();
  @Output() public deletedMovie = new EventEmitter<Movie>();

  ngOnInit(): void {
   
 }

 movieClicked = (movie: Movie) => {
  console.log(movie.title);
  this.selectMovie.emit(movie);
 }

 editMovie = (movie: Movie) => {
  // console.log('Movie to edit ', movie);
  this.editedMovie.emit(movie);
 }

 newMovie = () => {
  // console.log('New movie activated');
  this.createMovie.emit();
 }

 deleteMovie = (movie: Movie) => {
  // console.log('movie to delete is', movie.title);
  if(confirm("Are you sure you want to delete " + movie.title + "?")) {
    this.deletedMovie.emit(movie);
  }
 } 

}