import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { WebStorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { DeliveryOrderService } from 'src/app/shared/DeliveryOrderService';

import { CustomerFloatDataComponent } from '../customer-float-data/customer-float-data.component';
@Component({
  selector: 'app-dispatch-order-view',
  templateUrl: './dispatch-order-view.component.html',
  styleUrls: ['./dispatch-order-view.component.css']
})
export class CustomerDispatchOrderViewComponent implements OnInit {

  constructor(private _DeliveryOrderService :DeliveryOrderService, private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  Orders: any[];
  OrderInfo ;
  ngOnInit() {
    let OrderNo =this.storage.get('OrderId');
    this.getAllOrderDataByOrderNo(OrderNo);
    this.getDeliveryOrderHeaderDataByOrderNo(OrderNo);  
  }

  getAllOrderDataByOrderNo(OrderNo){
    this._DeliveryOrderService.getAllOrderDataByOrderNo(OrderNo).subscribe((data: any) => {
      this.Orders = data ;
    });
  }

  getDeliveryOrderHeaderDataByOrderNo(OrderNo){
    this._DeliveryOrderService.getDeliveryOrderHeaderDataByOrderNo(OrderNo).subscribe(  
      data => {  
       this.OrderInfo = data[0] ;  
      }  
    );  
  }

  Back(){
    this.storage.remove('OrderId');
    
    this.router.navigateByUrl('/Customer/DispatchOrderDetail');
  }
}
