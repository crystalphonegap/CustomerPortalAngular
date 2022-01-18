import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { WebStorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { CustomerService } from 'src/app/shared/CustomerService';
import { CustomerFloatDataComponent } from '../customer-float-data/customer-float-data.component';
import { SalesOrderService } from 'src/app/shared/SalesOrderService';
import { DeliveryOrderService } from 'src/app/shared/DeliveryOrderService';
import { CustomerComponent } from '../Customer.component';

@Component({
  selector: 'app-Sales-order-view',
  templateUrl: './Sales-order-view.component.html',
  styleUrls: ['./Sales-order-view.component.css']
})
export class CustomerSalesOrderViewComponent implements OnInit {

  constructor(private _DeliveryOrder : DeliveryOrderService,
     private _SalesService: SalesOrderService, private router: Router,
     private _CustomerComponent:CustomerComponent,
      @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  Orders: any=[];
  DeliveryOrders: any=[];
  OrderInfo: any;
  ngOnInit() {
    let OrderNo =this.storage.get('OrderId');
    this.getAllSalesOrderDataByOrderNo(OrderNo);
    this.getSalesOrderHeaderDataByOrderNo(OrderNo);
   
  }

  getAllDeliveryOrderDataBySalesOrderNo(OrderNo){
    this._CustomerComponent.setLoading(true);
    this._SalesService.getAllDeliveryOrderDataBySalesOrderNo(OrderNo).subscribe((data: any) => {
      this.DeliveryOrders = data ;
      this._CustomerComponent.setLoading(false);
    },
    err => { 
      this._CustomerComponent.setLoading(false);
        console.log(err);
    });
  }

  getAllSalesOrderDataByOrderNo(OrderNo){
    this._CustomerComponent.setLoading(true);
    this._SalesService.getAllSalesOrderDataByOrderNo(OrderNo).subscribe((data: any) => {
      this.Orders = data ;
      this._CustomerComponent.setLoading(false);
    },
    err => { 
      this._CustomerComponent.setLoading(false);
        console.log(err);
    });
  }

  getSalesOrderHeaderDataByOrderNo(OrderNo){
    this._CustomerComponent.setLoading(true);
    this._SalesService.getSalesOrderHeaderDataByOrderNo(OrderNo).subscribe(  
      data => {  
       this.OrderInfo = data[0] ;  
       this._CustomerComponent.setLoading(false);
      }  ,
      err => { 
        this._CustomerComponent.setLoading(false);
          console.log(err);
      }
    );  
  }


  Back(){
    this.storage.remove('OrderId');
    this.router.navigateByUrl('/Customer/SalesOrderDetail');
  }

}
