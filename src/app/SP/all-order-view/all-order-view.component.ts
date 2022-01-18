import { DatePipe } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { WebStorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { AlertService } from 'src/app/component/alert.service';
import { constStorage } from 'src/app/models/Storege';
import { OrderService } from 'src/app/shared/OrderService';

@Component({
  selector: 'app-order-view',
  templateUrl: './all-order-view.component.html',
  styleUrls: ['./all-order-view.component.css']
})
export class SPAllOrderViewComponent implements OnInit {

  constructor(private alertService: AlertService, public datepipe: DatePipe, private _OrderService: OrderService, private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  Orders: any=[];
  detail;
  OrderInfo:any=[];
  HeaderData;
  ngOnInit() {
    let OrderNo = this.storage.get('OrderId');
    this.getAllOrderDataByOrderNo(OrderNo);
    this.GetOrderHeaderByOrderID(OrderNo);
  }

  getAllOrderDataByOrderNo(OrderNo) {
    this._OrderService.GetOrderDetailsByOrderID(OrderNo).subscribe((data: any) => {
      this.Orders = data ;
    });
  }

  GetOrderHeaderByOrderID(OrderNo) {
    this._OrderService.GetOrderHeaderByOrderID(OrderNo).subscribe(
      data => {
        this.OrderInfo = data[0];
        this.getresponse(data[0].OrderNovtxt);
      }
    );
  }

  getresponse(OrderNo) {
    this._OrderService.GetSAPOrderCreationResponse(OrderNo).subscribe(
      data => {
        this.detail = data;
      }
    );
  }

  Back() {
    this.storage.remove('OrderId');
    this.router.navigateByUrl('/SP/OrderList');
  }

  onSubmit() {
    let RefData = this.datepipe.transform(this.OrderInfo.RefDatedate, 'dd-MM-yyyy');
    this.HeaderData = {
      IDbint: this.OrderInfo.IDbint,
      Statusvtxt: 'Posted',
      CreatedByvtxt: localStorage.getItem(constStorage.UserCode),

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

  Edit() {
    this.router.navigateByUrl('/SP/OrderEdit');
  }

  Redirect(value) {

    this.router.navigateByUrl('/SP/OrderList');
    this.alertService.success('Order Updated.');

  }


}
