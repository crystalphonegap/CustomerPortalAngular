import { Component, Input, Output, EventEmitter, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { CustomerService } from 'src/app/shared/CustomerService';

import { NgModule } from '@angular/core';
import { ItemMasterService } from 'src/app/shared/ItemMasterService';
import { FormControl, FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { DeliveryOrderService } from 'src/app/shared/DeliveryOrderService';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { OrderService } from 'src/app/shared/OrderService';
import { AlertService } from 'src/app/component/alert.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class CFOrderEditComponent implements OnInit {

  HeaderData: any;
  name: string;
  ItemMaster: any=[];
  othercharges;
  SelectedValue = 'dfsdf';
   TotalAmount;
  Pono;
  ShipToName;
  ItemCode
  CreditLimit;
  PoDate;
  UOMs: any=[];
  AvailableCreditLimit;
  TotalKgs;
  TotalMT;
  CustomerData: any;
  ShipToCode;
  ItemCodeforadd;
  Uomnvtxt;
  AllItemMasterDate;
  Weight
   TotalQuantity;
  RateOfConversion
  AllItemMasterData;
  OrderInfo: any=[];
  status;
  OrderID;
  ShipToAddress;
  i;
  constructor(public datepipe: DatePipe,private _CustomerService: CustomerService, private _ItemMasterService: ItemMasterService,
    private _OrderService: OrderService, private alertService: AlertService,
    private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  ShiptoAddresss: any;
  projects = { projectID: 'wxp001', projectName: 'TYC001', dateOfStart: '2018-12-23', teamSize: 'L', inedit: false };
  ngOnInit() {
    this.getUOM();
    this.OrderID = this.storage.get('OrderId');
   
    this.getAllOrderDataByOrderNo(this.OrderID);
    this.getAllItemMasterData();
    this.GetOrderHeaderByOrderID(this.OrderID);
  }
  toppings = new FormControl();
  myVar:string ='Extra cheese';

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
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
  
  getAllOrderDataByOrderNo(OrderNo) {
    this._OrderService.GetOrderDetailsByOrderID(OrderNo).subscribe((data: any) => {
      this.ItemMaster = data['0'];
      
    this.Uomnvtxt=  this.ItemMaster.UoMvtxt;
    this.ItemCode=  data['0'].MaterialCodevtxt;
    this.updateUOM(this.ItemMaster.UoMint)
    });
  }
  
  GetOrderHeaderByOrderID(OrderNo) {
    this._OrderService.GetOrderHeaderByOrderID(OrderNo).subscribe(
      data => {
        this.OrderInfo = data[0];
  this.getAllCreditLimit(data[0].CustomerCodevtxt);
        this.UpdateOtherFromData(this.OrderInfo);
        this.getShiptoAddressData(this.OrderInfo.CustomerCodevtxt);
      }
    );
  }


  getShipToNameData(Userid) {
    if (Userid !== null && Userid !== "") {
      this._CustomerService.GetShipToAddress(Userid).subscribe((res: any) => {
        this.ShipToAddress = res['0'].Addressvtxt;
        this.ShipToName = res['0'].ShipToNamevtxt;
        this.ShipToCode = res['0'].ShipToCodevtxt;
      })
    }
    else {
      this.router.navigate(['/user/login']);
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
    this.Pono = Data.RefNovtxt;
    this.PoDate = Data.RefDatedate;
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
        this._ItemMasterService.getItemMasterDataByKeyword(ItemCode).subscribe(
          data => {
            this.ItemCode=data['0'].ItemCodevtxt;
          }
        );
    }
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


  onDeleteClick(i) {
    if (i !== -1) {
      this.ItemMaster.splice(i, 1);
    }
    this.updateTotal(this.ItemMaster);
  }

  onSubmit(type) {
    if ( this.TotalQuantity != 0 && this.TotalQuantity != null && this.TotalQuantity != '') {
      this.UpdateHeaderData();
      this.i=0;
      this.DeleteDetailData();
      this.UpdateOrderHeader(this.HeaderData,type);
    } else {
      this.alertService.warn("Please fill the mandatory fields..");
    }

  }

  UpdateOrderHeader(OrderHeader,type) {
    this._OrderService.UpdateOrderHeader(OrderHeader).subscribe(
      (res: any) => {
        this.InsertOrderDetails( res,type);
      },
      err => {
        if (err.status == 400)
          this.alertService.error('Error Data not updated.');
        else
          console.log(err);
      }
    );
  }
  InsertOrderDetails(id,type) {
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
        if(type=='Save'){
          this.Redirect(this.status,id);
        }
       else{
         this.PostToSAP();
       }
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



  Redirect(status,value) {
    if(status==0){
      this.storage.set('OrderId', value);
      this.router.navigateByUrl('/CfAgent/PendingOrders');
     
      if(this.i==0){
        this.alertService.success('Order Updated.');
      }
      this.i++;
    }
  }

  
  DeleteDetailData() {
    this._OrderService.DeleteOrderDetails(this.OrderID).subscribe(
      (res: any) => {

      },
      err => {
        if (err.status == 400)
          this.alertService.error('Error Data not updated.');
        else
          console.log(err);
      }
    );
  }


  Back() {
    this.router.navigateByUrl('/CfAgent/PendingOrders');
  }

  
  getAllCreditLimit(CustCode) {  
    this._CustomerService.getAllCreditLimitforDashboard(CustCode).subscribe((res: any) => {  
      this.CreditLimit = res;  
    })  
     this._CustomerService.getAllAvailableCreditLimitforDashboard(CustCode).subscribe((res: any) => {  
      this.AvailableCreditLimit = res;  
    })  
  }  
  
  UpdateHeaderData() {
    this.PoDate=this.datepipe.transform(  this.OrderInfo.RefDatedate, 'dd-MM-yyyy');
    this.HeaderData = {
      IDbint : this.OrderID,
      OrderNovtxt : this.OrderInfo.OrderNovtxt,
      OrderDatedate : this.OrderInfo.OrderDatedate,
      RefNovtxt :  this.OrderInfo.RefNovtxt,
      RefDatedate : this.PoDate ,
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
      DeliveryTermsvtxt:this.OrderInfo.DeliveryTermsvtxt,
      PaymentTermsvtxt:this.OrderInfo.PaymentTermsvtxt,
      Statusvtxt : 'Pending',
      CreatedByvtxt : localStorage.getItem('UserCode'),

    }
  }

  PostToSAP(){
    let RefData=this.datepipe.transform(  this.OrderInfo.RefDatedate, 'dd-MM-yyyy');
    this.HeaderData = {
      IDbint : this.OrderInfo.IDbint,
      Statusvtxt : 'Posted To SAP',
      CreatedByvtxt :  localStorage.getItem('UserCode'),

    }
    this._OrderService.UpdateOrderHeaderStatus(this.HeaderData).subscribe(
      (res: any) => {
        this.router.navigateByUrl('/CfAgent/PendingOrders');
      },
      err => {
        if (err.status == 400)
          this.alertService.error('Error Data not updated.');
        else
          console.log(err);
      }
    );
  }
}
