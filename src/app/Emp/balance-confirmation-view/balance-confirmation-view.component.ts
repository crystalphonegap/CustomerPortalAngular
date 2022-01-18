
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { WebStorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { BalanceConfirmation } from 'src/app/shared/BalanceConfirmation';
import { EmpComponent } from '../Emp.component';


@Component({
  selector: 'app-balance-confirmation-view',
  templateUrl: './balance-confirmation-view.component.html',
  styleUrls: ['./balance-confirmation-view.component.css']
})
export class BalanceConfirmationViewComponent implements OnInit {

  constructor(private _EmpComponent:EmpComponent,private _BalanceConfirmation :BalanceConfirmation, private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  BCs: any=[];
  ngOnInit() {
    let BCNo =this.storage.get('BCId');

    this.GetBalConfDetailsDataForAHcc(BCNo);
  }

  GetBalConfDetailsDataForAHcc(OrderNo){
    this._EmpComponent.setLoading(true);
    this._BalanceConfirmation.GetBalConfDetailsDataForAHcc(OrderNo).subscribe((data: any) => {
      this.BCs = data ;
console.log(data);
      this._EmpComponent.setLoading(false);
    },
    err => {
      this._EmpComponent.setLoading(false);
        console.log(err);
    });
  }


  Back(){
    this.storage.remove('BCId');
    this.router.navigateByUrl('/Emp/BalanceConfirmationList');
  }
  Edit(){
    this.router.navigateByUrl('/Emp/BalanceConfirmationEdit');
  }
}
