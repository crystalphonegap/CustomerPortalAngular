import { Component, Input, Output, EventEmitter, OnInit, Inject } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule, MatInputModule} from '@angular/material';
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
import { constStorage } from 'src/app/models/Storege';
import { UserConstant } from 'src/app/models/Userconstant';
import { RFCCallService } from 'src/app/shared/RFCCallService';
import { SPComponent } from '../SP.component';
@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class SPCreateOrderComponent implements OnInit {
  constructor(private   _RFCCallService:RFCCallService,private  _SPComponent  :SPComponent,public datepipe: DatePipe,private _CustomerService: CustomerService, private _ItemMasterService: ItemMasterService,
    private _OrderService: OrderService, private alertService: AlertService,
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
  AllItemMasterDate :any=[];
  Uomnvtxt ;
  RateOfConversion;
  Weight;
  ItemCode;
  OrderInfo :any=[];
  SpPlant :any=[];
  OrderID;
  Userid;
  CustCodevtxt;
  CustNamevtxt;
  Addressvtxt;
  PaymentTerms1vtxt;
  DeliveryTermsvtxt;
  Customers :any=[];
  UserCode;
  myValue='';
  ShiptoAddresss : any=[];
  PlantData : any=[];
  selectedplant;
  transport;
  RfcOrderData;
  UserTypetxt:string;
  ngOnInit() {

    this.UserTypetxt=  localStorage.getItem(constStorage.UserType);
    if(this.UserTypetxt==UserConstant.SalesPromoter || this.UserTypetxt==UserConstant.OrderAnalyst){
      this.UserCode= localStorage.getItem(constStorage.UserCode);
    }else{
      this.UserTypetxt=UserConstant.SalesPromoter
      this.UserCode=localStorage.getItem(constStorage.UserSPCode);
    }
    this.Lock=false;
    this.getCustomer();
    this.getAllItemMasterData();
    this.getOrderInfo();
    this.getUOM();
    this.GetMappedPlantList();
    this.ShipTo.Addressvtxt = '';
  }

  ReloadData(){
    window.location.reload();
  }
  getAllCreditLimit(CustCode) {
    this._SPComponent.setLoading(true);
    this._CustomerService.getAllOutStandingforDashboard(CustCode).subscribe((res: any) => {

      if(res.length!=0){
      this.CreditLimit = res[0].CreditLimitdcl;
      this.AvailableCreditLimit = res[0].AvailableCreditLimitdcl;
      }
      this._SPComponent.setLoading(false);
    })
  }
  getShipToNameData(Userid) {
    if(this.CustomerData==null||this.CustomerData==''){
      this.alertService.error('Please Select Customer First');
      return;
    }
    if (Userid !== null && Userid !== "") {
      this._SPComponent.setLoading(true);
      this._CustomerService.GetShipToAddress(Userid).subscribe((res: any) => {
        this.Addressvtxt = res['0'].Addressvtxt;
        this.ShipTo = res['0'];
        this._SPComponent.setLoading(false);
      })
    }
  }

  getUOM() {
    this._SPComponent.setLoading(true);
      this._CustomerService.getUOM().subscribe((res: any) => {
        this.UOMs = res;
        this._SPComponent.setLoading(false);
      })
  }
  getOrderInfo() {
    this._SPComponent.setLoading(true);
    this._OrderService.getOrderInfo().subscribe(
      data => {
        this.OrderInfo = data['0'];
        this._SPComponent.setLoading(false);
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
    this._SPComponent.setLoading(true);
    this._CustomerService.getUOMById(ID).subscribe(
      data => {
        if(data!=null && data!=''){
          this.Uomnvtxt =  data[0].AlternativeUnit;
          this.RateOfConversion= data[0].RateOfConversion;
          this.Weight= data[0].Weight;
          if(this.TotalQuantity==null){
            this.TotalQuantity=0
          }
          this._SPComponent.setLoading(false);
          this.updateTotal(this.TotalQuantity);
        }
      }
    );

  };


  // displayFn(user: User): string {
  //   return user && user.name ? user.name : '';
  // }

  getAllItemMasterData() {
    this._SPComponent.setLoading(true);
    this._ItemMasterService.getAllItemMasterData().subscribe(
      data => {
        this.AllItemMasterDate = data;
        this._SPComponent.setLoading(false);
      }
    );
  }

  getShiptoAddressData(Userid) {

    if (Userid !== null && Userid !== "") {
      this._SPComponent.setLoading(true);

      this._CustomerService.getGetShipToData(Userid).subscribe(
        data => {
          this.ShiptoAddresss = data;
          this._SPComponent.setLoading(false);
        }
      );
    }
    }
  Customerfilerchange (value){
    this.myValue=value;
    this.getCustomer();
  }
  getCustomer() {

    this._SPComponent.setLoading(true);
    this._CustomerService.getAllCustomerDataByUserTypeWiseSearch(this.UserCode,this.UserTypetxt,0,0, this.myValue,true,true).subscribe(
        data => {
          this.Customers = data;
          this._SPComponent.setLoading(false);
        }
      );

  }

  AddDataInItemMaster(ItemCode) {
    if(ItemCode!='undefined'&& ItemCode!=0 && ItemCode!=''&& ItemCode!=null){
      this._SPComponent.setLoading(true);
        this._ItemMasterService.getItemMasterDataByKeyword(ItemCode).subscribe(
          data => {
            if(data!=null && data!=''){
            this.ItemCode=data['0'].ItemCodevtxt;
            this._SPComponent.setLoading(false);
            }
          }
        );
    }
  }


  getCustomerData(Userid) {
    if(Userid!=0){
      if (Userid !== null && Userid !== "") {
        this.getShiptoAddressData(Userid);
        this._SPComponent.setLoading(true);
        this._CustomerService.GetCustomerForCFAgent(Userid).subscribe(
          data => {
            if(data!=null && data!=''){
            this.CustomerData = data['0'];
            this.CustCodevtxt=data['0'].CustCodevtxt;
            this.CustNamevtxt=data['0'].CustNamevtxt;
            this.DeliveryTermsvtxt=data['0'].DeliveryTermsvtxt;
            this.PaymentTerms1vtxt=data['0'].PaymentTerms1vtxt;
            this._SPComponent.setLoading(false);
           this.getAllCreditLimit(data['0'].CustCodevtxt);
            }
          }
        );
      }
     this.Lock=true;
    }

  }

  updateTrans(value) {
    this.transport=value;
  }

  onSubmit(type) {
    if(type=='Pending'){
      if(this.ShiptoAddresss!=''&&this.ShiptoAddresss!=null&&this.TotalQuantity!=0&&this.TotalQuantity!=null&&this.TotalQuantity!='' ){
         this.status = 1;
         this._SPComponent.setLoading(true);
        this.getOrderInfo();
        this.UpdateHeaderData();
        this.InsertOrderHeader(this.HeaderData,type);

      }else{
        this.alertService.warn("Please fill the mandatory fields..");
      }
    }else{
      if(this.ShiptoAddresss!=''&&this.ShiptoAddresss!=null&&this.TotalQuantity!=0&&this.TotalQuantity!=null&&this.TotalQuantity!=''
      && this.selectedplant  != ''   && this.transport  != ''   && this.selectedplant  != null   && this.transport  != null ){
        this.status = 1;
        this._SPComponent.setLoading(true);
        this.getOrderInfo();
        this.UpdateHeaderData();
        this.InsertOrderHeader(this.HeaderData,type);

      }else{
        this.alertService.warn("Please fill the mandatory fields..");
      }
    }


  }


  Updatestatus(SAPOrderNO){
    this._SPComponent.setLoading(true);

    let data= {
      SAPOrderNovtxt  :SAPOrderNO,
      IDbint   :this.OrderID
    }
    this._OrderService.UpdateOrderHeaderStatus(data).subscribe(
      (res: any) => {
        this._SPComponent.setLoading(false);
        this.router.navigateByUrl('/SP/OrderResponse');
      },
      err => {
        this._SPComponent.setLoading(false);
        this._SPComponent.setLoading(false);
        if (err.status == 400)
          this.alertService.error('Error Data not updated.');
        else
          console.log(err);
      }
    );
  }

  InsertoRFC(){
    this._SPComponent.setLoading(true);
    this._RFCCallService.PostWebOrdersToRFC(this.RfcOrderData).subscribe(
      (res: any) => {


        this.storage.set('OrderResponse',res);
        this._SPComponent.setLoading(false);
        if(res.E_ORD_NUMs==''||res.E_ORD_NUMs==null){
          this._SPComponent.setLoading(false);
          this.router.navigateByUrl('/SP/OrderResponse');
        }else {
          this.Updatestatus(res.E_ORD_NUMs);
        }
      },
      err => {
        this._SPComponent.setLoading(false);
        if (err.status == 400)
          this.alertService.error('Due to some error with SAP server order added to Pending list, Try later to post to SAP.');
        else
          console.log(err);
      }
    );
  }


  InsertOrderDetails(id,type) {
    this._SPComponent.setLoading(true);
    this.OrderID=id;
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
        this._SPComponent.setLoading(false);
        if(type== "Pending") {
          this._SPComponent.setLoading(false);
          this.Redirect(this.status,id);
        }else if(type== "PosttoSAP") {
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

  Redirect(status,value){
    if(status==0){
      this.router.navigateByUrl('/SP/PendingOrders');
      this.alertService.success('Order Inserted.');

    }
  }


  GetMappedPlantList() {
    this._SPComponent.setLoading(true);
    this._OrderService.GetMappedPlantList(localStorage.getItem(constStorage.UserCode)).subscribe((data: any) => {
      this.SpPlant = data;
      this._SPComponent.setLoading(false);
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
      return;
    })
   } else {
      this.alertService.warn("Please Item First");
      return;
    }
  } else {
    this.alertService.warn("Please Select Plant");
    return;
  }

  }

  InsertOrderHeader(OrderHeader,type) {
    this._SPComponent.setLoading(true);
    this._OrderService.InsertOrderHeader(OrderHeader).subscribe(
      (res: any) => {
        this.InsertOrderDetails( res,type);
      },
      err => {
        this._SPComponent.setLoading(false);
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

  updatePlant(value) {
    this.selectedplant =value;
  }

  updateAddress(value) {
    this.DeliveryAddress = value;
  }
  UpdateHeaderData() {
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
    this.RfcOrderData={
      ORD_TYPE:"ZOR",
      SALES_ORG:this.CustomerData.SalesOrgNovtxt,
      DIST_CHNL:this.CustomerData.DistributionChannelCodevtxt,
      DIVISION: this.CustomerData.DivisionCdvtxt,
      SOLD_TO: this.CustomerData.CustCodevtxt,
      SHIP_TO: this.ShipTo.ShipToCodevtxt,
      PO_NUM:this.Pono,
      PO_DATE:PoDate,
      DOC_DATE:this.OrderInfo.OrderDatedate ,
      INCO_TERMS1:this.CustomerData.DeliveryTermsCodevtxt,
      INCO_TERMS2:this.CustomerData.DeliveryTerms1vtxt,
      PRICE_LIST:this.CustomerData.PriceListvtxt,
      TRANS_GROUP:this.transport,
      MAT_NUM:this.ItemCode,
      QTY:this.TotalQuantity,
      DEVLY_PLANT:this.selectedplant,
      WEB_ORD: this.OrderInfo.ReqOrderNo,
      SP_CODE:localStorage.getItem(constStorage.UserCode)
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
      Statusvtxt: 'Pending',
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
