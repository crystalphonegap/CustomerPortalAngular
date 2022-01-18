import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MaterialTestCertificateService } from 'src/app/shared/MaterialTestCertificateService';
import { SystemAdminComponent } from '../SystemAdmin.component';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent  {

  constructor(private sanitizer:DomSanitizer, private _SystemAdminComponent: SystemAdminComponent,
    private _MaterialTestCertificateService:MaterialTestCertificateService,private router: Router
    ) { }
  // transform
    Base
    title;
    Base64
  ngOnInit(): void {
    this.title=localStorage.getItem('title');
    this._SystemAdminComponent.setLoading(true);
    this._MaterialTestCertificateService.GetImageByID(localStorage.getItem('base64Image') ,"MTC" ).subscribe((res: any) => {
      this._SystemAdminComponent.setLoading(false);
      this.Base64=res;
      this.Base = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${res}`);
    },
    err => {
      this._SystemAdminComponent.setLoading(false);

      console.log(err)
    })

  }

  Download(){
    var a = document.createElement("a"); //Create <a>
    a.href = "data:image/png;base64," + this.Base64; //Image Base64 Goes here
    a.download =this.title ; //File name Here
    a.click();
  }

  Back(){
    this.router.navigateByUrl('/SystemAdmin/MaterialTestCertificateList');
}
}
