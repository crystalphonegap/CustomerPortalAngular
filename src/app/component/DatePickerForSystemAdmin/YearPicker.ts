import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'year-picker',

    template: `
    <div>

    <div class="col-xs-2">      
    <select class="form-control"  required>
            <option  *ngFor="let y of years"  [selected]="yy === y ">{{y}}</option>    
    </select>
    </div>

    </div>`
})

export class YearPicker implements OnInit {


public years: number[] =[];
public yy : number;

topyear;
    ngOnInit() { 
    this.getYear();
    }  

     getYear(){
        var today = new Date();
        this.yy = today.getFullYear();        
this.topyear=this.yy+100;
        for(var i = (this.topyear-200); i <= this.topyear; i++){
        this.years.push(i);}
    }


}
