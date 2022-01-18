import { DatePipe } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { WebStorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { AlertService } from 'src/app/component/alert.service';
import { OrderService } from 'src/app/shared/OrderService';

@Component({
  selector: 'app-saporder-view',
  templateUrl: './saporder-view.component.html',
  styleUrls: ['./saporder-view.component.css']
})
export class SPSAPOrderViewComponent implements OnInit {

  constructor( private alertService: AlertService,public datepipe: DatePipe,private _OrderService :OrderService, private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  Orders: any=[];
  OrderInfo : any=[];
  detail : any=[];
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

  getresponse(OrderNo) {
    this._OrderService.GetSAPOrderCreationResponse(OrderNo).subscribe(
      data => {
        this.detail = data;
      }
    );
  }

  GetOrderHeaderByOrderID(OrderNo){
    this._OrderService.GetOrderHeaderByOrderID(OrderNo).subscribe(
      data => {
       this.OrderInfo = data[0] ;
       this.getresponse(data[0].OrderNovtxt);
      }
    );
  }

  Back(){
    this.storage.remove('OrderId');
    this.router.navigateByUrl('/SP/SAPOrderList');
  }



}

