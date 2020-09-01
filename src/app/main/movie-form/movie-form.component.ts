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

  public movieForm : FormGroup;
  public id = null;
  public formError : string;
  public titleError : string;
  public descriptionError : string;

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
    if(this.checkForm()) {
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

   // Form Validation
   checkForm() {
    let isValidated = true;

    // check if form is empty
    if (this.movieForm.value.title.length == 0 &&
        this.movieForm.value.description.length == 0) {
          this.formError = 'Form cannot be empty';
          console.log(this.formError);
          isValidated = false;
    } else {
      // check if title is 1+ characters in length
      if (this.movieForm.value.title.length < 1 ) {
        this.titleError = 'title must be at least 1 character';
        isValidated = false;
      } else {
        // need to set as empty string to erase validation next time the form is submitted
          this.titleError = '';
        }
  
      // check if description is 10+ characters in length
      if (this.movieForm.value.description.length < 10 ) {
        this.descriptionError = 'password must be at least 8 characters';
        isValidated = false;
      } else {
          this.descriptionError = '';
        }
    }


    return isValidated;
  }

} 