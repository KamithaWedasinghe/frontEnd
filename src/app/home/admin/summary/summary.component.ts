import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/common/data.service';
import { environment } from 'src/environments/environment';
import { MainHttpService } from 'src/app/services/common/main-http.service';
import { ToastrService } from 'ngx-toastr';

import { FileUploader } from 'ng2-file-upload';
import { ActivatedRoute } from '@angular/router';


const URL = `${environment.serverUrl}/boq/api/boq-attachment`;

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})

export class SummaryComponent implements OnInit {



  constructor(private data: DataService,
    private httpService: MainHttpService,
    private toastr: ToastrService,
    private route : ActivatedRoute) {
    this.uploader.onCompleteItem = (item, response, status, header) => {
      this.attachments.push(response);
      console.log(JSON.parse(this.attachments[0])['result']['uploadFilePath'])
      this.attachmentUrl = JSON.parse(this.attachments[0])['result']['uploadFilePath']
    }
  }
  boq;
  list;
  hasStatus: boolean = false;
  admin: boolean = false;
  approvePerson: boolean = false;
  supplier: boolean = false;
  clickedNumber: number;
  editedRowNumber: number;
  isReadOnly: boolean = true;
  isInvalidQuantity: boolean = false;
  public uploader: FileUploader = new FileUploader({ url: URL });
  attachments = [];

  ngOnInit() {
    /* this.data.currentSelectedBoq.subscribe((boq) => {
      this.boq = boq
      this.list = boq['selectedDataList']
    }); */

    this.route.data.subscribe((data) => {
      console.log(data,"adsadasdasdas")
      this.boq = data.data['boq'][0]
      this.list = this.boq['selectedDataList']
    });

    if (JSON.parse(localStorage.getItem('user')).role === 0) {
      this.admin = true;
    } else if (JSON.parse(localStorage.getItem('user')).role === 1) {
      this.approvePerson = true;
    } else {
      this.supplier = true;
    }

  }
  showStatus() {
    this.hasStatus = !this.hasStatus;
  }
  forwardBoqToEngineer(boq) {
    const url = `${environment.serverUrl}/boq/api/forward-boq/${boq._id}`
    this.httpService.put_auth(url, boq).subscribe((data) => {
      console.log(data)
      if (!data['error'] && typeof data['error'] !== undefined) {
        this.toastr.success('Hello world!', 'Toastr fun!');
      } else {
        this.toastr.error('Hello world!', 'Toastr fun!');
      }

    });
  }
  accept(boq) {
    const url = `${environment.serverUrl}/boq/api/approve-reject-boq/${boq._id}`
    this.httpService.put_auth(url, { isApproved: true }).subscribe((data) => {
      console.log(data)
      if (!data['error'] && typeof data['error'] !== undefined) {
        this.toastr.success('Hello world!', 'Toastr fun!');
      } else {
        this.toastr.error('Hello world!', 'Toastr fun!');
      }

    });
  }

  reject(boq) {
    const url = `${environment.serverUrl}/boq/api/approve-reject-boq/${boq._id}`
    this.httpService.put_auth(url, { isApproved: false }).subscribe((data) => {
      console.log(data)
      if (!data['error'] && typeof data['error'] !== undefined) {
        this.toastr.success('Hello world!', 'Toastr fun!');
      } else {
        this.toastr.error('Hello world!', 'Toastr fun!');
      }

    });
  }
  prnumber : string;
  ponumber : string;

  addPrNumber() {
    
    if (this.prnumber == undefined || this.prnumber == "") {
      this.toastr.error("Add pr number before save","Error")
      return
    }
    const url = `${environment.serverUrl}/boq/api/addPrNumber/${this.boq._id}`
    this.httpService.put_auth(url, {prnumber : this.prnumber}).subscribe((data) => {
      console.log(data)
      if (!data['error'] && typeof data['error'] !== undefined) {
        this.prnumber = "";
        this.toastr.success( data['message'], 'Success');
      } else {
        this.toastr.error( data['errror'], 'Error');
      }

    });
  }
  addPoNumber() {
    if (this.ponumber == undefined || this.ponumber == "") {
      this.toastr.error("Add pr number before save","Error")
      return
    }
    const url = `${environment.serverUrl}/boq/api/addpoNumber/${this.boq._id}`
    this.httpService.put_auth(url, {ponumber : this.ponumber}).subscribe((data) => {
      console.log(data)
      if (!data['error'] && typeof data['error'] !== undefined) {
        this.ponumber = "";
        this.toastr.success( data['message'], 'Success');
      } else {
        this.toastr.error( data['errror'], 'Error');
      }

    });
  }
  edit(rowNumber: number) {
    this.editedRowNumber = rowNumber;
    this.isReadOnly = !this.isReadOnly;
  }
  quantityChecker(i, item, currentValue): number {
    if (currentValue > item.data.quantity) {
      this.isInvalidQuantity = true;
      this.toastr.error("invalid", "cant enter a than quantiy");
      return item.data.quantity;
    }
    else {
      this.isInvalidQuantity = false;
      console.log(item._id, currentValue, "item")
      this.saveEdit(i, item, currentValue)
      return currentValue;
    }
  }
  saveEdit(i, item, editedValue) {
    console.log(i, item._id, editedValue, this.boq)
    const url = `${environment.serverUrl}/boq/api/edit/quantity`
    this.httpService.post_auth(url, { id: item._id, editQuantity: editedValue }).subscribe((data) => {
      console.log(data)
      if (!data['error'] && typeof data['error'] !== undefined) {
        this.toastr.success('Hello world!', 'Toastr fun!');
      } else {
        this.toastr.error('Hello world!', 'Toastr fun!');
      }
    });
  }
  deleteOneRowItem(i, item) {
    console.log(i, item)
    const url = `${environment.serverUrl}/boq/api/update-row-item/${item._id}`
    this.httpService.put_auth(url, item).subscribe((data) => {
      console.log(data)
      if (!data['error'] && typeof data['error'] !== undefined) {
        this.toastr.success(data['message'], 'Success');
      } else {
        this.toastr.error('Something went wrong', 'Error');
      }
    });
  }
  attachmentUrl = "";
  comment: "";
  rows = 1;
  isComment = false
  placeholder = "Add a comment"
  showCommentSection() {
    this.rows = 10;
    this.isComment = true
  }
  addComment() {
    if (this.comment !== undefined) {
      const url = `${environment.serverUrl}/boq/api/add/comment/${this.boq._id}`
      this.httpService.post_auth(url, {
        message: this.comment,
        attachement: this.attachmentUrl ? this.attachmentUrl : ""
      }).subscribe((data) => {
        console.log(data)
        if (!data['error'] && typeof data['error'] !== undefined) {
          this.toastr.success('Comment add success', 'Success');
        } else {
          this.toastr.error('Comment not success', 'Error');
        }
      });
    } else {
      this.toastr.error('something went wrong', "Error")
    }


  }
  cancelComment() {
    this.isComment = false;
    this.rows = 1;
    this.uploader = null;
  }

}
