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
import { OrderService } from 'src/app/shared/OrderService';
import { AlertService } from 'src/app/component/alert.service';
import { CustomerComponent } from '../Customer.component';
@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class CustomerOrderEditComponent implements OnInit {

  constructor( public datepipe: DatePipe,private _CustomerComponent:CustomerComponent, private _CustomerService: CustomerService, private _ItemMasterService: ItemMasterService,
    private _OrderService: OrderService, private alertService: AlertService,
    private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  
  HeaderData: any;
  name: string;
  ItemMaster:any;
  othercharges;
  SelectedValue = 'dfsdf';
  private TotalAmount;
  Pono;
  ShipToName;
  ItemCode
  CreditLimit;
  PoDate;
  UOMs: any;
  AvailableCreditLimit;
  TotalKgs;
  TotalMT;
  CustomerData: any;
  UoMint;
  ShipToCode;
  ItemCodeforadd;
  Uomnvtxt;
  AllItemMasterDate;
  Weight
   TotalQuantity;
  RateOfConversion
  AllItemMasterData;
  OrderInfo: any;
  status;
  OrderID;
  Userid;
  ShipToAddress;
  i;
  ShiptoAddresss: any;
  projects = { projectID: 'wxp001', projectName: 'TYC001', dateOfStart: '2018-12-23', teamSize: 'L', inedit: false };
  ngOnInit() {
    this.Userid = localStorage.getItem('UserCode');
    this.getUOM();
    
    let UserCode;
    let UserTypetxt=  localStorage.getItem('UserType');
    if(UserTypetxt=='Customer'){
      UserCode= this.Userid;
    }else{
      UserCode=localStorage.getItem('CustCode');
    }
    this.OrderID = this.storage.get('OrderId');
    this.getShiptoAddressData(UserCode);
    this.getAllOrderDataByOrderNo(this.OrderID);
    this.getAllItemMasterData();
    this.GetOrderHeaderByOrderID(this.OrderID);
   this.getAllCreditLimit();
  }
  toppings = new FormControl();
  myVar:string ='Extra cheese';

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  onChange(val){
    this.myVar =val
    console.log(val);
  }

  getAllItemMasterData() {
    this._CustomerComponent.setLoading(true);
    this._ItemMasterService.getAllItemMasterData().subscribe(
      data => {
        this.AllItemMasterDate = data;
        this._CustomerComponent.setLoading(false);
      }
    );
  }
  
  getAllOrderDataByOrderNo(OrderNo) {
    this._CustomerComponent.setLoading(true);
    this._OrderService.GetOrderDetailsByOrderID(OrderNo).subscribe((data: any) => {
      this.ItemMaster = data['0'];
      this.Uomnvtxt= data['0'].UoMvtxt;
    this.UoMint=  data['0'].UoMint;
    this.ItemCode=  data['0'].MaterialCodevtxt;
    this._CustomerComponent.setLoading(false);
    this.updateUOM(this.UoMint)
    });
  }

  GetOrderHeaderByOrderID(OrderNo) {
    this._CustomerComponent.setLoading(true);
    this._OrderService.GetOrderHeaderByOrderID(OrderNo).subscribe(
      data => {
        this.OrderInfo = data[0];
        this._CustomerComponent.setLoading(false);
        this.UpdateOtherFromData(this.OrderInfo);

      }
    );
  }


  getShipToNameData(Userid) {
    if (Userid !== null && Userid !== "") {
      this._CustomerComponent.setLoading(true);
      this._CustomerService.GetShipToAddress(Userid).subscribe((res: any) => {
        this.ShipToAddress = res['0'].Addressvtxt;
        this.ShipToName = res['0'].ShipToNamevtxt;
        this.ShipToCode = res['0'].ShipToCodevtxt;
        this._CustomerComponent.setLoading(false);
      })
    }
   
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
    this._CustomerComponent.setLoading(true);
    this._CustomerService.getUOMById(ID).subscribe(
      data => {
        this.Uomnvtxt =  data[0].AlternativeUnit;
        this.RateOfConversion= data[0].RateOfConversion;
        this.Weight= data[0].Weight;
        if(this.TotalQuantity==null){
          this.TotalQuantity=0
        }
        this._CustomerComponent.setLoading(false);
        this.updateTotal(this.TotalQuantity);
      }
    );

  };



  ChangeItemCodeForNewItem(ItemCode) {
    this.ItemCodeforadd = ItemCode;
  }

  getUOM() {
    this._CustomerComponent.setLoading(true);
    this._CustomerService.getUOM().subscribe((res: any) => {
      this.UOMs = res;
      this._CustomerComponent.setLoading(false);
    })
  }


  UpdateOtherFromData(Data) {
    this.PoDate =this.datepipe.transform(Data.RefDatedate, 'MM-dd-yyyy') ;
    this.Pono = Data.RefNovtxt;
    this.ShipToAddress = Data.ShipToAddressvtxt;
    this.TotalAmount = Data.TotalNetValuedcl;
    this.TotalQuantity =  (parseFloat(Data.TotalOrderQuantityint)).toFixed(2); 
    this.TotalKgs =(parseFloat(Data.TotalOrderQuantityKgsint)).toFixed(2); 
    this.TotalMT= (parseFloat(Data.TotalOrderQuantityMTint)).toFixed(2); 
    this.othercharges = Data.OtherCharges1dcl;
    this.ShipToName = Data.ShipToNamevtxt;
    this.ShipToCode = Data.ShipToCodevtxt;
  }


  AddDataInItemMaster(ItemCode) {
    if(ItemCode!='undefined'&& ItemCode!=0 && ItemCode!=''&& ItemCode!=null){
      this._CustomerComponent.setLoading(true);
        this._ItemMasterService.getItemMasterDataByKeyword(ItemCode).subscribe(
          data => {
            this.ItemCode=data['0'].ItemCodevtxt;
            this._CustomerComponent.setLoading(false);
          }
        );
    }
  }


  getShiptoAddressData(Userid) {
    if (Userid !== null && Userid !== "") {

      this._CustomerComponent.setLoading(true);
      this._CustomerService.getGetShipToData(Userid).subscribe(
        data => {
          this.ShiptoAddresss = data;
          this._CustomerComponent.setLoading(false);
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
    if (this.ShiptoAddresss != '' && this.ShiptoAddresss != null && this.TotalQuantity != 0 && this.TotalQuantity != null && this.TotalQuantity != '') {
      this.UpdateHeaderData(type);
      this.i=0;
      this.DeleteDetailData();
      this.UpdateOrderHeader(this.HeaderData);
    } else {
      this.alertService.warn("Please fill the mandatory fields..");
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



  Redirect(status,value) {
    if(status==0){
      this.storage.set('OrderId', value);
      this.router.navigateByUrl('/Customer/OrderView');
     
      if(this.i==0){
        this.alertService.success('Order Updated.');
      }
      this.i++;
    }
  }

  UpdateOrderHeader(OrderHeader) {
    this._CustomerComponent.setLoading(true);
    this._OrderService.UpdateOrderHeader(OrderHeader).subscribe(
      (res: any) => {
        this.InsertOrderDetails( res);
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
  updateAddress(value) {
    this.OrderInfo.DeliveryAddressvtxt = value;
  }
  updatePono(value) {
    this.Pono = value;
  }
  updatePoDate(value) {
    this.PoDate = value;
  }
  updateothercharges(value) {
    this.othercharges = value;
  }

  
  DeleteDetailData() {
    this._CustomerComponent.setLoading(true);
    this._OrderService.DeleteOrderDetails(this.OrderID).subscribe(
      (res: any) => {

        this._CustomerComponent.setLoading(false);
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


  UpdateHeaderData(type) {
    let PaymentTerms ;
    let DeliveryTerms ;
    if(this.OrderInfo.PaymentTermsvtxt==null || this.OrderInfo.PaymentTermsvtxt==''){
      PaymentTerms=null;
    }
    else{
      PaymentTerms=this.OrderInfo.PaymentTermsvtxt;
    }
    if( this.OrderInfo.DeliveryTermsvtxt==null|| this.OrderInfo.DeliveryTermsvtxt==''){
      DeliveryTerms= null;
    }
    else{
      DeliveryTerms=this.OrderInfo.DeliveryTermsvtxt;
    }
    if(this.Pono==null||this.Pono==''){
      this.Pono=null;
    }
    if(this.PoDate==null||this.PoDate==''){
      this.PoDate=null;
    }else
    {
      this.PoDate=this.datepipe.transform( this.PoDate, 'dd-MM-yyyy');
    }

    if(this.OrderInfo.DeliveryAddressvtxt==null||this.OrderInfo.DeliveryAddressvtxt==''){
      this.OrderInfo.DeliveryAddressvtxt=null;
    }

    this.HeaderData = {
     
     
      IDbint : this.OrderID,
      OrderNovtxt : this.OrderInfo.OrderNovtxt,
      OrderDatedate : this.OrderInfo.OrderDatedate,
      RefNovtxt :  this.Pono,
      RefDatedate : this.PoDate,
      CustomerCodevtxt :  this.OrderInfo.CustomerCodevtxt,
      CustomerNamevtxt :this.OrderInfo.CustomerNamevtxt,
      Divisionvtxt :  this.OrderInfo.Divisionvtxt,
      ShipToCodevtxt :this.ShipToCode,
      ShipToNamevtxt :  this.ShipToName,
      ShipToAddressvtxt : this.ShipToAddress,
      DeliveryAddressvtxt : this.OrderInfo.DeliveryAddressvtxt,
      TotalOrderQuantityint :  this.TotalQuantity,
      TotalOrderQuantityKgsint: this.TotalKgs,
      TotalOrderQuantityMTint : this.TotalMT,
      DeliveryTermsvtxt:DeliveryTerms,
      PaymentTermsvtxt:PaymentTerms,
      Statusvtxt : type,
      CreatedByvtxt : localStorage.getItem('UserCode'),

    }
    
  }
  Back() {
    this.router.navigateByUrl('/Customer/OrderList');
  }

  
  getAllCreditLimit() {  
    this._CustomerComponent.setLoading(true);
    this._CustomerService.getAllCreditLimitforDashboard(localStorage.getItem('UserCode')).subscribe((res: any) => {  
      this.CreditLimit = res;  
      this._CustomerComponent.setLoading(false);
    })  
     this._CustomerService.getAllAvailableCreditLimitforDashboard(localStorage.getItem('UserCode')).subscribe((res: any) => {  
      this.AvailableCreditLimit = res;  
      this._CustomerComponent.setLoading(false);
    })  
  }  
}
