import { Component, EventEmitter, Injectable, OnInit, Output, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserToken } from '../../models/user_token';
import { LinkedinService } from '../services/linkedin.service';
import { NavigationEnd, Router, Routes } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
@Injectable()
export class SidebarComponent implements OnInit{
  router:Router=inject(Router)
  constructor(private authService:AuthService){}
  isAdmin:boolean=false;
  isLinkedinLogin:boolean;
  linkedinService:LinkedinService=inject(LinkedinService);
  showLinkedin:boolean=true;
  user:UserToken|null=null;
  @Output()
  isAdminConfigClicked:EventEmitter<boolean>=new EventEmitter<boolean>();
  toast:NgToastService=inject(NgToastService);
  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Handle router events here
      console.log('Router event:', event);
    });
    if(this.authService.showLinkedIn()){
    this.authService.showLinkedIn().subscribe((res)=>{
      console.log(res)
      if(res['status']==='present'){
        this.isLinkedinLogin=true;
      }
      else{
        this.isLinkedinLogin=false;
      }
    })
    if(this.authService.getUser()){
      if(this.authService.getUser()['type']==='admin'){
        this.isAdmin=true;
      }
    }
  }
    if(this.authService.getUser()){
      this.user=this.authService.getUser();
      const tok=this.authService.getUser().bearer_token;
      if(tok){
        this.showLinkedin=false;
      }
    }
  }  
  isActive(path: string): boolean {
    return this.router.url === path;
  }
  onLinkedinClick(){
    console.log("linkedin clicked")
    this.linkedinService.navigateLinkedin().subscribe((res)=>{
      const linkedin_url=res['url'];
      window.location.href=linkedin_url
      this.toast.success({
        detail:"Success",
        summary:"logged In Successfully",
        position:"topRight"
      })
    });
  }
  onAdminConfigClicked(){
    this.isAdminConfigClicked.emit(true);
  }
  onLogoutLinkedin(){
    this.linkedinService.logoutLinkedIn().subscribe((res)=>{
      this.isLinkedinLogin=false;
      this.toast.success({
        detail:"Success",
        summary:"logged Out Successfully",
        position:"topRight"
      })
    })
  }
  onBuildWidgetClicked(){
    this.router.navigate(['/admn_config'])
  }
  onAdminClicked(){
    
  }
  isHighlighted: boolean = false;

  highlight() {
    console.log(this.isHighlighted)
    this.isHighlighted = !this.isHighlighted;
  }
}
