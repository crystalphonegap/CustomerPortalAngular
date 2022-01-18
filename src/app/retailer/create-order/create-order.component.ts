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
import { RetailOrderService } from 'src/app/shared/RetailOrderService';
import { constStorage } from 'src/app/models/Storege';
import { UserConstant } from 'src/app/models/Userconstant';
@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class RetailerCreateOrderComponent implements OnInit {
  HeaderData: any;
  ShipTo;
  name: string;
  DeliveryAddress;
  Pono;
  CustomerData: any;
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
  AllItemMasterDate : any=[];
  Uomnvtxt ;
  campaignOne: FormGroup;
  RateOfConversion;
  Weight;
  ItemCode;
  OrderInfo;
  Userid;
  Addressvtxt
  constructor(private _CustomerService: CustomerService, private _ItemMasterService: ItemMasterService,
    private _RetailOrderService: RetailOrderService, private alertService: AlertService,public datepipe: DatePipe,
    private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  ShiptoAddresss: any;
  ngOnInit() {
    this.Userid = localStorage.getItem(constStorage.UserCode);
    
    let UserCode;
    let UserTypetxt=  localStorage.getItem(constStorage.UserType);
    if(UserTypetxt==UserConstant.Customer){
      UserCode= this.Userid;
    }else{
      UserCode=localStorage.getItem(constStorage.CustCode);
    }
    this.getAllItemMasterData();
    this.getUOM();
  }



  getUOM() {
      this._CustomerService.getUOM().subscribe((res: any) => {
        this.UOMs = res;
      })
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
    if(ID!='0'){
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
  
    }
    
  };

  getAllItemMasterData() {
    this._ItemMasterService.getAllItemMasterData().subscribe(
      data => {
        this.AllItemMasterDate = data;
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


  onSubmit(type) {
    if(this.TotalQuantity!=0&&this.TotalQuantity!=null&&this.TotalQuantity!=''){
this.status = 1;
   
      this.UpdateHeaderData(type);
     this.InsertOrderDetails();
    }else{
      this.alertService.warn("Please fill the mandatory fields..");
    }
    
  }


  InsertOrderDetails() {
   
    this._RetailOrderService.InsertOrderDetails(this.HeaderData).subscribe(
      (res: any) => {
        this.status =0;
        this.Redirect(this.status);
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

Redirect(status){
  if(status==0){
   
    this.router.navigateByUrl('/Retailer/OrderList');
      this.alertService.success('Order Inserted.');
  }
}


  updatePono(value) {
    this.Pono = value;
  }

  updateAddress(value){
    this.DeliveryAddress=value;
  }

  UpdateHeaderData(type) {
    var PoDate
    if(this.Pono==null||this.Pono==''){
      this.Pono=null;
    }
    if(this.PoDate==null|| this.PoDate==''){
       PoDate=null;
    }else{
      
      PoDate =   this.datepipe.transform(this.PoDate, 'MMM d, y, h:mm:ss a');
     
    }
    if(this.DeliveryAddress==null|| this.DeliveryAddress==''){
      this.DeliveryAddress=null;
   }
    this.HeaderData = {
      OrderNovtxt: this.Pono,
      OrderDatedate: PoDate,
      MaterialCodevtxt: this.ItemCode,
      MaterialDescvtxt: this.ItemCode,
      UOMvtxt: this.Uomnvtxt ,
      Quantitydcl: this.TotalQuantity ,
      TotalOrderQuantityKgsint: this.TotalKgs,
      TotalOrderQuantityMTint: this.TotalMT ,
      DeliveryAddressvtxt: this.DeliveryAddress,
      RetailerCodevtxt:localStorage.getItem(constStorage.UserCode),
      Statusvtxt: type
    }
  }
  Back(){
    this.router.navigateByUrl('/Customer/OrderList');
  }
}
