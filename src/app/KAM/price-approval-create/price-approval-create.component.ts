import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/shared/CustomerService';
import { ItemMasterService } from 'src/app/shared/ItemMasterService';
import { KAMComponent } from '../KAM.component';
import { AlertService } from 'src/app/component/alert.service';
import { PriceApprovalService } from 'src/app/shared/PriceApprovalService';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-price-approval-create',
  templateUrl: './price-approval-create.component.html',
  styleUrls: ['./price-approval-create.component.css']
})
export class PriceApprovalCreateComponent implements OnInit {
  Userid;
  FormID = 0;
  PriceApproval:any;
  ApprovalNo;
  InsertData:any;
  InsertDataintoSAP:any;
  Customers= new FormControl('')
  CustomerCode:string=null;
  CustomerList: Observable<any>;
  Customeroptions;
  Depos= new FormControl('')
  DepoCode:string=null;
  DepoList: Observable<any>;
  Depooptions;
  loose=true;
  Consignees= new FormControl('')
  ConsigneeList: Observable<any>;
  Consigneeoptions;
  CustomerName='';
  ConsigneeCode='';
  ConsigneeName='';
  Grade='';
  TransportMode='';
  SupplyFrom='';
  DepotCode='';
  DepotName='';
  DeliveryConditions='';
  PaymentTerms='';
  Quantity=0;
  SPNonTrade=0;
  NonTrade=0;
  Unloading='';
  CompitionName='';
  CompitionPrice=0;
  SPCommNonTrade='';
  Remarks='';
  Type='';
  TTEName='';
  AllItemMasterData;
  AllCustomerData;
  ConsigneeMaster;
  AllPlantMasterData;
  PlantCode;

  constructor( private changeDetection: ChangeDetectorRef,private _CustomerService: CustomerService,private _PriceApprovalService:PriceApprovalService,
    private alertService: AlertService,private _ItemMasterService: ItemMasterService ,private _KAMComponent:KAMComponent,
    private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }

  ngOnInit(): void {
    this.Userid=localStorage.getItem('UserCode');
    let UserCode =localStorage.getItem('UserCode');
    this.GetCustomerMaster(UserCode);
    this.getAllItemMasterData();
  }


