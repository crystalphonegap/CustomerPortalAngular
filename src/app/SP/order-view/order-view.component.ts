import { DatePipe } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { WebStorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { AlertService } from 'src/app/component/alert.service';
import { constStorage } from 'src/app/models/Storege';
import { CustomerService } from 'src/app/shared/CustomerService';
import { OrderService } from 'src/app/shared/OrderService';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class SPOrderViewComponent implements OnInit {

  constructor(private _CustomerService: CustomerService,  private alertService: AlertService,
    public datepipe: DatePipe,private _OrderService :OrderService, private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  Orders: any=[];
  OrderInfo : any=[];
  detail: any=[];
  HeaderData;
  CreditLimit;
  AvailableCreditLimit;
  ngOnInit() {
    let OrderNo =this.storage.get('OrderId');
    this.getAllOrderDataByOrderNo(OrderNo);
    this.GetOrderHeaderByOrderID(OrderNo);
  }

  getresponse(OrderNo) {
    this._OrderService.GetSAPOrderCreationResponse(OrderNo).subscribe(
      data => {
        this.detail = data;
      }
    );
  }


  getAllCreditLimit(CustCode) {
    this._CustomerService.getAllOutStandingforDashboard(CustCode).subscribe((res: any) => {

      if(res.length!=0){
   this.CreditLimit = res[0].CreditLimitdcl;
   this.AvailableCreditLimit = res[0].AvailableCreditLimitdcl;
      }

 })

 }
  getAllOrderDataByOrderNo(OrderNo){
    this._OrderService.GetOrderDetailsByOrderID(OrderNo).subscribe((data: any) => {
      this.Orders = data ;
    });
  }

  GetOrderHeaderByOrderID(OrderNo){
    this._OrderService.GetOrderHeaderByOrderID(OrderNo).subscribe(
      data => {
       this.OrderInfo = data[0] ;
       this.getAllCreditLimit(data[0].CustomerCodevtxt)
       this.getresponse(data[0].OrderNovtxt);
      }
    );
  }

  Back(){
    this.storage.remove('OrderId');
    this.router.navigateByUrl('/SP/PendingOrders');
  }

 onSubmit(){
  let RefData=this.datepipe.transform(  this.OrderInfo.RefDatedate, 'dd-MM-yyyy');
    this.HeaderData = {
      IDbint : this.OrderInfo.IDbint,
      Statusvtxt  :'Reject',
      SAPOrderNovtxt  :null,
      CreatedByvtxt :  localStorage.getItem(constStorage.UserCode),

    }
    this._OrderService.UpdateOrderHeaderStatus(this.HeaderData).subscribe(
      (res: any) => {
        this.router.navigateByUrl('/SP/PendingOrders');
      },
      err => {
        if (err.status == 400)
          this.alertService.error('Error Data not updated.');
        else
          console.log(err);
      }
    );
 }

  Edit(){
    this.router.navigateByUrl('/SP/OrderEdit');
  }

  Redirect(value) {

      this.router.navigateByUrl('/SP/OrderList');
        this.alertService.success('Order Updated.');

  }


}
