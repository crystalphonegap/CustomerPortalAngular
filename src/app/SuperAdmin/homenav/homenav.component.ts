import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-homenav',
  templateUrl: './homenav.component.html',
  styleUrls: ['./homenav.component.css']
})
export class SuperAdminHomenavComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {}
  onLogout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('IDbint');
    localStorage.removeItem('UserType');
    localStorage.removeItem('UserCode');
    localStorage.removeItem('Division');
    this.router.navigate(['/user/login']);
  }
}