  onGetCustomerList(data) {
    this.changeDetection.detectChanges();
    this.Customeroptions = data;
    this.CustomerList = this.Customers.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterCustomerList(value))
      );
  }

  onGetDepoList(data) {
    this.changeDetection.detectChanges();
    this.Depooptions = data;
    this.DepoList = this.Depos.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterDepoList(value))
      );
  }


  onGetConsigneeList(data) {
    this.changeDetection.detectChanges();
    this.Consigneeoptions = data;
    this.ConsigneeList = this.Consignees.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterConsigneeList(value))
      );
  }

  private _filterConsigneeList(value: string) {
    const filterValue = value.toLowerCase() ;
     this.getConsigneeNameData(value);
      return this.Consigneeoptions.filter(x => x.ShipToCodevtxt.toLowerCase().includes(filterValue));;
  }


  private _filterCustomerList(value: string) {
    const filterValue = value.toLowerCase() ;
    this.GetShiptoNameByCust(value)
      return this.Customeroptions.filter(x => x.CustCodevtxt.toLowerCase().includes(filterValue));;
  }

  private _filterDepoList(value: string) {
    const filterValue = value.toLowerCase() ;
    this.GetDepotName(value);
      return this.Depooptions.filter(x => x.PlantCodevtxt.toLowerCase().includes(filterValue));;
  }


  GetCustomerMaster(Userid) {
    this._KAMComponent.setLoading(true);
    this._CustomerService.GetCustomerForKAM(Userid).subscribe(
      data => {
        this.onGetCustomerList(data)
        this.AllCustomerData = data;
        this._KAMComponent.setLoading(false);
      }
    );

  }

  GetShiptoNameByCust(value) {
    debugger;
    this._KAMComponent.setLoading(true);
    this.ConsigneeList =null;
    this.ConsigneeName='';
    this.Consignees= new FormControl('')
    for(let cust of this.AllCustomerData)
    {
      if(cust.CustCodevtxt==value)
      {
        this._KAMComponent.setLoading(true);
        this.CustomerName = cust.CustNamevtxt;
        this.CustomerCode=value;
        this._CustomerService.getGetShipToData(value).subscribe(
          data => {
            this.ConsigneeMaster = data;
            this.onGetConsigneeList(data);
          });
          return;
      }else{
        this.CustomerName = '';
        this._KAMComponent.setLoading(false);

      }
    }
  }

  getConsigneeNameData(value) {
    for(let consg of this.ConsigneeMaster)
    {
      if(consg.ShipToCodevtxt==value)
      {
        this.ConsigneeName = consg.ShipToNamevtxt;
        this.ConsigneeCode=value;
        this.getAllPlantMasterData(value);
        return;
      }
      else{
        this.ConsigneeCode='';
      }
    }

    this._KAMComponent.setLoading(false);
  }


  getAllItemMasterData() {
    this._KAMComponent.setLoading(true);
    this._ItemMasterService.getAllItemMasterData().subscribe(
      data => {
        this.AllItemMasterData = data;
        this._KAMComponent.setLoading(false);
      }
    );
  }

  getAllPlantMasterData(customercode) {
    this._KAMComponent.setLoading(true);
    this._CustomerService.GetPlantMaster(customercode).subscribe(
      data => {
        this.AllPlantMasterData = data;
        this.onGetDepoList(data);
        this._KAMComponent.setLoading(false);
      }
    );
  }

  GetDepotName(value){
    this.DepotCode=value;
    for(let plant of this.AllPlantMasterData)
    {
      if(plant.PlantCodevtxt==value)
      {
        this.DepoCode=value;
        this.DepotName = plant.PlantName1vtxt;
        return
      }else{
        this.DepoCode='';
      }
    }
  }

  GetItemName(value)
  {
    this.Grade=value;
    let temp = value.toLowerCase().includes("loose");
    if(temp!=''&& temp!=null){
this.loose=true
    }else{
this.loose=false;

    }
  }
  GetTransportMode(value)
  {
    this.TransportMode=value;
  }
  GetSupplyFrom(value)
  {
    this.SupplyFrom=value;
  }
  GetDeliveryTersms(value)
  {
    this.DeliveryConditions=value;
  }
  GetPaymentTerms(value)
  {
    this.PaymentTerms=value;
  }
  GetQuantity(value)
  {
    this.Quantity=parseFloat(value);
  }
  GetUnLoading(value)
  {
    this.Unloading=value;
  }
  GetSPNonTradeValue(value)
  {
    this.SPNonTrade=parseFloat(value);
  }
  GetCompitionName(value)
  {
    this.CompitionName=value;
  }
  GetCompitionPrice(value)
  {
    this.CompitionPrice=parseFloat(value);
  }
  GetTTEName(value)
  {
    this.TTEName=value;
  }
  GetNoneTrade(value)
  {
    this.NonTrade=parseFloat(value);
  }
  GetRemarks(value)
  {
    this.Remarks=value;
  }

  onFirstSubmit() {
    if(this.CustomerCode!=''&&this.ConsigneeCode!=null&&this.Quantity!=0&&this.NonTrade!=0&&this.Grade!='' && this.DeliveryConditions!='Select' && this.PaymentTerms != 'Select'){
      this.UpdateFirstTimeHeaderData();

    this.InsertintoSAPPriceApproval(this.InsertDataintoSAP);
      // this.InsertPriceApproval(this.InsertData);
    }else{
      this.alertService.warn("Please fill the mandatory fields..");
    }
  }

  onSecoundSubmit(){
    if(this.CustomerCode!=''&&this.ConsigneeCode!=null&&this.Quantity!=0&&this.NonTrade!=0&&this.Grade!='' && this.DeliveryConditions!='Select' && this.PaymentTerms != 'Select'){
      this.UpdateSecoundTimeHeaderData();
      this.InsertFinalPriceApproval(this.InsertData);
    }else{
      this.alertService.warn("Please fill the mandatory fields..");
    }
  }


  UpdateSecoundTimeHeaderData() {
    let PaymentTerms ;
    let DeliveryTerms ;
    if( this.PaymentTerms==null ||  this.PaymentTerms=='Select'){
      PaymentTerms=null;
    }
    else{
      PaymentTerms= this.PaymentTerms;
    }
    if( this.DeliveryConditions==null||  this.DeliveryConditions=='Select'){
      DeliveryTerms= null;
    }
    else{
      DeliveryTerms=this.DeliveryConditions;
    }


    if(this.loose) {
      this.TransportMode = 'BULK';
    }
    this.InsertData = {
      IDBint : this.FormID ,
      CustomerCodevtxt: this.CustomerCode,
      CustomerNamevtxt: this.CustomerName,
      ConsigneeCodevtxt: this.Consignees.value,
      ConsigneeNamevtxt: this.ConsigneeName,
      DepotCodevtxt: this.Depos.value,
      DepotNamevtxt: this.DepotName,
      Gradevtxt: this.Grade,
      TransportModevtxt: this.TransportMode,
      SupplyFromvtxt: this.SupplyFrom,
      DeliveryTermsvtxt: this.DeliveryConditions,
      PaymentTermsvtxt: this.PaymentTerms,
      Quantitydcl: this.Quantity,
      NonTradedcl: this.NonTrade,
      Tradedcl:  this.PriceApproval.TPRICE,
      PriceDiffdcl :   this.PriceApproval.DPRICE,
      Unloading: this.Unloading,
      NDiscountdcl: this.PriceApproval.NDISCOUNT,
      Discountdcl:  this.PriceApproval.TDISCOUNT,
      SPCommTrade:  this.PriceApproval.TSP,
      SPCommNonTrade: this.SPNonTrade,
      CompetitionNamevtxt : this.CompitionName,
      CompetitionPricedcl : this.CompitionPrice,
      TTENamevtxt : this.TTEName,
      NCRTradedcl:  this.PriceApproval.TNCR,
      NCRNonTradedcl:  this.PriceApproval.NNCR,
      NCRDiffdcl:  this.PriceApproval.DNCR,
      PackingTradedcl:  this.PriceApproval.TPACK,
      PackingNonTradedcl:  this.PriceApproval.NPACK,
      HandlingTradedcl:  this.PriceApproval.THAND,
      HandlingNonTradedcl:  this.PriceApproval.NHAND,
      PricePerMTTradedcl:  this.PriceApproval.RTPRICE,
      PricePerMTNonTradedcl:  this.PriceApproval.NPRICE,
      PrimaryFrtTradedcl:  this.PriceApproval.PTFRT,
      PrimaryFrtNonTradedcl: this.PriceApproval.PNFRT,
      SecondaryFrtTradedcl:  this.PriceApproval.STFRT,
      SecondaryFrtNonTradedcl:  this.PriceApproval.SNFRT,
      GSTTradedcl:  this.PriceApproval.TGST,
      GSTNonTradedcl: this.PriceApproval.NGST,
      RegionCodevtxt: this.PriceApproval.REGION,
      RegionDescvtxt:  this.PriceApproval.RNAME,
      BranchCodevtxt:  this.PriceApproval.BRANCH,
      BranchDescvtxt:  this.PriceApproval.BNAME,
      TerritoryCodevtxt:  this.PriceApproval.TERRITORY,
      TerritoryDescvtxt:  this.PriceApproval.TNAME,
      TPCAgentCodevtxt:  this.PriceApproval.LIFNR,
      TPCAgentNamevtxt:  this.PriceApproval.TPC,
      Destinationcodevtxt:  this.PriceApproval.LZONE,
      DestinationNamevtxt:  this.PriceApproval.DNAME,
      PriceZonevtxt:  this.PriceApproval.PLTYP,
      PriceZonedescvtxt:  this.PriceApproval.PRNAME,
      ValidityFromDate:  this.PriceApproval.VFROM,
      ValidityToDate: this.PriceApproval.VTO,
      SAPStatusvtxt: this.PriceApproval.STATUS,
      Remarksvtxt : this.Remarks,
      Typevtxt : this.Type,
      Statusvtxt : 'PosttoSAP',
      CreatedByvtxt: this.Userid
    };
    this.InsertDataintoSAP = {
      IDBint : this.FormID ,
      VFROM:  this.PriceApproval.VFROM,
      VTO: this.PriceApproval.VTO,
      KUNAG: this.CustomerCode,
      KUNNR: this.Consignees.value,
      CUSNAME: this.CustomerName,
      CONNAME: this.ConsigneeName,
      REGION: this.PriceApproval.REGION,
      BRANCH:  this.PriceApproval.BRANCH,
      TERRITORY:  this.PriceApproval.TERRITORY,
      RNAME:  this.PriceApproval.RNAME,
      BNAME:  this.PriceApproval.BNAME,
      TNAME:  this.PriceApproval.TNAME,
      PRNAME: this.PriceApproval.PRNAME,
      LZONE:  this.PriceApproval.LZONE,
      MATNR: this.Grade,
      KWMENG: this.Quantity,
      ZTERM: this.PriceApproval.ZTERM,
      ZTERM_NAME: this.PaymentTerms,//this.PriceApproval.ZTERM_NAME,
      PYNAME: this.PriceApproval.PYNAME,
      TRAGR: this.TransportMode,
      SFROM: this.SupplyFrom,
      WERKS: this.PriceApproval.WERKS,
      DPNM: this.PriceApproval.DPNM,
      LIFNR: this.PriceApproval.LIFNR,
      PLTYP: this.PriceApproval.PLTYP,
      TPRICE:  this.PriceApproval.TPRICE,
      RNPRICE: this.NonTrade,
      DPRICE: this.PriceApproval.DPRICE,
      NPRICE:  this.PriceApproval.NPRICE,
      RTPRICE:  this.PriceApproval.RTPRICE,
      PTFRT:  this.PriceApproval.PTFRT,
      PNFRT: this.PriceApproval.PNFRT,
      STFRT:  this.PriceApproval.STFRT,
      SNFRT:  this.PriceApproval.SNFRT,
      TGST:  this.PriceApproval.TGST,
      NGST: this.PriceApproval.NGST,
      TPACK:  this.PriceApproval.TPACK,
      NPACK:  this.PriceApproval.NPACK,
      THAND:  this.PriceApproval.THAND,
      NHAND:  this.PriceApproval.NHAND,
      TSP:    this.PriceApproval.TSP,
      NSP:    this.NonTrade,// this.PriceApproval.NSP,
      TDISCOUNT:  this.PriceApproval.TDISCOUNT,
      NDISCOUNT: this.PriceApproval.NDISCOUNT,
      NUNLOAD: this.Unloading,
      TUNLOAD: this.Unloading,
      TNCR:  this.PriceApproval.TNCR,
      NNCR:  this.PriceApproval.NNCR,
      DNCR:  this.PriceApproval.DNCR,
      TPC:  this.PriceApproval.TPC,
      DNAME: this.PriceApproval.DNAME,
      COMP_NM : this.CompitionName,
      COMP_PR : this.CompitionPrice,
      REMARK : this.Remarks,
      TTE : this.TTEName
    };
  }

  UpdateFirstTimeHeaderData() {
    let PaymentTerms ;
    let DeliveryTerms ;
    let WERKS :string ;
    if(this.SupplyFrom == 'PLANT'){
        WERKS = 'PLANT';
    } else {
      WERKS = this.Depos.value;
    }
    if( this.PaymentTerms==null ||  this.PaymentTerms=='Select'){
      PaymentTerms=null;
    }
    else{
      PaymentTerms= this.PaymentTerms;
    }
    if( this.DeliveryConditions==null||  this.DeliveryConditions=='Select'){
      DeliveryTerms= null;
    }
    else {
      DeliveryTerms=this.DeliveryConditions;
    }

    if(this.loose) {
      this.TransportMode = 'BULK';
    }
    this.InsertData = {
      IDBint : this.FormID ,
      CustomerCodevtxt: this.CustomerCode,
      CustomerNamevtxt: this.CustomerName,
      ConsigneeCodevtxt: this.Consignees.value,
      ConsigneeNamevtxt: this.ConsigneeName,
      Gradevtxt: this.Grade,
      DepotCodevtxt:this.Depos.value,
      DepotNamevtxt:this.DepotName,
      TransportModevtxt: this.TransportMode,
      SupplyFromvtxt: this.SupplyFrom,
      DeliveryTermsvtxt: this.DeliveryConditions,
      PaymentTermsvtxt: this.PaymentTerms,
      Quantitydcl: this.Quantity,
      NonTradedcl: this.NonTrade,
      Tradedcl: 0,
      PriceDiffdcl : 0,
      Unloading:this.Unloading,
      Discountdcl:0,
      SPCommTrade: 0,
      SPCommNonTrade:this.SPNonTrade,
      CompetitionNamevtxt :this.CompitionName,
      CompetitionPricedcl :this.CompitionPrice,
      TTENamevtxt :this.TTEName,
      Remarksvtxt :this.Remarks,
      Typevtxt :this.Type,
      Statusvtxt :'Pending',
      CreatedByvtxt:this.Userid
    }
    this.InsertDataintoSAP = {
      KUNAG: this.CustomerCode,
      KUNNR: this.Consignees.value,
      MATNR: this.Grade,
      TRAGR: this.TransportMode,
      SFROM: this.SupplyFrom,
      DLCON: this.DeliveryConditions,
      KWMENG: this.Quantity,
      RNPRICE: this.NonTrade,
      NUNLOAD:this.Unloading,
      COMP_NM :this.CompitionName,
      COMP_PR :this.CompitionPrice,
      TTE :this.TTEName,
      Remarksvtxt :this.Remarks,
      PLTYP :this.Type,
      WERKS : WERKS,
    }
  }

  InsertPriceApproval(Insertdata) {
    this._KAMComponent.setLoading(true);

    this._PriceApprovalService.InsertPriceApproval(Insertdata).subscribe(
      (res: any) => {
        this.FormID = res;
        this.InsertintoSAPPriceApproval(this.InsertDataintoSAP);
      },
      err => {
        this._KAMComponent.setLoading(false);
        if (err.status == 400)
          this.alertService.error('Due to some error Price Approval not inserted.');
        else
          console.log(err);
      }
    );
  }

  InsertintoSAPPriceApproval(InsertDataintoSAP) {
    this._KAMComponent.setLoading(true);
    this._PriceApprovalService.KAMFirstRequestPriceApproval(InsertDataintoSAP).subscribe(
      data => {
        console.log(data);
        this.PriceApproval = data ;
      }
    );
  }


  InsertFinalPriceApproval(Insertdata) {
    this._KAMComponent.setLoading(true);
    this._PriceApprovalService.InsertFinalPriceApproval(Insertdata).subscribe(
      (res: any) => {
        this.FormID = res;
        this.InsertDataintoSAP.IDBint = res;
        this.FinalInsertintoSAPPriceApproval(this.InsertDataintoSAP);
      },
      err => {
        this._KAMComponent.setLoading(false);
        if (err.status == 400)
          this.alertService.error('Due to some error Price Approval not inserted.');
        else
          console.log(err);
      }
    );
  }

  FinalInsertintoSAPPriceApproval(InsertDataintoSAP) {
    this._KAMComponent.setLoading(true);
    this._PriceApprovalService.KAMSecondRequestPriceApproval(InsertDataintoSAP).subscribe(
      data => {
        this.storage.set('PriceApprovalid',  this.FormID );
        this.router.navigateByUrl('/KAM/PriceApprovalView');
        this.alertService.success('Prise approval posted to SAP ');
        // this.PriceApproval = data ;
      }
    );
  }
}
