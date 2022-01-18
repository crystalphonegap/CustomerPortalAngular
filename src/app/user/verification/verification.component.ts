import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl ,Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { AlertService } from 'src/app/component/alert.service';
import { CustomerService } from 'src/app/shared/CustomerService';
import { UserServiceWithoutToken } from 'src/app/shared/UserServiceWithoutToken';
@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['../registration/registration.component.css']
})
export class CustomerVerificationComponent implements OnInit {

  constructor( @Inject(SESSION_STORAGE) private storage: WebStorageService, private router: Router,private _UserServiceWithoutToken:UserServiceWithoutToken,private alertService: AlertService) { }
  Customer
  ngOnInit() {
    this.Customer = new FormGroup({
      CustomerCode : new FormControl('', [Validators.required, Validators.maxLength(256)]),
      AccessToken : new FormControl('', [Validators.required, Validators.maxLength(256)]),
    })
  }

  Submit(){
    this._UserServiceWithoutToken.Verify( this.Customer.controls['CustomerCode'].value, this.Customer.controls['AccessToken'].value).subscribe(
      (res: any) => {
        if(res[0]!=null && res[0]!='' ){
          
         
if( res[0].RegisterOutput=='Invalid User'){
  this.alertService.error('Invalid Entery');
}else if(res[0].RegisterOutput=='Valid User')
{
  this.storage.set('UserId',this.Customer.controls['CustomerCode'].value);
  this.router.navigateByUrl('/user/Registration');
}
else if(res[0].RegisterOutput=='User Already Active'){
  this.alertService.error('Customer Already Active');
}
         
        }else{
          this.alertService.error('Invalid Entery');
          return null
         
        }
      },
      err => {
        if (err.status == 400)
          this.alertService.error('Error Occured.');
        else
          console.log(err);;
          return
      }
    );
  }

}
