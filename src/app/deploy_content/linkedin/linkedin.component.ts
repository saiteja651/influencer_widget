import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { SuggestionService } from '../../services/suggestion.service';
import { Suggestions } from '../../../models/suggestions';
import { AllSuggestionsService } from '../../services/allsugestions.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LinkedinService } from '../../services/linkedin.service';
import { link } from 'node:fs';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-linkedin',
  templateUrl: './linkedin.component.html',
  styleUrl: './linkedin.component.css'
})
export class LinkedinComponent {
  suggestionService:AllSuggestionsService=inject(AllSuggestionsService);
  allPosts
  expanded:boolean=false;
  reactiveForm:FormGroup;
  linkedinService:LinkedinService=inject(LinkedinService);
  isLoader:boolean=false;
  isFetched:boolean=false;
  setBackClick:boolean=false;
  showBlueTick:boolean=false;
  expiryDays:number=1
  toast:NgToastService=inject(NgToastService);
  ngOnInit(){
      // this.allPosts=this.suggestionService.getAllSuggestions();
    this.reactiveForm=new FormGroup({
      organization:new FormControl('',Validators.required),
      allow_repeat:new FormControl('true',Validators.required),
    })
    this.isLoader=true;
    this.linkedinService.fetchLinkedinPosts().subscribe((res)=>{
      console.log(res)
      this.allPosts=res['filtered_posts']
      this.isLoader=false;
    })
  }
  selectedIndex: number = 0;

  nextPost() {
    if (this.selectedIndex < this.allPosts.length - 1) {
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
    return this.selectedIndex === this.allPosts.length - 1;
  }
  toggle(){
    this.expanded=!this.expanded
  }
  deletePost(data){
    this.linkedinService.deleteFetchedPost(data.link).subscribe((res)=>{
      console.log(res);
    })
  }
  // onFetch(){
  //   this.isLoader=true;
  //   this.isFetched=true;
  //   this.linkedinService.linkedinFetchContent(this.reactiveForm.value).subscribe((res)=>{
  //     console.log(res);
  //     this.allPosts=res['filtered_posts']
  //     this.setBackClick=true;
  //   })
  // }
  onBackClick(){
    this.setBackClick=false;
    this.allPosts=null;
    this.isLoader=false;
    this.isFetched=false;
    this.setForm();
  }
  onDeploy(){
    
    this.linkedinService.deployPosts(this.allPosts).subscribe((res)=>{
      console.log(res)
      this.isLoader=true;
      this.allPosts=null;
      this.setForm();
      setTimeout(()=>{
        this.isLoader=false;
        this.showBlueTick=true;
        
      },1000)
      setTimeout(()=>{
        this.showBlueTick=false;
        this.isFetched=false;
      },3000)
     
    })
  }
  setForm(){
    this.reactiveForm.setValue({
      organization:'',
      allow_repeat:"true"
    })
  }
  removePost(index: number) {
    this.allPosts.splice(index, 1);
  
    if (index === this.selectedIndex && index === this.allPosts.length) {
      this.selectedIndex--;
    }
  }
  fetchNewLinkedinPosts(){
    this.isLoader=true;
    console.log("clicked")
    this.linkedinService.fetchNewLinkedinPosts().subscribe((res)=>{
      this.allPosts=res['filtered_posts']
      this.isLoader=false;
    })
  }
  deployPost(post){
    this.isLoader=true;
    this.linkedinService.deployAllPosts(post,this.expiryDays).subscribe((res)=>{
      console.log(res)
      setTimeout(()=>{
        this.toast.success({
          detail:"success",
          summary:"posts deployed successfully",
          position:'topRight'
        })
      },2000)
      this.isLoader=false;
      
       
    })
    setTimeout(()=>{
      window.location.reload();
    },4000)
  }
}
