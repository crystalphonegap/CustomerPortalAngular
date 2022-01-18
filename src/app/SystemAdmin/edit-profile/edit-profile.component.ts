import { UserService } from '../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl ,Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
 import { AlertService } from '../../component/alert.service';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';
import { SystemAdminComponent } from '../SystemAdmin.component';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html'
})
export class SystemAdminProfileEditComponent implements OnInit {
  userAdd ;
  Userid =null ;
  User: any; 
  constructor( private _SystemAdminComponent:SystemAdminComponent,private service: UserService, private router: Router
    ,@Inject(SESSION_STORAGE) private storage: WebStorageService
   , private alertService : AlertService) { }

   ngOnInit(): void {
    this.Userid= this.storage.get('Userid');
    if(this.Userid!==null && this.Userid!==""){
      this.service.getUserProfile(this.Userid).subscribe(  
        data => {  
         this.User = data ;  
         this.userAdd = new FormGroup({
          Idbint : new FormControl(this.Userid),
          UserCodetxt : new FormControl(this.User.UserCodetxt, [Validators.required, Validators.maxLength(256)]),
          UserNametxt : new FormControl(this.User.UserNametxt, [Validators.required, Validators.maxLength(256)]),
          UserTypetxt : new FormControl(this.User.UserTypetxt, [Validators.required, Validators.maxLength(256)]),
          Divisionvtxt : new FormControl(this.User.Divisionvtxt, [Validators.required, Validators.maxLength(256)]),
          Mobilevtxt : new FormControl(this.User.Mobilevtxt, [Validators.required, Validators.maxLength(256)]),
          Emailvtxt : new FormControl(this.User.Emailvtxt, [Validators.required, Validators.maxLength(256)])
      
        });
        }  
      );  
    }
    else{
      this.alertService.error('Error Session Expired.');
    }

  }

  onSubmit() {
    this._SystemAdminComponent.setLoading(true);
      this.service.EditProfile(this.userAdd.value).subscribe(
        (res: any) => {
          this._SystemAdminComponent.setLoading(false);
            this.router.navigateByUrl('/SystemAdmin/Profile');
            this.alertService.success('Profile updated succesfully.');
        },  
        err => {
          this._SystemAdminComponent.setLoading(false);
           if (err.status == 400)
             this.alertService.error('Error user not updated.');
           else
            console.log(err);
        }
      );
    }
  
}
