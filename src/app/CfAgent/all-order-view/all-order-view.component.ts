import { DatePipe } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { WebStorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { AlertService } from 'src/app/component/alert.service';
import { OrderService } from 'src/app/shared/OrderService';

@Component({
  selector: 'app-order-view',
  templateUrl: './all-order-view.component.html',
  styleUrls: ['./all-order-view.component.css']
})
export class CFAllOrderViewComponent implements OnInit {

  constructor( private alertService: AlertService,public datepipe: DatePipe,private _OrderService :OrderService, private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  Orders: any=[];
  OrderInfo: any=[];
  HeaderData;
  ngOnInit() {
    let OrderNo =this.storage.get('OrderId');
    this.getAllOrderDataByOrderNo(OrderNo);
    this.GetOrderHeaderByOrderID(OrderNo);
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
      }
    );
  }

  Back(){
    this.storage.remove('OrderId');
    this.router.navigateByUrl('/CfAgent/OrderList');
  }

 onSubmit(){
  let RefData=this.datepipe.transform(  this.OrderInfo.RefDatedate, 'dd-MM-yyyy');
    this.HeaderData = {
      IDbint : this.OrderInfo.IDbint,
      Statusvtxt : 'Posted',
      CreatedByvtxt :  localStorage.getItem('UserCode'),

    }
    this._OrderService.UpdateOrderHeaderStatus(this.HeaderData).subscribe(
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

  Edit(){
    this.router.navigateByUrl('/CfAgent/OrderEdit');
  }

  Redirect(value) {

      this.router.navigateByUrl('/CfAgent/OrderList');
        this.alertService.success('Order Updated.');

  }


}
