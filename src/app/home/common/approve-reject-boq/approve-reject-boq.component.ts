import { Component, OnInit } from '@angular/core';
import { MainHttpService } from 'src/app/services/common/main-http.service';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/services/common/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approve-reject-boq',
  templateUrl: './approve-reject-boq.component.html',
  styleUrls: ['./approve-reject-boq.component.css']
})
export class ApproveRejectBoqComponent implements OnInit {

  constructor(private httpService: MainHttpService,
    private data: DataService,
    private router : Router) { }

  ngOnInit() {
    this.getApprovedList();
    this.getRejectedList();
  }
  hasAproved: boolean = false;
  hasRejected: boolean = false;


  approvedList : any[] = [];
  rejectedList : any[] = [];

  showApprovedList() {
    this.hasAproved = !this.hasAproved;
  }
  showRejectedList(){
    this.hasRejected = !this.hasRejected;
  }
  getApprovedList() {
    const url = `${environment.serverUrl}/boq/api/approved/boq-list`
    this.httpService.get_auth(url).subscribe((data) => {
      console.log(data)
      this.approvedList = data['boqList']
    })
  }
  getRejectedList() {
    const url = `${environment.serverUrl}/boq/api/rejected/boq-list`
    this.httpService.get_auth(url).subscribe((data) => {
      console.log(data)
      this.rejectedList = data['boqList']
    })
  }
  viewBoq(boq) {
    this.data.changeCurrentBoq(boq)
    this.router.navigate(['/home/admin/summary', boq._id])
  }

}
