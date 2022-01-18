import { Component, Input, Output, EventEmitter, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { CustomerService } from 'src/app/shared/CustomerService';

import { NgModule } from '@angular/core';
import { ItemMasterService } from 'src/app/shared/ItemMasterService';
import { CustomerFloatDataComponent } from '../customer-float-data/customer-float-data.component';
import { FormControl, FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { DeliveryOrderService } from 'src/app/shared/DeliveryOrderService';

import { DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { AlertService } from 'src/app/component/alert.service';
import { RetailOrderService } from 'src/app/shared/RetailOrderService';
import { OrderService } from 'src/app/shared/OrderService';
import { CustomerComponent } from '../Customer.component';

@Component({
  selector: 'app-retail-order-edit',
  templateUrl: './retail-order-edit.component.html',
  styleUrls: ['./retail-order-edit.component.css']
})
export class CustomerRetailOrderEditComponent implements OnInit {
  HeaderData;
  Date: any;
  name: string;
  ItemMaster:any;
  othercharges;
  SelectedValue = 'dfsdf';
  private TotalAmount;
  ItemCode
  PoDate;
  UOMs: any;
  TotalKgs;
  TotalMT;
  CustomerData: any;
  ItemCodeforadd;
  Uomnvtxt;
  CreditLimit;
  DeliveryAddress;
  AllItemMasterDate;
  Weight
 TotalQuantity;
  RateOfConversion;
  AvailableCreditLimit;
  AllItemMasterData;
  OrderInfo: any;
  OtherData;
  status;
  OrderID;
  Userid;
  Webinfo;
  constructor(
    private _CustomerComponent:CustomerComponent, private _OrderService: OrderService, public datepipe: DatePipe,private _CustomerService: CustomerService, private _ItemMasterService: ItemMasterService,
    private _RetailOrderService :RetailOrderService, private alertService: AlertService,
    private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  
  
  ngOnInit() {
    this.Userid = localStorage.getItem('UserCode');
    this.getUOM();
    this.getWebOrderInfo();
    this.getAllCreditLimit();
    let UserCode;
    let UserTypetxt=  localStorage.getItem('UserType');
    if(UserTypetxt=='Customer'){
      UserCode= this.Userid;
    }else{
      UserCode=localStorage.getItem('CustCode');
    }
    this.getCustomerData(UserCode);
    this.OrderID = this.storage.get('OrderId');
    this.getAllOrderDataByOrderNo(this.OrderID);
    this.getAllItemMasterData();
  }
  toppings = new FormControl();
  myVar:string ='Extra cheese';

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  onChange(val){
    this.myVar =val
    console.log(val);
  }

  
  updateAddress(value) {
    this.DeliveryAddress = value;
  }

  getAllCreditLimit() {  
    this._CustomerComponent.setLoading(true);
    let UserCode;
    let UserTypetxt=  localStorage.getItem('UserType');
    if(UserTypetxt=='Customer'){
      UserCode= localStorage.getItem('UserCode');
    }else{
      UserCode=localStorage.getItem('CustCode');
    }
    this._CustomerService.getAllCreditLimitforDashboard(UserCode).subscribe((res: any) => {  
      this.CreditLimit = res;  
      this._CustomerComponent.setLoading(false);
    },
    err => { 
      this._CustomerComponent.setLoading(false);
        console.log(err);
    })  
     this._CustomerService.getAllAvailableCreditLimitforDashboard(UserCode).subscribe((res: any) => {  
      this.AvailableCreditLimit = res;  
      this._CustomerComponent.setLoading(false);
    },
    err => { 
      this._CustomerComponent.setLoading(false);
        console.log(err);
    })  
  }  
  getAllItemMasterData() {
    this._CustomerComponent.setLoading(true);
    this._ItemMasterService.getAllItemMasterData().subscribe(
      data => {
        this.AllItemMasterDate = data;
        this._CustomerComponent.setLoading(false);
      },
      err => { 
        this._CustomerComponent.setLoading(false);
          console.log(err);
      }
    );
  }
  
  getAllOrderDataByOrderNo(OrderNo) {
    this._CustomerComponent.setLoading(true);
    this._RetailOrderService.GetOrderDetailsByOrderID(OrderNo).subscribe((data: any) => {
      this.OrderInfo = data['0'];
    this.Uomnvtxt=  data['0'].UOMvtxt;
    this.ItemCode=  data['0'].MaterialCodevtxt;
    this.TotalQuantity=  data['0'].Quantitydcl.toFixed(2);
    this.TotalMT=  data['0'].TotalOrderQuantityMTint.toFixed(2);
    this.TotalKgs=  data['0'].TotalOrderQuantityKgsint.toFixed(2);
    this.DeliveryAddress= this.OrderInfo.DeliveryAddressvtxt;
    this._CustomerComponent.setLoading(false);
    this.updateUOM( this.OrderInfo.UoMint);
    },
    err => { 
      this._CustomerComponent.setLoading(false);
        console.log(err);
    });
  }

  updateTotal(QTY) {
    if(this.RateOfConversion==null ||this.RateOfConversion==''){
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
    },
    err => { 
      this._CustomerComponent.setLoading(false);
        console.log(err);
    })
  }


  UpdateOtherFromData(Data) {
    this.TotalAmount = Data.TotalNetValuedcl;
    this.TotalQuantity =  (parseFloat(Data.TotalOrderQuantityint)).toFixed(2); 
    this.TotalKgs =(parseFloat(Data.TotalOrderQuantityKgsint)).toFixed(2); 
    this.TotalMT= (parseFloat(Data.TotalOrderQuantityMTint)).toFixed(2); 
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
  save(){
    if ( this.TotalQuantity != 0 && this.TotalQuantity != null && this.TotalQuantity != '') {
      this.UpdateDate('save');
      this.UpdateRetailOrder('save');
    } else {
      this.alertService.warn("Please fill the mandatory fields..");
    }
  }

  onSubmit() {
    if ( this.TotalQuantity != 0 && this.TotalQuantity != null && this.TotalQuantity != '') {
      this.UpdateDate('Insert');
      this.getWebOrderInfo();
      this.UpdateRetailOrder('Insert');
    } else {
      this.alertService.warn("Please fill the mandatory fields..");
    }

  }

  InsertOrderHeader(OrderHeader) {
    this._CustomerComponent.setLoading(true);
    this._OrderService.InsertOrderHeader(OrderHeader).subscribe(
      (res: any) => {
        this.InsertOrderDetails( res);
      },
      err => { 
        this._CustomerComponent.setLoading(false);
        if (err.status == 400)
          this.alertService.error('Due to some error order not inserted.');
        else
          console.log(err);
      }
    );
  }
  getWebOrderInfo() {
    this._CustomerComponent.setLoading(true);
    this._OrderService.getOrderInfo().subscribe(
      data => {
        this.Webinfo = data['0'];
        this._CustomerComponent.setLoading(false);
        // this.PoDate = this.datepipe.transform(data['0'].OrderDatedate, 'dd/MM/yyyy');
      }
    );
  }


  Redirect(status,value) {
    if(status==0){
      this._CustomerComponent.setLoading(false);
      this.storage.set('OrderId', value);
      this.router.navigateByUrl('/Customer/OrderView');
      this.alertService.success('Order Updated.');
     
    }
  }

  UpdateRetailOrder(type) {
    this._CustomerComponent.setLoading(true);
    this._RetailOrderService.UpdateRetailOrder(this.Date).subscribe(
      (res: any) => {
        this._CustomerComponent.setLoading(false);
        if(type=='save'){
          this.router.navigateByUrl('/Customer/RetailOrderDetail');
          this.alertService.success('Order Updated.');
        }else if(type=='Insert'){
          this.InsertOrderHeader(this.HeaderData);
        }
      },
      err => {
        this._CustomerComponent.setLoading(false);
        if (err.status == 400)
          this.alertService.error('Error Data not updated.');
        else
          console.log(err);
      }
    );
  }
 
  getCustomerData(Userid) {
    if (Userid !== null && Userid !== "") {
      this._CustomerComponent.setLoading(true);
      this._CustomerService.getCustomerData(Userid).subscribe(
        data => {
          this.CustomerData = data['0'];
          this._CustomerComponent.setLoading(false);
        },
        err => { 
          this._CustomerComponent.setLoading(false);
            console.log(err);
        }
      );
    }
    else {
      this.router.navigate(['/user/login']);
    }
  }

  InsertOrderDetails(id) {
    this._CustomerComponent.setLoading(true);
    let orderdetail = {
      OrderID: id,
      MaterialCodevtxt:this.ItemCode,
      MaterialDescriptionvtxt: this.ItemCode,
      UoMvtxt: this.Uomnvtxt,
      Quantityint: this.TotalQuantity,
      Ratedcl: 0.00,
    }
    this._OrderService.InsertOrderDetails(orderdetail).subscribe(
      (res: any) => {
        this.status =0;
        this._CustomerComponent.setLoading(false);
        this.Redirect(this.status,id);
      },
      err => {
        this._CustomerComponent.setLoading(false);
        if (err.status == 400)
          this.alertService.error('Error Order not Inserted.');
        else
          console.log(err);;
          this.status=1;
          return
      }
    );
  }

  UpdateDate(type) {
    let PaymentTerms ;
    let DeliveryTerms ;
    if( this.CustomerData.PaymentTerms1vtxt==null ||  this.CustomerData.PaymentTerms1vtxt==''){
      PaymentTerms=null;
    }
    else{
      PaymentTerms= this.CustomerData.PaymentTerms1vtxt;
    }
    if( this.CustomerData.DeliveryTermsvtxt==null||  this.CustomerData.DeliveryTermsvtxt==''){
      DeliveryTerms= null;
    }
    else{
      DeliveryTerms=this.CustomerData.DeliveryTermsvtxt;
    }
   
    if( this.DeliveryAddress==null|| this.DeliveryAddress==''){
      this.DeliveryAddress=null;
    }
    let status;
    if(type=='save'){
      status='Retailer Pending';
  }else if(type=='Insert'){
    status='Pending';
}
    
    this.Date = {
      IDbint : this.OrderInfo.IDbint,
      OrderNovtxt : this.OrderInfo.OrderNovtxt,
      OrderDatedate : this.OrderInfo.OrderDatedate,
      DealerCodevtxt :  this.OrderInfo.DealerCodevtxt,
      DealerNamevtxt :   this.OrderInfo.DealerNamevtxt,
      MaterialCodevtxt : this.ItemCode,
      MaterialDescvtxt : this.ItemCode,
      Quantitydcl :  this.TotalQuantity,
      UOMvtxt :   this.Uomnvtxt,
      TotalOrderQuantityKgsint:this.TotalKgs,
      TotalOrderQuantityMTint   :this.TotalMT,
      DeliveryAddressvtxt:this.DeliveryAddress,
      RetailerCodevtxt:  this.OrderInfo.RetailerCodevtxt,
      Statusvtxt:status,
      RetailerNamevtxt :  this.OrderInfo.RetailerNamevtxt,
      CreatedBytxt : localStorage.getItem('UserCode'),
    }
    let HeaderDate=this.datepipe.transform(this.OrderInfo.OrderDatedate, 'dd-MM-yyyy');
    this.HeaderData = {
      OrderNovtxt: this.Webinfo.ReqOrderNo,
      OrderDatedate: this.Webinfo.OrderDatedate ,
      RefNovtxt: this.OrderInfo.OrderNovtxt,
      RefDatedate: HeaderDate,
      CustomerCodevtxt:  this.OrderInfo.DealerCodevtxt,
      CustomerNamevtxt:  this.OrderInfo.DealerNamevtxt,
      Divisionvtxt: this.CustomerData.DivisionCdvtxt,
      ShipToCodevtxt: this.OrderInfo.RetailerCodevtxt,
      ShipToNamevtxt: this.OrderInfo.RetailerNamevtxt,
      ShipToAddressvtxt: this.OrderInfo.ShipToAddressvtxt,
      DeliveryAddressvtxt: this.DeliveryAddress,
      TotalOrderQuantityint: this.TotalQuantity,
      TotalOrderQuantityKgsint: this.TotalKgs,
      TotalOrderQuantityMTint : this.TotalMT,
      DeliveryTermsvtxt:DeliveryTerms,
      PaymentTermsvtxt:PaymentTerms,
      Statusvtxt: 'Pending',
      CreatedByvtxt: localStorage.getItem('UserCode'),
      SAPOrderNovtxt :0,
      SAPOrderDatedate :'01/01/1000',
      TotalNetValuedcl :'0.00',
      SAPStatusvtxt :null,
      OtherCharges1dcl :'0.00',
      OtherCharges2dcl :'0.00',
      OtherCharges3dcl :'0.00',
      OtherCharges4dcl :'0.00',
    }
  }
  Back() {
    this.router.navigateByUrl('/Customer/RetailOrderDetail');
  }

  
}
