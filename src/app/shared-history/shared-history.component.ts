import { Component, OnInit, inject } from '@angular/core';
import { SharedHistoryService } from '../services/sharedHistory.service';

@Component({
  selector: 'app-shared-history',
  templateUrl: './shared-history.component.html',
  styleUrl: './shared-history.component.css'
})
export class SharedHistoryComponent implements OnInit{
  sharedHistoryService:SharedHistoryService=inject(SharedHistoryService)
  allPosts;
  isLoader:boolean=false;
  ngOnInit(): void {
    this.isLoader=true
    this.sharedHistoryService.fetchSharedPosts().subscribe((res)=>{
      console.log(res)
      if(res&&res['linkedin_posts']){
      this.allPosts=[...res['linkedin_posts'].map(post => ({ ...post, type: 'linkedin' })),
      ...res['article_posts'].map(post => ({ ...post, type: 'article' }))];
      }
      this.isLoader=false;
    })
  }
}
