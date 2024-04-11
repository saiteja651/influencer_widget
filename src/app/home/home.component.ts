import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  authService:AuthService=inject(AuthService);
  isAdminConfigClicked:boolean=false;
  onLogout(){
    console.log("logout called")
    this.authService.logout();
  }
  setAdminConfig(){
    this.isAdminConfigClicked=true;
  }
}
