import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService,
    private router: Router,
    private route : ActivatedRoute) { }

  ngOnInit() {
  }
  inValidLogin: boolean = false;

  login(credentials) {
    console.log(credentials)
    this.auth.login(credentials).subscribe(
      (result) => {
        console.log(result)
        if (result.token) {
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          localStorage.setItem('token', result['token']);
          localStorage.setItem('user', JSON.stringify(result['userDetails']));

          if (result['userDetails']['role'] === 0) {
            this.router.navigate([returnUrl || '/home/admin']);
          } else if(result['userDetails']['role'] === 1) {
            this.router.navigate([returnUrl || '/home/approve-person']);
          }else if(result['userDetails']['role'] === 2 ){
            this.router.navigate([returnUrl || '/home/supplier']);
          }else{
            this.router.navigate([returnUrl || '/login']);
          }
        } else {
          this.inValidLogin = true;
        }
      }
    )
  }
}


/* import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { DataService } from '../services/common/data.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private route : ActivatedRoute,
    private dataService : DataService,
    private toastr: ToastrService) { }
  
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
    password : new FormControl('',[Validators.required, Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$')]),
    confirmPassword : new FormControl('',[Validators.required,Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$')]),
    organization : new FormControl('')
  })
  get aliases() {
    return this.form.controls;
  }
  onSubmit(){
    const url = "http://localhost:3000/user/api/signup"
    if (this.isSupplier) {
      this.dataService.post(url,this.form.value).subscribe((data)=>{
        console.log(data)
        if (!data['error'] && typeof data['error'] !== undefined) {
          this.toastr.success('Hello world!', 'Toastr fun!');
          this.form.reset();
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
     this.dataService.post(url,obj).subscribe((data)=>{
       console.log(data)
       if (!data['error'] && typeof data['error'] !== undefined) {
        this.toastr.success('Hello world!', 'Toastr fun!');
        this.form.reset();
      } else {
        this.toastr.error('Hello world!', 'Toastr fun!');
      }
     })
    }


  }
 

} */

