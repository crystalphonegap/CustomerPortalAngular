import { Component, OnInit } from '@angular/core';
import { LoginComponent } from './login/login.component';

import { AlertComponent } from '../component/alert.component';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor() { }
  loading:string='none';
  
  setLoading(value){
    if(value==true){
      this.loading='block';
    }else{
      this.loading='none';

    }
  }
  ngOnInit() {
  }

}