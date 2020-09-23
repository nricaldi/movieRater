import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

import { ApiService } from '../../api.service';
import { Movie } from '../../models/Movie';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'] 
})
export class MovieDetailComponent implements OnInit {  

  @Input() public movie : Movie = null;
  @Output() public updateMovie = new EventEmitter<Movie>();
  // @Output() public updateList = new EventEmitter();

  public username : string = '';

  faStar = faStar;
  ratingHovered = 0;

  constructor(private apiService: ApiService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    // let observable = this.apiService.getUser()
  }

  ratingHover(rating: number) {
    this.ratingHovered = rating;
  }

  // sends the rating and id of movie to the api service to rate selected movie 
  // 
  rate(rating: number) {
    this.apiService.rateMovie(rating, this.movie.id).subscribe(res => {
      console.log(res);
      this.update();
    });
  }

  // updates the selected movie 
  update() {
    this.apiService.getMovie(this.movie.id).subscribe((movie: Movie) => {
      this.updateMovie.emit(movie);
      console.log('nicolas ricaldi');
      
    });
  }

  // logout() {
  //   console.log('logout');
    
  //   this.cookieService.delete('token');
  //   this.router.navigate(['/auth']);
  // }

} 