import { LoginComponent } from './../user/login/login.component';
import { UserService } from '../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CfNavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { CfAgentAsideComponent } from './CfAgent-aside/CfAgent-aside.component';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: "app-CfAgent",
  styleUrls: ['../app.component.css'],
  templateUrl: './CfAgent.component.html',
})
export class CfAgentComponent implements OnInit {
  userDetails;
  constructor(private router: Router,private _AuthService:AuthService, private service: UserService) {}
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
this._AuthService.logout();
   
  }
}
