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
import { constStorage } from 'src/app/models/Storege';
import { List } from 'lodash';
import { RFCCallService } from 'src/app/shared/RFCCallService';
import { SPComponent } from '../SP.component';
import { UserConstant } from 'src/app/models/Userconstant';
@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class SPOrderEditComponent implements OnInit {

  HeaderData: any;
  name: string;
  ItemMaster:any=[];
  othercharges;
   TotalAmount;
  Pono;
  ShipToName;
  ItemCode
  CreditLimit;
  PoDate;
  RfcOrderData;
  UOMs: any=[];
  AvailableCreditLimit;
  TotalKgs;
  TotalMT;
  transport :string;
  PlantData :any=[];
  CustomerData: any;
  ShipToCode;
  ItemCodeforadd;
  Uomnvtxt;
  AllItemMasterDate :any=[];
  Weight
SpPlant :List <any>=[];
   TotalQuantity;
  RateOfConversion
  AllItemMasterData;
  OrderInfo: any=[];
  status;
  OrderID;
  ShipToAddress;
  i;
  selectedplant;
constructor(private   _RFCCallService:RFCCallService,private  _SPComponent  :SPComponent,public datepipe: DatePipe,private _CustomerService: CustomerService, private _ItemMasterService: ItemMasterService,
    private _OrderService: OrderService, private alertService: AlertService,
    private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  ShiptoAddresss: any;
  projects = { projectID: 'wxp001', projectName: 'TYC001', dateOfStart: '2018-12-23', teamSize: 'L', inedit: false };
  ngOnInit() {
    this.getUOM();
    this.OrderID = this.storage.get('OrderId');
   this.GetMappedPlantList();
    this.getAllOrderDataByOrderNo(this.OrderID);
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

  GetMappedPlantList() {
    this._OrderService.GetMappedPlantList(localStorage.getItem(constStorage.UserCode)).subscribe((data: any) => {
      this.SpPlant = data;

    });
  }

getPlantData(){
  if ( this.selectedplant  != ''  && this.selectedplant  != null) {
    if ( this.ItemCode  != ''  && this.ItemCode  != null && this.ItemCode  != 0 && this.ItemCode  != "0") {
    this._SPComponent.setLoading(true);
    let data= {
      MATERIAL:this.ItemCode,
      PLANT_FROM: this.selectedplant
    }
    this._RFCCallService.GetSAPPlantWiseStock(data).subscribe((res: any) => {
      this.PlantData = res;
      this._SPComponent.setLoading(false);
    })
  } else {
    this.alertService.warn("Please Item First");
    return;
  }
  } else {
    this.alertService.warn("Please Select Plant");
  }

}
updatePlant(value) {
  this.selectedplant =value;
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
    if(type=='Save'){
      if ( this.TotalQuantity != 0 && this.TotalQuantity != null && this.TotalQuantity != '') {
        this._SPComponent.setLoading(true);
         this.UpdateHeaderData();
         this.i=0;
         this.DeleteDetailData(type);
       } else {
         this.alertService.warn("Please fill the mandatory fields..");
       }
    }else{
      if ( this.TotalQuantity != 0 && this.TotalQuantity != null && this.TotalQuantity != ''
      && this.selectedplant  != ''   && this.transport  != ''   && this.selectedplant  != null   && this.transport  != null  ) {
        this._SPComponent.setLoading(true);
         this.UpdateHeaderData();
         this.i=0;
         this.DeleteDetailData(type);
       } else {
         this.alertService.warn("Please fill the mandatory fields..");
       }
    }
  }

  UpdateOrderHeader(OrderHeader,type) {
    this._OrderService.UpdateOrderHeader(OrderHeader).subscribe(
      (res: any) => {
        this.InsertOrderDetails( res,type);
      },
      err => {
        this._SPComponent.setLoading(false);
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
          this._SPComponent.setLoading(false);
          this.Redirect(this.status,id);
        }
       else{
         this.InsertoRFC();
       }
      },
      err => {
        this._SPComponent.setLoading(false);
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
      this.router.navigateByUrl('/SP/PendingOrders');

      if(this.i==0){
        this.alertService.success('Order Updated.');
      }
      this.i++;
    }
  }


  DeleteDetailData(type) {
    this._OrderService.DeleteOrderDetails(this.OrderID).subscribe(
      (res: any) => {

        this.UpdateOrderHeader(this.HeaderData,type);
      },
      err => {
        this._SPComponent.setLoading(false);
        if (err.status == 400)
          this.alertService.error('Error Data not updated.');
        else
          console.log(err);
      }
    );
  }


  Back() {
    this.router.navigateByUrl('/SP/PendingOrders');
  }


  getAllCreditLimit(CustCode) {
     this._CustomerService.getAllOutStandingforDashboard(CustCode).subscribe((res: any) => {

  if(res.length!=0){
    this.CreditLimit = res[0].CreditLimitdcl;
    this.AvailableCreditLimit = res[0].AvailableCreditLimitdcl;
    // this.OutStanding = this.OutStanding *-1;
  }
  })

  }
  updateTrans(value) {
    this.transport=value;
  }
  UpdateHeaderData() {
    this.PoDate=this.datepipe.transform(  this.OrderInfo.RefDatedate, 'dd-MM-yyyy');
      this.RfcOrderData={
        ORD_TYPE:"ZOR",
        SALES_ORG:this.OrderInfo.SalesOrgNovtxt,
        DIST_CHNL:this.OrderInfo.DistributionChannelCodevtxt,
        DIVISION:this.OrderInfo.DivisionCdvtxt,
        SOLD_TO:this.OrderInfo.CustomerCodevtxt,
        SHIP_TO:this.OrderInfo.ShipToCodevtxt,
        PO_NUM:this.Pono,
        PO_DATE:this.PoDate,
        DOC_DATE:this.OrderInfo.OrderDatedate ,
        INCO_TERMS1:this.OrderInfo.DeliveryTermsCodevtxt,
        INCO_TERMS2:this.OrderInfo.DeliveryTerms1vtxt,
        PRICE_LIST:this.OrderInfo.PriceListvtxt,
        TRANS_GROUP:this.transport,
        MAT_NUM:this.ItemCode,
        QTY:this.TotalQuantity,
        DEVLY_PLANT:this.selectedplant,
        WEB_ORD:this.OrderInfo.OrderNovtxt,
        SP_CODE:localStorage.getItem(constStorage.UserCode)
      }


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
      CreatedByvtxt : localStorage.getItem(constStorage.UserCode),

    }
  }

  PostToSAP(){
    this.HeaderData = {
      IDbint : this.OrderInfo.IDbint,
      Statusvtxt : 'Posted To SAP',
      CreatedByvtxt :  localStorage.getItem(constStorage.UserCode),

    }
    this._OrderService.UpdateOrderHeaderStatus(this.HeaderData).subscribe(
      (res: any) => {
        this.router.navigateByUrl('/SP/OrderResponse');
      },
      err => {
        if (err.status == 400)
          this.alertService.error('Error Data not updated.');
        else
          console.log(err);
      }
    );
  }

InsertoRFC(){
  this._RFCCallService.PostWebOrdersToRFC(this.RfcOrderData).subscribe(
    (res: any) => {
      if(res.E_ORD_NUMs==''||res.E_ORD_NUMs==null){
        this._SPComponent.setLoading(false);
        this.storage.set('OrderResponse',res);
        this.router.navigateByUrl('/SP/OrderResponse');
      }else {
        this.storage.set('OrderResponse',res);
        this.Updatestatus(res.E_ORD_NUMs);

      }
    },
    err => {
      this._SPComponent.setLoading(false);
      if (err.status == 400)
        this.alertService.error('Error Data not updated.');
      else
        console.log(err);
    }
  );
}

  Updatestatus(SAPOrderNO){

    let data= {
      SAPOrderNovtxt  :SAPOrderNO,
      Statusvtxt  :'Posted To SAP',
      IDbint   :this.OrderID
    }
    this._OrderService.UpdateOrderHeaderStatus(data).subscribe(
      (res: any) => {
        this._SPComponent.setLoading(false);
        this.router.navigateByUrl('/SP/OrderResponse');
      },
      err => {
        this._SPComponent.setLoading(false);
        if (err.status == 400)
          this.alertService.error('Error Data not updated.');
        else
          console.log(err);
      }
    );
  }
}
