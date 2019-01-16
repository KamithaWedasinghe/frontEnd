import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MainHttpService } from 'src/app/services/common/main-http.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/common/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-boq-list',
  templateUrl: './boq-list.component.html',
  styleUrls: ['./boq-list.component.css']
})
export class BoqListComponent implements OnInit {

  constructor(private httpService: MainHttpService,
    private router: Router,
    private data: DataService,
    private toastr : ToastrService) { }
  boq;
  admin: boolean = false;
  approvePerson: boolean = false;
  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user')).role === 0) {
      this.admin = true;
    } else if (JSON.parse(localStorage.getItem('user')).role === 1) {
      this.approvePerson = true;
    } else {
      this.approvePerson = false;
      this.admin = false;
    }
    this.getBoqList();
    this.data.currentSelectedBoq.subscribe((boq) => {this.boq = boq
    console.log(this.boq)})
  }
  boqList: any[] = [];

  getBoqList() {
    let url = ""
    if (JSON.parse(localStorage.getItem('user')).role === 0) {
       url = `${environment.serverUrl}/boq/api/boq-list` 
    } else if(JSON.parse(localStorage.getItem('user')).role === 1){
       url = `${environment.serverUrl}/boq/api/approve-person-view/boq-list`       
    }
    else if(JSON.parse(localStorage.getItem('user')).role === 2){
      url = `${environment.serverUrl}/boq/api/boq-list`     
   }
    
    this.httpService.get_auth(url).subscribe(
      (data) => {
        console.log(data) 
        this.boqList = data['boqList']
      }
    );
  }
  viewBoq(boq) {
    this.data.changeCurrentBoq(boq)
    if ( JSON.parse( localStorage.getItem('user') ).role === 0 ) {
      this.router.navigate(['/home/admin/summary', boq._id])
    } else if(JSON.parse( localStorage.getItem('user') ).role === 1) {
      this.router.navigate(['/home/approve-person/summary', boq._id])
    }else{
      this.router.navigate(['/home/supplier/summary', boq._id])
    }
    
  }
  forwardBoqToEngineer(boq) {
    const url = `${environment.serverUrl}/boq/api/forward-boq/${boq._id}`
    this.httpService.put_auth(url,boq).subscribe((data) => {
      console.log(data)
      if (!data['error'] && typeof data['error'] !== undefined) {
        this.toastr.success('Hello world!', 'Toastr fun!');
        this.getBoqList();
      } else {
        this.toastr.error('Hello world!', 'Toastr fun!');
      }

    });
  }

}
