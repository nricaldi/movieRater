import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from 'src/app/models/Movie';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {

  movieForm : FormGroup;
  id = null;

  @Output() movieCreated = new EventEmitter<Movie>();
  @Output() movieUpdated = new EventEmitter<Movie>();
  
  // set the values of the form when the component is created
  // movie now becomes a function instead of a variable
  @Input() set movie(val: Movie) {
    this.id = val.id;
    this.movieForm = new FormGroup({
      title: new FormControl(val.title),
      description: new FormControl(val.description)
    });
  }

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  saveForm() {

    // updates the existing movie if the id is given
    if (this.id) {
      let observable = this.apiService.updateMovie(this.id, this.movieForm.value.title, this.movieForm.value.description);
      observable.subscribe(
        (updatedMovie: Movie) => this.movieUpdated.emit(updatedMovie),
        errors => console.log(errors)
      );
    }

    // creates a new movie with form values
    else {
      let observable = this.apiService.createMovie(this.movieForm.value.title, this.movieForm.value.description);
      observable.subscribe(
        (newMovie: Movie) => this.movieCreated.emit(newMovie),
        error => console.log(error)
      )}

  }

}