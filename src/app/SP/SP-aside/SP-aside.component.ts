import { Component, OnInit } from '@angular/core';
import { constStorage } from 'src/app/models/Storege';
import { UserConstant } from 'src/app/models/Userconstant';

@Component({
  selector: 'app-SP-aside',
  templateUrl: './SP-aside.component.html',
  styleUrls: ['./SP-aside.component.css']
})

export class SPAsideComponent implements OnInit {

  constructor() { }
  UserManagement = 'none';
  ngOnInit() {
    let UserTypetxt=  localStorage.getItem(constStorage.UserType);
    if(UserTypetxt==UserConstant.SalesPromoter ){
      this.UserManagement =  'block';
    }else{
      this.UserManagement = 'none';
    }
  }

}
