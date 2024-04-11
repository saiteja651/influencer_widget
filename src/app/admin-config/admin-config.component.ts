import { Component, OnInit, inject } from '@angular/core';
import { AdminConfigService } from '../services/adminconfig.service';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-config',
  templateUrl: './admin-config.component.html',
  styleUrl: './admin-config.component.css'
})
export class AdminConfigComponent implements OnInit {
  toast: NgToastService = inject(NgToastService)
  adminConfigService: AdminConfigService = inject(AdminConfigService)
  isOAuthToken: boolean
  companyName: string = ''
  buttonClick: boolean = false;
  isOrganizationButtonClick: boolean = false;
  adminEmail: string = ''
  keyword1:string=''
  keyword2:string=''
  keyword3:string=''
  isKeywordButtonClick:boolean=false;
  countryCode:string='IN'
  ngOnInit(): void {
    this.adminConfigService.oAuthTokenStatus().subscribe((res) => {
      if (res['status'] === "present") {
        this.isOAuthToken = true;
      }
      else
        this.isOAuthToken = false;
    })
    this.adminConfigService.getOrganizationUrl().subscribe((res) => {
      this.companyName = `www.linkedin.com/company/${res['organization']}`
    })
    this.adminConfigService.getKeywords().subscribe((res)=>{
      this.keyword1=res['keywords'][0];
      this.keyword2=res['keywords'][1];
      this.keyword3=res['keywords'][2];
    })
    this.adminConfigService.getCountryCode().subscribe((res)=>{
      this.countryCode=res['region']
    })
  }
  onAdminEmailClick() {
    this.buttonClick = true;
    if (this.adminEmail !== '') {
      this.adminConfigService.adminEmailSend(this.adminEmail).subscribe((res) => {
        this.toast.success({
          detail: "Success",
          summary: "Email Sent Successfully",
          position: "topRight"
        })
        this.adminEmail = ""
      })
      this.buttonClick = false;
    }
  }
  onOrganizationUrlClick() {
    this.isOrganizationButtonClick = true;
    if (this.companyName !== '') {
      const url = this.companyName.trim();
      const startIndex = url.indexOf('company/');
      if (startIndex !== -1) {
        const companyName = url.substring(startIndex + 8);
        this.companyName = companyName.split('/')[0];
        this.adminConfigService.postOrganizationUrl(this.companyName).subscribe((res) => {
          this.toast.success({
            detail: "Success",
            summary: "Organization Url saved Successfully",
            position: "topRight"
          })
          this.companyName = "";
          this.isOrganizationButtonClick = false;
        })
      } else {
        console.error('Invalid LinkedIn URL');
      }
    }
  }
  onKeywordClick(){
    this.isKeywordButtonClick=true;
    if(this.keyword1!==''){
      this.adminConfigService.postKeywords(this.keyword1,this.keyword2,this.keyword3).subscribe((res)=>{
        this.toast.success({
          detail: "Success",
          summary: "Keywords saved Successfully",
          position: "topRight"
        })
        this.keyword1='';
        this.keyword2='';
        this.keyword3='';
      })
      this.isKeywordButtonClick=false;
    }
  }
  onCountryCodeClick(){
    this.adminConfigService.postCountryCode(this.countryCode).subscribe((res)=>{
      this.toast.success({
        detail: "Success",
        summary: "country code saved Successfully",
        position: "topRight"
      })
      this.countryCode=''
    })
  }
}
