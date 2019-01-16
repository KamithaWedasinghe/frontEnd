import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  private singleContractBoq = new BehaviorSubject({});
  currentSingleContractBoq = this.singleContractBoq.asObservable();

  private ContractBoqs = new BehaviorSubject([]);
  selectedContractBoqs = this.ContractBoqs.asObservable();

  private cartItemList = new BehaviorSubject([]);
  currentCartItemList = this.cartItemList.asObservable();

  private selectedBoq = new BehaviorSubject({});
  currentSelectedBoq = this.selectedBoq.asObservable();

  private listCount = new BehaviorSubject(0);
  currentListCount = this.listCount.asObservable()

  constructor() { }

  changesingleContractBoq(contractBoq: Object) {
    this.singleContractBoq.next(contractBoq)
  }
  changeContractBoqs(contractBoqs: Object) {
    this.selectedBoq.next(contractBoqs)
  }
  changeCurrentBoq(boq: Object) {
    this.selectedBoq.next(boq)
  }
  addCartItemList(list: Array<object>) {
    this.cartItemList.next(list);
    const count = this.cartItemList.getValue().length;
    this.listCount.next(count)
  }
  removeCartItemList(list: Array<object>) {
    this.cartItemList.next(list)
    const count = this.cartItemList.getValue().length;
    this.listCount.next(count)
  }
}
