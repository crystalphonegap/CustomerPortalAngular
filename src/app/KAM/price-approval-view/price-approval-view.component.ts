import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { WebStorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { PriceApprovalService } from 'src/app/shared/PriceApprovalService';

@Component({
  selector: 'app-price-approval-view',
  templateUrl: './price-approval-view.component.html',
  styleUrls: ['./price-approval-view.component.css']
})
export class PriceApprovalViewComponent implements OnInit {

  constructor(private _PriceApprovalService :PriceApprovalService, private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  PriceApproval: any;
  ngOnInit(): void {
    let No =this.storage.get('PriceApprovalid');
    this.GetPriceApprovalById(No);
    console.log(this.PriceApproval);
  }

  GetPriceApprovalById(id){
    this._PriceApprovalService.GetPriceApprovalById(id).subscribe(  
      data => {  
        console.log(data);
       this.PriceApproval = data ; 
      }  
    );  
  }

  Back()
  {
    this.storage.remove('PriceApprovalid');
    this.router.navigateByUrl('/KAM/PriceApprovalList');
  }
}
