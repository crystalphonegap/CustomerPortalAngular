import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { AlertService } from 'src/app/component/alert.service';
import { CustomerService } from 'src/app/shared/CustomerService';
import { ItemMasterService } from 'src/app/shared/ItemMasterService';
import { OrderService } from 'src/app/shared/OrderService';
import { RFCCallService } from 'src/app/shared/RFCCallService';
import { SPComponent } from '../SP.component';

@Component({
  selector: 'app-order-response',
  templateUrl: './order-response.component.html',
  styleUrls: ['./order-response.component.css']
})
export class OrderResponseComponent implements OnInit {
  response :any=[];
 detail :any=[];
constructor(private   _RFCCallService:RFCCallService,private  _SPComponent  :SPComponent,public datepipe: DatePipe,private _CustomerService: CustomerService, private _ItemMasterService: ItemMasterService,
  private _OrderService: OrderService, private alertService: AlertService,
  private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  ngOnInit() {
    
    this.response = this.storage.get('OrderResponse');
    this.detail=this.response.ET_RETURNs;
  }


  Back() {
    this.router.navigateByUrl('/SP/PendingOrders');
  }

}
