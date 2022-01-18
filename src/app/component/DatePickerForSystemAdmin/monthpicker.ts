import { OnInit,Component } from '@angular/core';
import { List } from 'lodash';
import {Month} from './month';

@Component({
    selector: 'month-picker',

    template: `
    <div>

    <div class="col-xs-2">      
    <select class="form-control"  required>
            <option  *ngFor="let p of LastThreeMonths"  [value]="p.val"  [selected]=" this.month === p.name ">{{p.name}}</option>    
    </select>
    </div>

    </div>`
})
export class MonthPicker implements OnInit {

    public mm  ;
    month;
    LastThreeMonths= [];
    months = [
            { val: '1' , name: 'Jan' },
            { val: '2',  name: 'Feb' },
            { val: '3' , name: 'Mar' },
            { val: '4' , name: 'Apr' },
            { val: '5' , name: 'May' },
            { val: '6' , name: 'Jun' },
            { val: '7' , name: 'Jul' },
            { val: '8',  name: 'Aug' },
            { val: '9' , name: 'Sep' },
            { val: '10',  name: 'Oct' },
            { val: '11',  name: 'Nov' },
            { val: '12',  name: 'Dec' }
        ];
    
        ngOnInit() {  this.getMonth(); 
           let  temp = this.mm-2;
            for(let i =temp;i<=this.months.length;i++){
                if(i==-2){
                    this.LastThreeMonths.push(this.months[11]);
                } 
                else if(i==-1){
                    this.LastThreeMonths.push(this.months[10]);
                }else{
                    this.LastThreeMonths.push(this.months[i]) ;
                }
                if(i==this.mm){
                    break;
                }
            }
        }  
    
        getMonth(){
        var today = new Date();
        this.mm = today.getMonth();     
       this.month =this.months[this.mm].name;
        }
    }