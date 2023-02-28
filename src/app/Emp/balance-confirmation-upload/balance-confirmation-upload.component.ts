import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../component/alert.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpEventType, HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import * as fileSaver from 'file-saver';
import { BalanceConfirmation } from 'src/app/shared/BalanceConfirmation';
import { DatePipe } from '@angular/common';
import { constStorage } from 'src/app/models/Storege';
import { EmpComponent } from '../Emp.component';
import { PaginationService } from 'src/app/component/pagination/pagination.service';
import { CustomerService } from 'src/app/shared/CustomerService';


@Component({
  selector: 'app-balance-confirmation-upload',
  templateUrl: './balance-confirmation-upload.component.html',
  styleUrls: ['./balance-confirmation-upload.component.css']
})
export class BalanceConfirmationUploadComponent implements OnInit {
  public progress: number;
  public message: string;
  data:any=[];
  // Users: any=[];
  pageField = [];
  
  pageNumber: boolean[] = [];
  currentPage = 1;
  pageNo: any = 1;
  Indexing :number=1;
  // UsersPerPage: any = 10;
  CustomersPerPage: any = 10;
  search = null;
  paginationData: number;
  totalCustomersCount: any;
  exactPageList: any;
  Upload:boolean=false;
  All:boolean=false;
  // Indexing: number = 1;
  // sortOrder: any = 'CompanyName_ASC';
  // order: any = 'CompanyName';
  // orderBy: string = 'Asc';
  
