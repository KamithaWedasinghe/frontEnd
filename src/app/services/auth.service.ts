import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MainHttpService } from './common/main-http.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private dataService: MainHttpService,
    private router : Router) { }

  login(credentials) {
    const url = 'http://localhost:3000/user/api/login'
    return this.dataService.post_auth(url,credentials)
  }

  isLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }

  getUserDetails() {

  }
}
