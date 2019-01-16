/* import { Component, OnInit } from '@angular/core';
import { MainHttpService } from 'src/app/services/common/main-http.service';
import { environment } from 'src/environments/environment';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-stages',
  templateUrl: './stages.component.html',
  styleUrls: ['./stages.component.css']
})
export class StagesComponent implements OnInit {

  constructor(private httpService: MainHttpService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr : ToastrService) { }

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  areaName : string  = "";
  stageName : string  = "";
  areas : any[] = [];
  specificAreas : any[] = [];


  ngOnInit() {
    this.getStage();
    this.getArea();
    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'areaName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 7,
      allowSearchFilter: true
    };
  }

  stages: any[] = [];

  getStage() {
    const url = `${environment.serverUrl}/stage/api/stageList`
    this.httpService.get_auth(url).subscribe(
      (data) => {
        console.log(data)
        this.stages = data['stageList']
      }
    );
  }

  getArea() {
    const url = `${environment.serverUrl}/stage/api/areaList`
    this.httpService.get_auth(url).subscribe(
      (data) => {
        console.log(data)
        this.dropdownList = data['areaList']
      }
    );
  }

  onItemSelect(item: any) {
    this.areas.push(item._id);
  }
  onSelectAll(items: any) {
    this.selectedItems.push = items;
    items.forEach(element => {
      this.areas.push(element._id); 
    });
  }
  createNewArea(){
    const url = `http://localhost:3000/stage/api/add/area`;
    const obj = {
      areaName : this.areaName
    }
    this.httpService.post_auth(url,obj).subscribe((data)=>{
      console.log(data);
      if (!data['error'] && typeof data['error'] !== undefined) {
        this.toastr.success('Hello world!', 'Toastr fun!');
        this.areaName = "";
        this.getArea();
      } else {
        this.toastr.error('Hello world!', 'Toastr fun!');
      }
    })
  }
  createStage(){
    const url = `http://localhost:3000/stage/api/add`;
    const obj = {
      stageName : this.stageName,
      areas : this.areas
    }
    this.httpService.post_auth(url,obj).subscribe((data)=>{
      console.log(data);
      if (!data['error'] && typeof data['error'] !== undefined) {
        this.toastr.success('Hello world!', 'Toastr fun!');
        this.areaName = "";
        this.areas = [];
        this.getStage();
      } else {
        this.toastr.error('Hello world!', 'Toastr fun!');
      }
    })
  }
  addSpecificArea(){
      console.log("selected items",this.selectedItems)
      const areas = []
      this.selectedItems.forEach(element => {
        areas.push(element._id)
      });
      const obj = {
        stageName : this.selectedStageNameToAddArea,
        areas : areas
      }
      const url = `${environment.serverUrl}/stage/api/add-specific-area`
    this.httpService.put_auth(url,obj).subscribe(
      (data) => {
        console.log(data);
        this.getStage();
       }
    );
  }
  selectedStageNameToAddArea : string;
  beforeAddSpecificArea(stage){
    this.selectedStageNameToAddArea = stage.stageName
    this.selectedItems = [];
    stage.areas.forEach(element => {
      this.selectedItems.push(element)
    });
    
  }
  
  routeToContactBoq(stageName, area, type) {
    console.log(area, type)
    let navigationExtras: NavigationExtras = {
      relativeTo: this.route,
      queryParams: {
        'areaName': area,
        'type': type,
        'stageName': stageName
      },

    };

    // Navigate to the login page with extras
    this.router.navigate(['../submit-boq'], navigationExtras);

  }
}
 */


import { Component, OnInit } from '@angular/core';
import { MainHttpService } from 'src/app/services/common/main-http.service';
import { environment } from 'src/environments/environment';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-stages',
  templateUrl: './stages.component.html',
  styleUrls: ['./stages.component.css']
})
export class StagesComponent implements OnInit {

  constructor(private httpService: MainHttpService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private location: Location) { }

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  areaName: string = "";
  stageName: string = "";
  areas: any[] = [];
  specificAreas: any[] = [];


  ngOnInit() {
    this.getStage();
    this.getArea();
    /* this.selectedItems = []; */
    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'areaName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 7,
      allowSearchFilter: true
    };
  }

  stages: any[] = [];

  getStage() {
    const url = `${environment.serverUrl}/stage/api/stageList`
    this.httpService.get_auth(url).subscribe(
      (data) => {
        console.log(data)
        this.stages = data['stageList']
      }
    );
  }

  getArea() {
    const url = `${environment.serverUrl}/stage/api/areaList`
    this.httpService.get_auth(url).subscribe(
      (data) => {
        console.log(data)
        this.dropdownList = data['areaList']
      }
    );
  }

  onItemSelect(item: any) {
    this.areas.push(item._id);
  }
  onSelectAll(items: any) {
    this.selectedItems.push = items;
    items.forEach(element => {
      this.areas.push(element._id);
    });
  }
  createNewArea() {
    const url = `http://localhost:3000/stage/api/add/area`;
    const obj = {
      areaName: this.areaName
    }
    this.httpService.post_auth(url, obj).subscribe((data) => {
      console.log(data);
      if (!data['error'] && typeof data['error'] !== undefined) {
        this.toastr.success('Area Create Successfully!');
        this.areaName = "";
        this.getArea();
      } else {
        this.toastr.error('Cannot Create New Area');
      }
    })
    this.router.navigate(['./home/admin/stages']);
  }
  createStage() {
    const url = `http://localhost:3000/stage/api/add`;
    const obj = {
      stageName: this.stageName,
      areas: this.areas
    }
    this.httpService.post_auth(url, obj).subscribe((data) => {
      console.log(data);
      if (!data['error'] && typeof data['error'] !== undefined) {
        this.toastr.success('Stage Create Successfully!');
        this.areaName = "";
        this.areas = [];
        this.selectedItems = [];
        this.stages = [];
        this.getStage();
      } else {
        this.toastr.error('Cannot Create New Stage');
      }
    })
    
  }
  addSpecificArea() {
    console.log("selected items", this.selectedItems)
    const areas = []
    this.selectedItems.forEach(element => {
      areas.push(element._id)
    });
    const obj = {
      stageName: this.selectedStageNameToAddArea,
      areas: areas
    }
    const url = `${environment.serverUrl}/stage/api/add-specific-area`
    this.httpService.put_auth(url, obj).subscribe(
      (data) => {
        if (!data['error'] && typeof data['error'] !== undefined) {
          this.toastr.success('Area add to Stage Successfully!');
          this.selectedItems = [];
          this.getStage();
        } else {
          this.toastr.error('Something went wrong.');
        }
      }
    );
  }
  selectedStageNameToAddArea: string;
  beforeAddSpecificArea(stage) {
    this.selectedStageNameToAddArea = stage.stageName
    this.selectedItems = [];
    stage.areas.forEach(element => {
      this.selectedItems.push(element)
    });

  }

  routeToContactBoq(stageName, area, type) {
    console.log(area, type)
    let navigationExtras: NavigationExtras = {
      relativeTo: this.route,
      queryParams: {
        'areaName': area,
        'type': type,
        'stageName': stageName
      },
    };
    // Navigate to the login page with extras
    this.router.navigate(['../submit-boq'], navigationExtras);

  }
}
