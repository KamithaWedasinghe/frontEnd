import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/common/data.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { MainHttpService } from 'src/app/services/common/main-http.service';

@Component({
  selector: 'app-view-create-boq',
  templateUrl: './view-create-boq.component.html',
  styleUrls: ['./view-create-boq.component.css']
})
export class ViewCreateBoqComponent implements OnInit {

 
  contractBoqs;
  sheetData: any[] = [];
  clickedNumber: number;
  editedRowNumber: number;
  isReadOnly: boolean = true;
  count: number;
  cartItemList: any[] = [];
  isInvalidQuantity: boolean = false;
  isActiveCreateBoq : boolean = false;
  admin : boolean = false;
  


  constructor(private data: DataService,
    private toastr: ToastrService,
    private httpService : MainHttpService ) { }

  ngOnInit() {
    this.data.currentSelectedBoq.subscribe(contractBoqs => {
      this.contractBoqs = contractBoqs
      //console.log(this.contractBoqs,"contractBoqs")
      const sheetData = this.contractBoqs[0].contractBoqFileData[0].dataList;
      const sheetName = this.contractBoqs[0].contractBoqFileData[0].sheetName
      this.setSheetDataToView(sheetData,0,sheetName)
      this.selectedConBoqNumber = 0;
      /* get intial datasheet to the table */
      /* this.sheetData = this.singleContractBoq.contractBoqFileData[0]['dataList'];
      this.clickedNumber = 0; */

    });
    /* get count cartList */
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

  editedContractBoq(contractBoq) {
    this.data.changesingleContractBoq(contractBoq)
  }
  selectSheetName : string = "";
  setSheetDataToView(sheetdata, clickedItemIndex: number,name) {
    this.sheetData = sheetdata;
    this.clickedNumber = clickedItemIndex;
    this.showDataList = true;
    this.selectSheetName = name
  }
  hasSheetNames : boolean = false;
  showDataList : boolean = false;
  showSheetName(){
    this.hasSheetNames = true;
  }
  selectedConBoqNumber : number = 0
  showSelectedConBoqFileName(selectedContractBoqIndex){
      this.selectedConBoqNumber = selectedContractBoqIndex;
  }

 
  
  edit(rowNumber: number) {
    this.editedRowNumber = rowNumber;
    this.isReadOnly = !this.isReadOnly;
    console.log(this.editedRowNumber)
  }
  /* has to be implement */
  addToItemList(event, dataList) {
    console.log(dataList['_id'], "dataList")
    if (event.target.checked) {
      (this.cartItemList as Array<object>).forEach(element => {
        if (element['_id'] === dataList['_id']) {
          return this.toastr.warning('info', 'this element also selected');
        }
      });
      this.cartItemList.push(dataList)
      this.data.addCartItemList(this.cartItemList)
    } else {
      this.toastr.success('info', 'deleted');
          this.cartItemList = this.cartItemList.filter(function( obj ) {
            return obj['_id'] !== dataList['_id'];
        });
        this.data.removeCartItemList(this.cartItemList)
    }
  }
  
  isDisabledByWrongQuantity : boolean = false;
  quantityChecker(dataList,previousValue, currentValue) : number {
    console.log(dataList._id)
    if (currentValue > previousValue) {
      this.isInvalidQuantity = true;
      this.toastr.error("invalid", "cant enter a than quantiy");
      // this.editedQuantity = previousValue;
      this.isDisabledByWrongQuantity = true;
      return previousValue;
    }
    else{
      this.isInvalidQuantity = false;
      this.saveEdit(dataList._id, currentValue)
      // this.editedQuantity = previousValue;
      this.isDisabledByWrongQuantity = false;
      return currentValue;
    }
  }
  saveEdit(id, editedValue) {
    
    const url = `${environment.serverUrl}/boq/api/edit/quantity`
    this.httpService.post_auth(url, { id: id, editQuantity: editedValue }).subscribe((data) => {
      console.log(data,"sdfsdfsdfds")
      if (!data['error'] && typeof data['error'] !== undefined) {
        this.toastr.success('Hello world!', 'Toastr fun!');
      } else {
        this.toastr.error('Hello world!', 'Toastr fun!');
      }
    });
  }
  gotoCreateBoq(){
    this.isActiveCreateBoq = true;
  }
  goback(){
    this.isActiveCreateBoq = false;
  }

}
