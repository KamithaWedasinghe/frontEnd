import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MainHttpService } from 'src/app/services/common/main-http.service';
import { environment } from 'src/environments/environment';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-create-contract-boq',
  templateUrl: './create-contract-boq.component.html',
  styleUrls: ['./create-contract-boq.component.css']
})
export class CreateContractBoqComponent implements OnInit {

  constructor(private toastr: ToastrService,
    private dataService: MainHttpService,
    private router : Router) { }

  ngOnInit() {
    console.log("create component");
    this.getStage();

  }
  /* recove from file upload componet */
  uploadFileName: string;
  receivefileName($event) {
    this.uploadFileName = $event
    console.log(this.uploadFileName);
    this.form.controls.fileName.setValue(this.uploadFileName)
  }

  form = new FormGroup({
    stageName: new FormControl('', Validators.required),
    areaName: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    fileName: new FormControl('', Validators.required),

  })
  get aliases() {
    return this.form.controls;
  }

  onSubmit() {
    console.log(this.form.value)
    const obj = {
      stageName: this.aliases.stageName.value,
      areaName: this.aliases.areaName.value,
      type: this.aliases.type.value,
      fileName: this.aliases.fileName.value

    }
    var navigationExtras: NavigationExtras = {
      // relativeTo: this.route,
      queryParams: {
        'areaName': this.aliases.areaName.value,
        'type': this.aliases.type.value,
        'stageName': this.aliases.stageName.value,
        'fileName': this.aliases.fileName.value
      },
    };
    const url = `${environment.serverUrl}/contract-boq/api/add/contract-boq`
    this.dataService.post_auth(url, obj).subscribe((data) => {
      console.log(data)
      if (!data['error'] && typeof data['error'] !== undefined) {
        this.toastr.success('Hello world!', 'Toastr fun!');
        this.form.reset();
        
        this.router.navigate(['./home/admin/submit-boq'],navigationExtras);
      } else {
        this.toastr.error('Hello world!', 'Toastr fun!');
      }

    });
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
  /* setAreas(stage) {
    this.areas = stage['areas'];
    console.log(stage)
  } */
  /* isCheck() {
    if (this.areas.length <= 0) {
      this.toastr.info("first select stage", "info")
    }
  } */
  getSpecificArea() {

    if (this.aliases.stageName.value !== "" && this.aliases.stageName.value !== undefined)  {
      
      if (this.areas.length <= 0) {
        const selectedStage = this.aliases.stageName.value
      const url = `${environment.serverUrl}/stage/api/stage-area/${selectedStage}`
      this.dataService.get_auth(url).subscribe(
        (data) => {
          console.log(data['areas'][0]['areas'],"areas")
          this.areas = data['areas'][0]['areas'];
        }
      );
      }
      
    } else {
      
      this.toastr.info("first select stage", "info");
    }

  }

}
