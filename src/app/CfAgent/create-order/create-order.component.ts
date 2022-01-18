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
import { DeliveryOrderService } from 'src/app/shared/DeliveryOrderService';
import { OrderService } from 'src/app/shared/OrderService';
import { AlertService } from 'src/app/component/alert.service';
import { DatePipe, formatDate } from '@angular/common';
import { constStorage } from 'src/app/models/Storege';
import { UserConstant } from 'src/app/models/Userconstant';
@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CFAgentCreateOrderComponent implements OnInit {
  constructor(private _CustomerService: CustomerService, private _ItemMasterService: ItemMasterService,
    private _OrderService: OrderService, private alertService: AlertService,public datepipe: DatePipe,
    private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  HeaderData: any;
  ShipTo;
  Lock;
  name: string;
  DeliveryAddress;
  Pono;
  CustomerData: any=[];
  UOMs : any=[];
  PoDate;
  TotalMT;
  TotalKgs;
  OutStanding;
  AvailableCreditLimit;
  CreditLimit;
  AlternativeUnit;
  status;
 TotalQuantity;
  AllItemMasterDate: any=[];
  Uomnvtxt ;
  RateOfConversion;
  Weight;
  ItemCode;
  OrderInfo;
  Userid;
  CustCodevtxt;
  CustNamevtxt;
  Addressvtxt;
  PaymentTerms1vtxt;
  DeliveryTermsvtxt;
  Customers;
  UserCode;
  myValue:string;
  ShiptoAddresss: any=[];
  ngOnInit() {

    let UserTypetxt=  localStorage.getItem(constStorage.UserType);
    if(UserTypetxt==UserConstant.CFAgent){
      this.UserCode= localStorage.getItem(constStorage.UserCode);
    }else{
      this.UserCode=localStorage.getItem(constStorage.UserCFCode);
    }
    this.Lock=false;
    this. getCustomer();
    this.getAllItemMasterData();
    this.getOrderInfo();
    this.getUOM();
    this.ShipTo.Addressvtxt = '';
  }

  ReloadData(){
    window.location.reload();
  }
  getAllCreditLimit(CustCode) {
    this._CustomerService.getAllOutStandingforDashboard(CustCode).subscribe((res: any) => {
  if(res.length!=0){
    this.CreditLimit = res[0].CreditLimitdcl;
    this.AvailableCreditLimit = res[0].AvailableCreditLimitdcl;

  }

    })
  }
  Customerfilerchange (value){
    this.myValue=value;
    this.getCustomer();
  }
  getShipToNameData(Userid) {
    if(this.CustomerData==null||this.CustomerData==''){
      this.alertService.error('Please Select Customer First');
      return;
    }
    if (Userid !== null && Userid !== "") {
      this._CustomerService.GetShipToAddress(Userid).subscribe((res: any) => {
        this.Addressvtxt = res['0'].Addressvtxt;
        this.ShipTo = res['0'];
      })
    }
    else {
      this.router.navigate(['/user/login']);
    }
  }

  getUOM() {
      this._CustomerService.getUOM().subscribe((res: any) => {
        this.UOMs = res;
      })
  }
  getOrderInfo() {
    this._OrderService.getOrderInfo().subscribe(
      data => {
        this.OrderInfo = data['0'];
      }
    );
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

  getAllItemMasterData() {
    this._ItemMasterService.getAllItemMasterData().subscribe(
      data => {
        this.AllItemMasterDate = data;
      }
    );
  }

  getShiptoAddressData(Userid) {

    if (Userid !== null && Userid !== "") {

      this._CustomerService.getGetShipToData(Userid).subscribe(
        data => {
          this.ShiptoAddresss = data;
        }
      );
    }
  }

  getCustomer() {

    this._CustomerService.getAllCustomerDataByUserTypeWiseSearch(this.UserCode,UserConstant.CFAgent,0,0,  this.myValue,true,true).subscribe(
        data => {
          this.Customers = data;
        }
      );

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


  getCustomerData(Userid) {
    if(Userid!=0){
      if (Userid !== null && Userid !== "") {
        this.getShiptoAddressData(Userid);
        this._CustomerService.GetCustomerForCFAgent(Userid).subscribe(
          data => {
            this.CustomerData = data['0'];
            this.CustCodevtxt=data['0'].CustCodevtxt;
            this.CustNamevtxt=data['0'].CustNamevtxt;
            this.DeliveryTermsvtxt=data['0'].DeliveryTermsvtxt;
            this.PaymentTerms1vtxt=data['0'].PaymentTerms1vtxt;
           this.getAllCreditLimit(data['0'].CustCodevtxt);
          }
        );
      }
     this.Lock=true;
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
        this.Redirect(this.status,id);
      },
      err => {
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
    this.router.navigateByUrl('/CfAgent/OrderList');
    this.alertService.success('Order Inserted.');

  }
}


  InsertOrderHeader(OrderHeader) {
    this._OrderService.InsertOrderHeader(OrderHeader).subscribe(
      (res: any) => {
        this.InsertOrderDetails( res);
      },
      err => {
        if (err.status == 400)
          this.alertService.error('Due to some error order not inserted.');
        else
          console.log(err);
      }
    );
  }
  updatePoDate(value) {
    this.PoDate = value;
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
      CreatedByvtxt:localStorage.getItem(constStorage.UserCode),
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
    this.Lock=false;
  }
}
