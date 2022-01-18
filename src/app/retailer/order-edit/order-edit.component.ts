import { Component, Input, Output, EventEmitter, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { CustomerService } from 'src/app/shared/CustomerService';

import { NgModule } from '@angular/core';
import { ItemMasterService } from 'src/app/shared/ItemMasterService';
import { FormControl, FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';

import { DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { AlertService } from 'src/app/component/alert.service';
import { RetailOrderService } from 'src/app/shared/RetailOrderService';
import { constStorage } from 'src/app/models/Storege';
@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class RetailerOrderEditComponent implements OnInit {

  HeaderData: any;
  name: string;
  ItemMaster:any=[];
  SelectedValue = 'dfsdf';
  Pono;
  ItemCode
  PoDate;
  UOMs: any=[];
  TotalKgs;
  TotalMT;
  Addresstxt;
  ItemCodeforadd;
  Uomnvtxt;
  AllItemMasterDate:any=[];
  Weight
  picker1;
   TotalQuantity;
  RateOfConversion
  AllItemMasterData;
  OrderInfo: any=[];
  OtherData;
  status;
  OrderID;
  Userid;
  ShipToAddress;
  i;
  constructor( public datepipe: DatePipe,private _CustomerService: CustomerService, private _ItemMasterService: ItemMasterService,
    private _RetailOrderService: RetailOrderService, private alertService: AlertService,
    private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  ngOnInit() {
    this.Userid = localStorage.getItem(constStorage.UserCode);
    this.getUOM();
    
    let UserCode;
      UserCode= this.Userid;
    this.OrderID = this.storage.get('OrderId');
    this.getAllItemMasterData();
    this.GetOrderHeaderByOrderID(this.OrderID);
  }
  toppings = new FormControl();
  myVar:string ='Extra cheese';

  onChange(val){
    this.myVar =val
    console.log(val);
  }

  getAllItemMasterData() {
    this._ItemMasterService.getAllItemMasterData().subscribe(
      data => {
        this.AllItemMasterDate = data;
      }
    );
  }
  
  GetOrderHeaderByOrderID(OrderNo) {
    this._RetailOrderService.GetOrderDetailsByOrderID(OrderNo).subscribe(
      data => {
        this.OrderInfo = data[0];
        this.UpdateOtherFromData(this.OrderInfo);

      }
    );
  }



  updateTotal(QTY) {
    if( this.Uomnvtxt==null || this.Uomnvtxt==''){
      this.alertService.error('Please Select Unit Of Measurement First');
      return null;
    }
    let tempqtyKg = 0;
    let tempqtyMt = 0;
    let tempQuantity = 0;
    if( QTY>0){
      this.TotalQuantity = ( parseFloat(QTY)).toFixed(2);
      this.TotalKgs=( parseFloat(this.TotalQuantity) *  parseFloat(this.Weight)).toFixed(2);
      this.TotalMT= (parseFloat(this.TotalQuantity )* parseFloat(this.RateOfConversion)).toFixed(2);
    }else{
      this.TotalMT =0;
      this.TotalQuantity = 0;
      this.TotalKgs =0;
    }  
  };


  updateUOM(ID) {
    this._CustomerService.getUOMById(ID).subscribe(
      data => {
        this.Uomnvtxt =  data[0].AlternativeUnit;
        this.RateOfConversion= data[0].RateOfConversion;
        this.Weight= data[0].Weight;
        if(this.TotalQuantity==null){
          this.TotalQuantity=0
        }
        this.updateTotal(this.TotalQuantity);
      }
    );

  };



  ChangeItemCodeForNewItem(ItemCode) {
    this.ItemCodeforadd = ItemCode;
  }

  getUOM() {
    this._CustomerService.getUOM().subscribe((res: any) => {
      this.UOMs = res;
    })
  }


  UpdateOtherFromData(Data) {
    let date =this.datepipe.transform( Data.OrderDatedate, 'yyyy-dd-MM');
     this.PoDate=date;
      this.Addresstxt=Data.DeliveryAddressvtxt;
      this.picker1=date;
    this.Pono = Data.OrderNovtxt;
    this.TotalQuantity =  (parseFloat(Data.Quantitydcl)).toFixed(2); 
    this.TotalKgs =(parseFloat(Data.TotalOrderQuantityKgsint)).toFixed(2); 
    this.TotalMT= (parseFloat(Data.TotalOrderQuantityMTint)).toFixed(2); 
    this.Uomnvtxt=  Data.UOMvtxt;
    this.ItemCode=  Data.MaterialCodevtxt;
    this.updateUOM(Data.UoMint);
  }


  AddDataInItemMaster(ItemCode) {
    if(ItemCode!='undefined'&& ItemCode!=0 && ItemCode!=''&& ItemCode!=null){
        this._ItemMasterService.getItemMasterDataByKeyword(ItemCode).subscribe(
          data => {
            this.ItemCode=data['0'].ItemCodevtxt;
          }
        );
    }
  }


  onDeleteClick(i) {
    
    if (i !== -1) {
      this.ItemMaster.splice(i, 1);
    }
    this.updateTotal(this.ItemMaster);
  }

  onSubmit(type) {
    if (this.TotalQuantity != 0 && this.TotalQuantity != null && this.TotalQuantity != '') {
      this.UpdateHeaderData(type);
      this.i=0;
      this.UpdateOrderHeader(this.HeaderData);
    } else {
      this.alertService.warn("Please fill the mandatory fields..");
    }

  }

  Redirect() {
      this.router.navigateByUrl('/Retailer/OrderList');
        this.alertService.success('Order Updated.');
  }

  UpdateOrderHeader(OrderHeader) {
    this._RetailOrderService.UpdateOrderHeader(OrderHeader).subscribe(
      (res: any) => {
        this.Redirect()
      },
      err => {
        if (err.status == 400)
          this.alertService.error('Error Data not updated.');
        else
          console.log(err);
      }
    );
  }
  updateAddress(value) {
    this.Addresstxt = value;
  }
  updatePono(value) {
    this.Pono = value;
  }
  
  updatePoDate(value){
    this.PoDate=value;
  }
  UpdateHeaderData(type) {
    
    if(this.Pono==null||this.Pono==''){
      this.Pono=null;
    }
    if(this.PoDate==null||this.PoDate==''){
      this.PoDate=null;
    }else
    {
      this.PoDate=this.datepipe.transform( this.PoDate, 'MM-dd-yyyy');
    }

    if(this.Addresstxt==null||this.Addresstxt==''){
      this.Addresstxt=null;
    }
    this.HeaderData = {
      IDbint:this.OrderInfo.IDbint,
      OrderNovtxt: this.Pono,
      OrderDatedate:  this.PoDate,
      MaterialCodevtxt: this.ItemCode,
      MaterialDescvtxt: this.ItemCode,
      UOMvtxt: this.Uomnvtxt ,
      Quantitydcl: this.TotalQuantity ,
      TotalOrderQuantityKgsint: this.TotalKgs,
      TotalOrderQuantityMTint: this.TotalMT ,
      DeliveryAddressvtxt:  this.Addresstxt,
      RetailerCodevtxt:localStorage.getItem(constStorage.UserCode),
      Statusvtxt: type,
      CreatedBytxt:localStorage.getItem(constStorage.UserCode)
    }
  }
  Back() {
    this.router.navigateByUrl('/Retailer/OrderList');
  }

}
