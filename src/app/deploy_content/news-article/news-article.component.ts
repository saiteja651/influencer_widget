import { Component, inject } from '@angular/core';
import { AllSuggestionsService } from '../../services/allsugestions.service';
import { LinkedinService } from '../../services/linkedin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewsArticleService } from '../../services/news_article.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-news-article',
  templateUrl: './news-article.component.html',
  styleUrl: './news-article.component.css'
})
export class NewsArticleComponent {
  suggestionService:AllSuggestionsService=inject(AllSuggestionsService);
  allPosts
  expanded:boolean=false;
  reactiveForm:FormGroup;
  linkedinService:LinkedinService=inject(LinkedinService);
  isLoader:boolean=false;
  isFetchClicked:boolean=false;
  newsArticleService:NewsArticleService=inject(NewsArticleService);
  setBackClick:boolean=false;

  showBlueTick:boolean=false;
  expiryDays:number=1;
  toast:NgToastService=inject(NgToastService);
  ngOnInit(){
    this.reactiveForm=new FormGroup({
      keyword1:new FormControl('',Validators.required),
      keyword2:new FormControl('',Validators.required),
      keyword3:new FormControl('',Validators.required),
      region:new FormControl('IN',Validators.required),
      allow_repeat:new FormControl('true',Validators.required),
    })
    this.isLoader=true;
    this.newsArticleService.fetchNewsArticles().subscribe((res)=>{
      console.log(res)
      this.allPosts=res['filtered_posts']
      this.isLoader=false;
    })
  }
  selectedIndex: number = 0;

  nextPost() {
    if (this.selectedIndex < this.allPosts?.length - 1) {
      this.selectedIndex++;
    }
    this.expanded=false;
  }

  previousPost() {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
    }
    this.expanded=false;
  }
  isFirstPost(): boolean {
    return this.selectedIndex === 0;
  }

  isLastPost(): boolean {
    return this.selectedIndex === this.allPosts?.length - 1;
  }
  toggle(){
    this.expanded=!this.expanded
  }
  deletePost(data) {
    console.log(data.link);
    this.newsArticleService.deleteNewsArticle(data.link).subscribe((res)=>{
      console.log(res);
    })
  }

  removePost(index){
    this.allPosts.splice(index, 1);
  
    if (index === this.selectedIndex && index === this.allPosts.length) {
      this.selectedIndex--;
    }
  }
  fetchNewArticles(){
    this.isLoader=true;
    this.newsArticleService.fetchNewNewsArticles().subscribe((res)=>{
      setTimeout(()=>{
        this.allPosts=res['filtered_posts']
        this.isLoader=false;
      },2000)
      
    })
  }
  deployPost(post){
    this.isLoader=true;
    this.newsArticleService.deployAllNewsArticles(post,this.expiryDays).subscribe((res)=>{
      console.log(res);
      setTimeout(()=>{
        this.toast.success({
          detail:"success",
          summary:"posts deployed successfully",
          position:"topRight"
        })
        
        
      },2000)
       setTimeout(()=>{
        this.isLoader=false;
        window.location.reload()
       },3000)
    })
  } 
  fetchNewLinkedinPosts(){

  } 
  onBackClick(){
    
  }
}
