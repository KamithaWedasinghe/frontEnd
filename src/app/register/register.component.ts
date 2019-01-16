import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { MainHttpService } from '../services/common/main-http.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private route : ActivatedRoute,
    private dataService : MainHttpService,
    private toastr: ToastrService,
    private router : Router) { }
  
  ngOnInit() {
  const user =  this.route.snapshot.queryParamMap.get('user');
  console.log(user)

  if (user == "mobitel") {
    this.isSupplier = false;
  } else {
    this.isSupplier = true;
  }

  }

  isSupplier : boolean = false;
  isMatch : boolean;

  form = new FormGroup({
    firstName : new FormControl('',Validators.required),
    lastName : new FormControl('',Validators.required),
    email : new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    password : new FormControl('',[Validators.required, Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}$')]),
    confirmPassword : new FormControl('',[Validators.required,Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}$')]),
    organization : new FormControl('')
  })
  get aliases() {
    return this.form.controls;
  }
  onSubmit(){
    const url = "http://localhost:3000/user/api/signup"
    if (this.isSupplier) {
      this.dataService.post_auth(url,this.form.value).subscribe((data)=>{
        console.log(data)
        if (!data['error'] && typeof data['error'] !== undefined) {
          this.toastr.success('Hello world!', 'Toastr fun!');
          this.form.reset();
          this.router.navigate(['/login'])
        } else {
          this.toastr.error('Hello world!', 'Toastr fun!');
        }
        
      })
    } else {
    const obj = {
      firstName: this.aliases.firstName.value,
      lastName: this.aliases.lastName.value,
      email: this.aliases.email.value,
      password : this.aliases.password.value
     } 
     this.dataService.post_auth(url,obj).subscribe((data)=>{
       console.log(data)
       if (!data['error'] && typeof data['error'] !== undefined) {
        this.toastr.success('Hello world!', 'Toastr fun!');
        this.form.reset();
        this.router.navigate(['/login'])
      } else {
        this.toastr.error('Hello world!', 'Toastr fun!');
      }
     })
    }


  }
 

}
