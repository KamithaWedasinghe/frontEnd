import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/common/data.service';
import { ToastrService } from 'ngx-toastr';
import { MainHttpService } from 'src/app/services/common/main-http.service';

@Component({
  selector: 'app-create-boq-supplier',
  templateUrl: './create-boq-supplier.component.html',
  styleUrls: ['./create-boq-supplier.component.css']
})
export class CreateBoqSupplierComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private dataService: MainHttpService,
    private router: Router,
    private data: DataService,
    private toastr : ToastrService) { }

  contractboqs: any[] = [];
  selectedContractBoqs : any[] = [];
  
  singleContractBoq: Object;
  isCreateView: boolean = false;
  admin: boolean = false;
  supplier: boolean = false;

  number: number;

  type: string;
  stage: string;
  area: string;

  ngOnInit() {
    this.route.queryParamMap.subscribe(data => console.log(data))
    // console.log(area);
    //this.getSubmitBoqs();
    this.getStage();
    this.getArea();
    if(JSON.parse(localStorage.getItem('user')).role === 0){
      this.admin = true;
    }else if(JSON.parse(localStorage.getItem('user')).role === 2){
      this.supplier = true;

    }

    //this.data.currentSingleContractBoq.subscribe(singleContractBoq => this.singleContractBoq = singleContractBoq)
    this.data.selectedContractBoqs.subscribe(selectedContractBoqs => this.selectedContractBoqs = selectedContractBoqs)

  }

  getSubmitBoqs() {
    const url = `${environment.serverUrl}/contract-boq/api/contract-boq-list`
    this.dataService.get_auth(url).subscribe(
      (data) => {
        console.log(data)
        this.contractboqs = data['contractBoqList']
      }
    );
  }

  stages: any[] = [];
  areas: any[] = [];

  getStage() {
    const url = `${environment.serverUrl}/stage/api/stageList`
    this.dataService.get_auth(url).subscribe(
      (data) => {
        console.log(data)
        this.stages = data['stageList']
      }
    );
  }
  getArea() {
    const url = `${environment.serverUrl}/stage/api/areaList`
    this.dataService.get_auth(url).subscribe(
      (data) => {
        console.log(data)
        this.areas = data['areaList']
      }
    );
  }
 
  createBoq() {
    console.log(this.stage,this.area,this.type)
    if (this.stage === undefined && this.area === undefined && this.type === undefined) {
      this.toastr.info("sample","please select area, stage, type")
      return;
    }
    const obj = {
      searchObj :  {
      stageName: this.stage,
      areaName: this.area,
      type: this.type
    }}
    const url = `${environment.serverUrl}/contract-boq/api/create/contract-boq-list`
    this.dataService.post_auth(url, obj).subscribe(
      (data) => {
        console.log(data)
        this.contractboqs = data['contractBoqList'];
         this.data.changeContractBoqs(data['contractBoqList']);
       this.isCreateView = true;
      }
    );
  }
  /* view(contractboq, index) {
    this.number = index;
    this.isView = true;
    this.data.changesingleContractBoq(contractboq)
   
  } */


}
