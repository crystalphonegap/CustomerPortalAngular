import { UserService } from '../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AlertComponent } from '../component/alert.component';
import { DatePipe } from '@angular/common';
import { BroadCastServce } from '../shared/BroadCastServce';
import { constStorage } from '../models/Storege';

@Component({
  selector: 'app-customer',
  styleUrls: ['../app.component.css'],
  templateUrl: './Customer.component.html'
})
export class CustomerComponent implements OnInit {
  constructor( private _BroadCastServce:BroadCastServce, public datepipe: DatePipe, private router: Router, private authService: AuthService, private service: UserService) { }
  BroadCastData;
  Todate
  loading:string='none';
  Year:string=(new Date()).getFullYear().toString();

  getYear(){
    this.service.GetYear().subscribe(  
      data => {  
       this.Year =data.toString();  
      }  
    );  
  }
  
  setLoading(value){
    if(value==true){
      this.loading='block';
    }else{
      this.loading='none';

    }
  }
  ngOnInit() {
   this.getYear();
    this.Todate = new Date();
    this.Todate = this.datepipe.transform(this.Todate, 'dd-MM-yyyy'); 
    this._BroadCastServce.GetBroadCastByDate(this.Todate).subscribe(  
      data => {  
        if(data['0']!=null){
          this.BroadCastData =data['0'].Messagevtxt ;  

        }
      }  
    );  


    $(document).ready(function() {
      // user meu mobile button
      $('#kt_header_mobile_toggler').click(function() {
          $('body, #kt_header_menu_wrapper').addClass('kt-header-menu-wrapper--on');
          $('.overlayClose').addClass('on');
      });
      // user meu mobile close button & overlay close
      $('#kt_header_menu_mobile_close_btn').click(function() {
          $('body, #kt_header_menu_wrapper').removeClass(
              'kt-header-menu-wrapper--on'
          );
          $('.overlayClose').removeClass('on');
      });
      // Aside meu mobile button
      $('#kt_aside_mobile_toggler').click(function() {
          $('body, #kt_aside').addClass('kt-aside--on');
          $('.overlayClose').addClass('on');
      });
      // Aside meu mobile close button
      $('#kt_aside_close_btn, #logout').click(function() {
          $('body, #kt_aside').removeClass('kt-aside--on');
          $('.overlayClose').removeClass('on');
      });
      // submenu click
      $('#kt_aside_menu_wrapper .kt-menu__nav .kt-menu__item--submenu').click(
          function() {
              $(this).toggleClass('kt-menu__item--open');
          }
      );
      // overlay close
      $('.overlayClose').click(function() {
          $('body, #kt_header_menu_wrapper').removeClass(
              'kt-header-menu-wrapper--on'
          );
          $('body, #kt_aside').removeClass('kt-aside--on');
          $('.overlayClose').removeClass('on');
      });
      $('#logoutClick').click(function() {
        $('.overlayClose').removeClass('on');
       });
      // on menu click required actions
      $('body').on('DOMSubtreeModified', '#kt_content', function() {
          $('body, #kt_aside').removeClass('kt-aside--on');
          $('.overlayClose').removeClass('on');
          $('body, #kt_header_menu_wrapper').removeClass('kt-header-menu-wrapper--on');
          $('.overlayClose').removeClass('on');
      });
    });

  }

  onLogout() {
    this.authService.logout();
  }
}
