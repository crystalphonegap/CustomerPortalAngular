import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { ContentService } from 'src/app/shared/ContentService';
@Component({
  selector: 'app-contain',
  templateUrl: './contain.component.html',
  styleUrls: ['./contain.component.css']
})
export class ContainComponent implements OnInit {
  Content;
  constructor(public datepipe: DatePipe,private _ContentService:ContentService) { }
  Todate;
  ngOnInit() {
    this.Todate  = new Date();
    this.Todate = this.datepipe.transform(this.Todate, 'dd-MM-yyyy');
   
    this._ContentService.GetContentByDate(this.Todate).subscribe(  
      data => {  
        if(data['0']!=null){
          this.Content =data['0'].Contentvtxt ;  

        }
      }  
    );  
  }

}
