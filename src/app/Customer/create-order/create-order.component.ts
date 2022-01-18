import { Component, Input, Output, EventEmitter, OnInit, Inject } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule, MatInputModule} from '@angular/material';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { CustomerService } from 'src/app/shared/CustomerService';
import { ItemMasterService } from 'src/app/shared/ItemMasterService';
import { FormControl, FormGroup } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/shared/OrderService';
import { AlertService } from 'src/app/component/alert.service';
import { DatePipe, formatDate } from '@angular/common';
import { CustomerComponent } from '../Customer.component';
@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CustomerCreateOrderComponent implements OnInit {
  HeaderData: any;
  ShipTo;
  name: string;
  DeliveryAddress;
  Pono;
  CustomerData: any;
  UOMs : any;
  PoDate;
  TotalMT;
  TotalKgs;
  OutStanding;
  AvailableCreditLimit;
  CreditLimit;
  AlternativeUnit;
  status;
   TotalQuantity;
  AllItemMasterDate;
  Uomnvtxt ;
  campaignOne: FormGroup;
  RateOfConversion;
  Weight;
  ItemCode;
  OrderInfo;
  Userid;
  Addressvtxt
  constructor(private _CustomerService: CustomerService, private _CustomerComponent:CustomerComponent, private _ItemMasterService: ItemMasterService,
    private _OrderService: OrderService, private alertService: AlertService,public datepipe: DatePipe,
    private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  ShiptoAddresss: any;
  projects = { projectID: 'wxp001', projectName: 'TYC001', dateOfStart: '2018-12-23', teamSize: 'L', inedit: false };
  ngOnInit() {
    this.Userid = localStorage.getItem('UserCode');
    
    let UserCode;
    let UserTypetxt=  localStorage.getItem('UserType');
    if(UserTypetxt=='Customer'){
      UserCode= this.Userid;
    }else{
      UserCode=localStorage.getItem('CustCode');
    }
    this.getAllCreditLimit();
    this.getCustomerData(UserCode);
    this.getShiptoAddressData(UserCode);
    this.getAllItemMasterData();
    this.getOrderInfo();
    this.getUOM();
  }

  getAllCreditLimit() {  
    let UserCode;
    let UserTypetxt=  localStorage.getItem('UserType');
    if(UserTypetxt=='Customer'){
      UserCode= localStorage.getItem('UserCode');
    }else{
      UserCode=localStorage.getItem('CustCode');
    }
  this._CustomerComponent.setLoading(true);
    this._CustomerService.getAllCreditLimitforDashboard(UserCode).subscribe((res: any) => {  
      this.CreditLimit = res;  
      this._CustomerComponent.setLoading(false);
    })  
    this._CustomerComponent.setLoading(true);
     this._CustomerService.getAllAvailableCreditLimitforDashboard(UserCode).subscribe((res: any) => {  
      this.AvailableCreditLimit = res;  
      this._CustomerComponent.setLoading(false);
    })  
  }  
  getShipToNameData(Userid) {
    if (Userid != null && Userid != "" && Userid != "none") {
      this.Addressvtxt = '';
      this._CustomerComponent.setLoading(true);
      this._CustomerService.GetShipToAddress(Userid).subscribe((res: any) => {
        this.Addressvtxt = res['0'].Addressvtxt;
        this.ShipTo = res['0'];
        this._CustomerComponent.setLoading(false);
      })
    }
   
  }

  getUOM() {
    this._CustomerComponent.setLoading(true);
      this._CustomerService.getUOM().subscribe((res: any) => {
        this.UOMs = res;
        this._CustomerComponent.setLoading(false);
      })
  }
  getOrderInfo() {
    this._CustomerComponent.setLoading(true);
    this._OrderService.getOrderInfo().subscribe(
      data => {
        this.OrderInfo = data['0'];
        this._CustomerComponent.setLoading(false);
        // this.PoDate = this.datepipe.transform(data['0'].OrderDatedate, 'dd/MM/yyyy');
      }
    );
  }

  
  updateTotal(QTY) {
    if(this.RateOfConversion==null ||this.RateOfConversion==''){
      this.alertService.error('Please Select Unit Of Measurement First');
      return null;
    }
    this._CustomerComponent.setLoading(true);
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
    this._CustomerComponent.setLoading(false);
  };

  
  updateUOM(ID) {
    if(ID!="0"){
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
  
    }
   
  };

  getAllItemMasterData() {
    this._CustomerComponent.setLoading(true);
    this._ItemMasterService.getAllItemMasterData().subscribe(
      data => {
        this.AllItemMasterDate = data;
        this._CustomerComponent.setLoading(false);
      }
    );
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


  getCustomerData(Userid) {
    if (Userid !== null && Userid !== "") {
      this._CustomerComponent.setLoading(true);
      this._CustomerService.getCustomerData(Userid).subscribe(
        data => {
          this.CustomerData = data['0'];
          this._CustomerComponent.setLoading(false);
        }
      );
    }
    else {
      this.router.navigate(['/user/login']);
    }
  }

  onSubmit(type) {
    if(this.ShiptoAddresss!=''&&this.ShiptoAddresss!=null&&this.TotalQuantity!=0&&this.TotalQuantity!=null&&this.TotalQuantity!=''){
this.status = 1;
      this.getOrderInfo();
      this.UpdateHeaderData(type);
      this.InsertOrderHeader(this.HeaderData);
     
    }else{
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

Redirect(status,value){
  if(status==0){
    this.storage.set('OrderId', value);
    this.router.navigateByUrl('/Customer/OrderList');
      this.alertService.success('Order Inserted.');
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
  updatePono(value) {
    this.Pono = value;
  }

  updateAddress(value) {
    this.DeliveryAddress = value;
  }
  UpdateHeaderData(type) {
    var PoDate
    if(this.Pono==null||this.Pono==''){
      this.Pono=null;
    }
    if(this.PoDate==null|| this.PoDate==''){
       PoDate=null;
  }else{
      
      // PoDate =   this.datepipe.transform(this.PoDate, 'MMM d, y, h:mm:ss a');
      // PoDate = new Date();
      // PoDate = new Date(this.PoDate.getDate());
      PoDate = this.datepipe.transform(this.PoDate._d, 'dd-MM-yyyy');
    }
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
    
    let UserCode;
    let UserTypetxt=  localStorage.getItem('UserType');
    if(UserTypetxt=='Customer'){
      UserCode= localStorage.getItem('UserCode');
    }else{
      UserCode=localStorage.getItem('CustCode');
    }
    this.HeaderData = {
      OrderNovtxt: this.OrderInfo.ReqOrderNo,
      OrderDatedate: this.OrderInfo.OrderDatedate,
      RefNovtxt: this.Pono,
      RefDatedate: PoDate,
      CustomerCodevtxt: this.CustomerData.CustCodevtxt,
      CustomerNamevtxt: this.CustomerData.CustNamevtxt,
      Divisionvtxt: this.CustomerData.DivisionCdvtxt,
      ShipToCodevtxt: this.ShipTo.ShipToCodevtxt,
      ShipToNamevtxt: this.ShipTo.ShipToNamevtxt,
      ShipToAddressvtxt: this.ShipTo.Addressvtxt,
      DeliveryAddressvtxt: this.DeliveryAddress,
      TotalOrderQuantityint: this.TotalQuantity,
      TotalOrderQuantityKgsint: this.TotalKgs,
      TotalOrderQuantityMTint : this.TotalMT,
      DeliveryTermsvtxt:DeliveryTerms,
      PaymentTermsvtxt:PaymentTerms,
      Statusvtxt: type,
      CreatedByvtxt:UserCode,
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
  Back(){
    this.router.navigateByUrl('/Customer/OrderList');
  }
}
