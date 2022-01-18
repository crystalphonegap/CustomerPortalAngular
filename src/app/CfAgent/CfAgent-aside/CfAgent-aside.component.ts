import { Component, OnInit } from '@angular/core';
import { constStorage } from 'src/app/models/Storege';
import { UserConstant } from 'src/app/models/Userconstant';

@Component({
  selector: 'app-CfAgent-aside',
  templateUrl: './CfAgent-aside.component.html',
  styleUrls: ['./CfAgent-aside.component.css']
})
export class CfAgentAsideComponent implements OnInit {

  constructor() { }
  UserManagement = 'none';
  ngOnInit() {
    let UserTypetxt=  localStorage.getItem(constStorage.UserType);
    if(UserTypetxt==UserConstant.CFAgent){
      this.UserManagement =  'block';
    }else{
      this.UserManagement = 'none';
    }
  }

}
