import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/services/common/data.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainHttpService } from 'src/app/services/common/main-http.service';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-list-cart',
  templateUrl: './item-list-cart.component.html',
  styleUrls: ['./item-list-cart.component.css']
})
export class ItemListCartComponent implements OnInit {

  constructor(private data: DataService,
    private toastr: ToastrService,
    private httpService : MainHttpService,
    private router : Router,
    private route: ActivatedRoute,) { }
  count: number;
  contractBoqListItems: any[] = [];
  cartItemList: any[] = [];
  @Input('isActiveCreateBoqChild') isActiveCreateBoq: boolean;
  ngOnInit() {

    this.getEngineerNames();

    this.data.currentCartItemList.subscribe((data) => {

      this.contractBoqListItems = data;
      console.log(this.contractBoqListItems, "cart list contractBoqListItems")
    })
    /*set count cartList */
    this.data.currentListCount.subscribe(count => {
      this.count = count;
      console.log(this.count)
    })

    /* get cardlistArray cartList */
    this.data.currentCartItemList.subscribe(cartItemList => {
      this.cartItemList = cartItemList;
      console.log(this.cartItemList)
    })
  }

  /* recove from file upload componet */
  attachmentFileName: string;
  receivefileName($event) {
    this.attachmentFileName = $event
    console.log(this.attachmentFileName);
    this.form.controls.fileName.setValue(this.attachmentFileName)
  }

  form = new FormGroup({
    boqNumber: new FormControl('', Validators.required),
    boqReference: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    engineerName: new FormControl('', Validators.required),

  })
  get aliases() {
    return this.form.controls;
  }
  onSubmit() {
    console.log(this.form.value)
    const obj = {
      boqNumber: this.aliases.boqNumber.value,
      boqReference: this.aliases.boqReference.value,
      description: this.aliases.description.value,
      engineerName: this.aliases.engineerName.value,
      selectedDataList : this.cartItemList

    }
    const url = `${environment.serverUrl}/boq/api/add/boq`
    this.httpService.post_auth(url, obj).subscribe((data) => {
      console.log(data)
      if (!data['error'] && typeof data['error'] !== undefined) {
        this.toastr.success('Hello world!', 'Toastr fun!');
        this.form.reset();
        
        /* let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          queryParams: {
            boqNumber: this.aliases.boqNumber.value,
            boqReference: this.aliases.boqReference.value,
          },
         }; */
    
        // Navigate to the login page with extras
        this.router.navigate(['../boq-list']);
      } else {
        this.toastr.error('Hello world!', 'Toastr fun!');
      }

    });
  }



  removeFromCartList(item) {
    this.toastr.success('info', 'deleted');
    this.cartItemList = this.cartItemList.filter(function (obj) {
      return obj['_id'] !== item['_id'];
    });
    this.data.removeCartItemList(this.cartItemList)
  }
  getEngineerNames(){
    const url = `${environment.serverUrl}/user/api/engineers`;
    this.httpService.get_auth(url).subscribe(data => this.engineerNames = data.engineers)
  }
  public model: any;
  engineerNames : string[] = [];
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.engineerNames.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )



}