  @Output() public onUploadFinished = new EventEmitter();
  constructor(private _EmpComponent: EmpComponent,
    public datepipe: DatePipe,
    private router: Router,
    private _BalanceConfirmation: BalanceConfirmation, public paginationService: PaginationService, 
    private _CustomerService: CustomerService,private alertService: AlertService) { }
  fileToUpload
  FormData: FormGroup;
  Type:string='C';
  ngOnInit() {
    
    this.FormData = new FormGroup({
      StartDatedate: new FormControl('', [Validators.required, Validators.maxLength(256)]),
      EndDatedate: new FormControl('', [Validators.required, Validators.maxLength(256)]),
      // ExpiryDatedate: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    });

   
    this.Alldata();
    // this.currentPage=1;
  }
  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    this.fileToUpload = <File>files[0];


  }


  Alldata()
  {
    this.All=true;
    this.Upload=false;
    this.pageNumber[0] = true;
    this.paginationService.temppage = 0;
    this.getAllCustomers(1);
  }
  Uploaddata()
  {
    this.Upload=true;
    this.All=false;
  }



  onTypeChange(value){
    this.Type=value;
  }
  Submit() {
    this._EmpComponent.setLoading(true);
    let Fromdate
    let Todate;
    // let Expireydate
    if (this.FormData.controls['StartDatedate'].value._d != null && this.FormData.controls['StartDatedate'].value._d != '') {
      Fromdate = this.datepipe.transform(this.FormData.controls['StartDatedate'].value._d, 'dd-MM-yyyy');
    } else {
      this.alertService.error('Please Select From Date');
      return;
    }
    if (this.FormData.controls['EndDatedate'].value._d != null && this.FormData.controls['EndDatedate'].value._d != '') {
      Todate = this.datepipe.transform(this.FormData.controls['EndDatedate'].value._d, 'dd-MM-yyyy');
    } else {
      this.alertService.error('Please Select To Date');
      return;
    }
    // if (this.FormData.controls['ExpiryDatedate'].value._d != null && this.FormData.controls['ExpiryDatedate'].value._d != '') {
    //   Expireydate = this.datepipe.transform(this.FormData.controls['ExpiryDatedate'].value._d, 'dd-MM-yyyy');
    // } else {
    //   this.alertService.error('Please Select Expiry Date');
    //   return;
    // }
    const formData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    this._BalanceConfirmation.SubmitBalanceConfirmationforRAH(Fromdate, Todate, Todate, localStorage.getItem(constStorage.UserCode),localStorage.getItem(constStorage.UserCode),this.Type, formData)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.router.navigateByUrl('/Emp/dashboard');
          this._EmpComponent.setLoading(false);
        },
        err => {
          let error = err.error.text;
          this._EmpComponent.setLoading(false);
          if (error == 'Error in Uploaded File') {
            this.alertService.error(error);
            this._BalanceConfirmation.DownloadBalanceConfirmation(localStorage.getItem(constStorage.UserCode)).subscribe(response => {
              let blob: any = new Blob([response], { type: 'text/json; charset=utf-8' });
              const url = window.URL.createObjectURL(blob);
              fileSaver.saveAs(blob, 'ErrorLogfileforBalanceConfirmationUpload.xlsx');
            })
            return;
          }
          else if (error == 'file is  uploaded Successfully.') {
            this._EmpComponent.setLoading(false);
            this.alertService.error(error);
          }
          else if (err.status == 400)
            this.alertService.error('Failed to upload.');
          else
            console.log(err);;
          return
        }
      );
  }
  download() {
    this._EmpComponent.setLoading(true);
    this._BalanceConfirmation.DownloadSampleBalanceConf().subscribe(response => {
      let blob: any = new Blob([response], { type: 'text/json; charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      this._EmpComponent.setLoading(false);
      fileSaver.saveAs(blob, 'SampleBalanceConfirmationUpload.xlsx');
    },
      err => {
        this._EmpComponent.setLoading(false);
        console.log(err);
      })
  }
  back() {
    this.router.navigateByUrl('/Emp/dashboard');
  }

  getAllCustomers(pageno){
    this._EmpComponent.setLoading(true);
    this.pageNo = pageno;
    this.Indexing = pageno - 1;
    this.Indexing = this.Indexing * 10;
    this._CustomerService.getAllCustomerDataByUserTypeWiseSearch(localStorage.getItem(constStorage.UserCode),localStorage.getItem(constStorage.UserType),this.pageNo, this.CustomersPerPage,'',true,true).subscribe(res=>{
      this.data=res;
      console.log(this.data)

      this._EmpComponent.setLoading(false);
      this.getAllCustomersCount();
    },
    err => { 
      this._EmpComponent.setLoading(false);
        console.log(err);
    })
  }

  getAllCustomersCount() {
    this._EmpComponent.setLoading(true);
    this._CustomerService.getAllCustomerDataByUserTypeWiseSearchCount(localStorage.getItem(constStorage.UserCode),localStorage.getItem(constStorage.UserType), this.search,true,true).subscribe((res: any) => {
      this.totalCustomersCount = res;
      this._EmpComponent.setLoading(false);
      this.totalNoOfPages();
    },
    err => { 
      this._EmpComponent.setLoading(false);
        console.log(err);
    })
  }


  //METHOD OF PAGINATION

  totalNoOfPages() {

    this.paginationData = Number(this.totalCustomersCount / this.CustomersPerPage);
    let tempPageData = this.paginationData.toFixed();
    if (Number(tempPageData) < this.paginationData) {
      this.exactPageList = Number(tempPageData) + 1;
      this.paginationService.exactPageList = this.exactPageList;
    } else {
      this.exactPageList = Number(tempPageData);
      this.paginationService.exactPageList = this.exactPageList
    }
    this.paginationService.pageOnLoad();
    if(this.totalCustomersCount > this.CustomersPerPage){
      this.pageField = this.paginationService.pageField;
    }
    else{
      this.pageField = [1];
    }
  }

  //Pagination START 

  showPrevOrders() {

    if (this.paginationService.showNoOfCurrentPage != 1) {
      this.paginationService.prevPage();
      this.pageNumber = [];
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllCustomers(this.currentPage);
    }

  }

  showOrdersByPageNumber(page, i) {
    this.pageNumber = [];
    this.pageNumber[i] = true;
    this.pageNo = page;
    this.currentPage = page;
    this.getAllCustomers(this.currentPage);
  }

  showNextOrders() {

    if (this.paginationService.disabledNextBtn == false) {
      this.pageNumber = [];
      this.paginationService.nextPage();
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllCustomers(this.currentPage);
    }
  }

  // sortByHeading(value: string, id) {
  //   this.data = [];
  //   this.sortOrder = value;
  //   this.order = value;
  //   if (this.orderBy == "Desc") {
  //     this.orderBy = "Asc"
  //     this.sortOrder = this.sortOrder + '_ASC';
  //   } else {
  //     this.orderBy = "Desc";
  //     this.sortOrder = this.sortOrder + '_DESC'
  //   }
  //   this.getAllCustomers();
  // }

 

  
   
   

}
