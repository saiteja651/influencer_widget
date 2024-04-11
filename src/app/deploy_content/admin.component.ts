import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';

Router
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  isLinkedIn:boolean=true;
  isNewsArticle:boolean=false;
  isCustomPosts:boolean=false;
  onLinkedInClicked(){
    this.isLinkedIn=true;
    this.isNewsArticle=false;
    this.isCustomPosts=false;
    this.activeLink='linkedin'
  }
  onNewsArticlesClicked(){
    this.isNewsArticle=true;
    this.isLinkedIn=false;
    this.isCustomPosts=false;
    this.activeLink='news'
  }
  onCustomPostsClicked(){
    this.isCustomPosts=true;
    this.isNewsArticle=false;
    this.isLinkedIn=false;
    this.activeLink='custom-posts'
  }
  activeLink: string='linkedin';

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setActiveLink();
      }
    });
  }

  setActiveLink() {
    const currentRoute = this.route.snapshot.firstChild.routeConfig.path;
    if (currentRoute === 'linkedin') {
      this.activeLink = 'linkedin';
    } else if (currentRoute === 'news') {
      this.activeLink = 'news';
    } else if (currentRoute === 'custom-posts') {
      this.activeLink = 'custom-posts';
    } else {
      this.activeLink = '';
    }
  }
}
