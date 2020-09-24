import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public isOpen: boolean = false;
  public isLoggedIn: boolean = false;

  constructor( private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    const token = this.cookieService.get('token');
    if (token) {
      this.isLoggedIn = true;
    }
    
  }

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
    this.ngOnInit();
  }

  logOut(): void {
    this.isOpen = false;
    this.cookieService.delete('token');
    this.router.navigate(['/auth']);
  }

}