import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() isLoggedIn: boolean;

  constructor() { }

  ngOnInit(): void {
    console.log(this.isLoggedIn);
    
  }
}
