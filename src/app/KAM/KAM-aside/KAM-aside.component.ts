import { Component, OnInit } from '@angular/core';
import { constStorage } from 'src/app/models/Storege';
import { UserConstant } from 'src/app/models/Userconstant';

@Component({
  selector: 'app-KAM-aside',
  templateUrl: './KAM-aside.component.html',
  styleUrls: ['./KAM-aside.component.css']
})

export class KAMAsideComponent implements OnInit {

  constructor() { }
  UserManagement = 'none';
  ngOnInit() {
    let UserTypetxt=  localStorage.getItem(constStorage.UserType);
    if(UserTypetxt==UserConstant.KAM ){
      this.UserManagement =  'block';
    }else{
      this.UserManagement = 'none';
    }
  }

}
