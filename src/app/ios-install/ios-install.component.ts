import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';

@Component({
  selector: 'app-ios-install',
  templateUrl: './ios-install.component.html',
  styleUrls: ['./ios-install.component.css']
})
export class IosInstallComponent implements OnInit {

  constructor( private snackBarRef:MatSnackBarRef<IosInstallComponent>  ,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private toast: MatSnackBar )
{}
ngOnInit() {
  // Detects if device is on iOS 
  const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test( userAgent );
  }
  // Detects if device is in standalone mode
  const isInStandaloneMode = () => ('standalone' in (window as any).navigator) && ((window as any).navigator.standalone);

  // Checks if should display install popup notification:
  if (isIos() && !isInStandaloneMode()) {
    this.toast.openFromComponent(IosInstallComponent, { 
      duration: 8000,
      horizontalPosition: 'start', 
      panelClass: ['mat-elevation-z3'] 
    });
  }
}

close() {
  this.snackBarRef.dismiss();
}
}
