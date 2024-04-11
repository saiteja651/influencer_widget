import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{
  constructor(private authService: AuthService) { }
  onLogout(){
  this.authService.logout();
  }
}
