import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { constStorage } from 'src/app/models/Storege';
import { UserConstant } from 'src/app/models/Userconstant';

@Component({
  selector: 'app-Emp-aside',
  templateUrl: './Emp-aside.component.html',
  styleUrls: ['./Emp-aside.component.css']
})
export class EmpAsideComponent implements OnInit {

  constructor( private router: Router) { }
  showEmp=false;
  showHO=false;
  BalanceConfirmation= 'none';
  ngOnInit() {
    let UserTypetxt = localStorage.getItem(constStorage.UserType);
    if(UserTypetxt==UserConstant.RegionalAccountingHead){
      this.showHO=true;
      this.showEmp=false;
    }else{
      this.showEmp=true;
      this.showHO=false;
    }

    if(localStorage.getItem(constStorage.UserType)==UserConstant.AccountingHead)
    {
    this.BalanceConfirmation = 'block';
    }
  }
 
}
