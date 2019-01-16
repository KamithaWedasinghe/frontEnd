import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth : AuthService) { }
name : string = ""
admin : boolean = false;
approvePerson : boolean = false;
supplier : boolean = false;

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user')).role === 2 ) {
      this.supplier =true;
      this.name = JSON.parse(localStorage.getItem('user'))['firstName'];
    } else if(JSON.parse(localStorage.getItem('user')).role === 1  ){
      this.approvePerson =true;
      this.name = JSON.parse(localStorage.getItem('user'))['firstName']
    }else{
      this.admin =true;
      this.name = JSON.parse(localStorage.getItem('user'))['firstName']
    }
  }

}
