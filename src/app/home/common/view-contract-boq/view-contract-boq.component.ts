import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/common/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-contract-boq',
  templateUrl: './view-contract-boq.component.html',
  styleUrls: ['./view-contract-boq.component.css']
})
export class ViewContractBoqComponent implements OnInit {
  erpTotalPrice: number;
  totalEditedQuntity: number;
  totalQuntity: number;


  singleContractBoq;
  sheetData: any[] = [];
  clickedNumber: number;
  editedRowNumber: number;
  isReadOnly: boolean = true;
  count: number;
  cartItemList: any[] = [];
  isInvalidQuantity: boolean = false;
  isActiveCreateBoq: boolean = false;
  admin: boolean = false;



  constructor(private data: DataService,
    private toastr: ToastrService) { }

  ngOnInit() {

    this.totalValues()

    this.data.currentSingleContractBoq.subscribe(singleContractBoq => {
      this.singleContractBoq = singleContractBoq
      /* get intial datasheet to the table */
      this.sheetData = this.singleContractBoq.contractBoqFileData[0]['dataList'];
      this.clickedNumber = 0;

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
    // get total values
    var erpTotalPrice = 0;
    let totalEditedQuntity = 0;
    let totalQuntity = 0;
    for (var i = 0; i < this.sheetData.length; i++) {
      totalEditedQuntity = totalEditedQuntity + parseInt(this.sheetData[i]['data']['editedQuantity']);
      totalQuntity = totalQuntity + parseInt(this.sheetData[i]['data']['quantity']);
    }
    this.totalEditedQuntity = totalEditedQuntity;
    this.totalQuntity = totalQuntity;

    for (var x = 0; x < this.sheetData.length; x++) {
      erpTotalPrice = erpTotalPrice + parseInt(this.sheetData[x]['data']['quantity']) * parseInt(this.sheetData[x]['data']['erpUnitPrice']);
    }
    this.erpTotalPrice = erpTotalPrice;
    console.log(erpTotalPrice, "erpTotalPrice");

  }

  editedContractBoq(contractBoq) {
    this.data.changesingleContractBoq(contractBoq)
  }

  setSheetDataToView(sheetdata, clickedItemIndex: number) {
    this.sheetData = sheetdata;
    this.clickedNumber = clickedItemIndex;
    console.log(this.sheetData, "sheetdata");

  }
  edit(rowNumber: number) {
    this.editedRowNumber = rowNumber;
    this.isReadOnly = !this.isReadOnly;
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
      this.cartItemList = this.cartItemList.filter(function (obj) {
        return obj['_id'] !== dataList['_id'];
      });
      this.data.removeCartItemList(this.cartItemList)
    }
  }
  quantityChecker(previousValue, currentValue): number {
    if (currentValue > previousValue) {
      this.isInvalidQuantity = true;
      this.toastr.error("invalid", "cant enter a than quantiy");
      return previousValue;
    }
    else {
      this.isInvalidQuantity = false;
      return currentValue;
    }
  }
  gotoCreateBoq() {
    this.isActiveCreateBoq = true;
  }
  goback() {
    this.isActiveCreateBoq = false;
  }

  totalValues() {
    // let erpTotalPrice = 0;
    // let totalEditedQuntity = 0;
    // let totalQuntity = 0;
    // for (var i = 0; i < this.sheetData.length; i++) {
    //   erpTotalPrice = erpTotalPrice + parseInt(this.sheetData[i]['data']['erpTotalPrice']);
    //   totalEditedQuntity = totalEditedQuntity + parseInt(this.sheetData[i]['data']['editedQuantity']);
    //   totalQuntity = totalQuntity + parseInt(this.sheetData[i]['data']['quantity']);
    // }
    // this.erpTotalPrice1 = erpTotalPrice;
    // this.totalEditedQuntity1 = totalEditedQuntity;
    // this.totalQuntity1 = totalQuntity;
    // console.log(erpTotalPrice, "erpTotalPrice");
    // console.log(totalEditedQuntity, "totalEditedQuntity");
    // console.log(totalQuntity, "totalQuntity");
  }

}
