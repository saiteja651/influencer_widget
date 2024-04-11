import { Component, inject } from '@angular/core';
import { AllSuggestionsService } from '../../services/allsugestions.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { LinkedinService } from '../../services/linkedin.service';
import { linkValidator } from '../../Validators/linkValidator';
import { CustomPostService } from '../../services/custom_posts.service';
import { AdminFetchPosts } from '../../../models/adminFetchPosts';
import { Toast } from 'ngx-toastr';
import { NgToastService } from 'ng-angular-popup';
import { title } from 'process';

@Component({
  selector: 'app-custom-posts',
  templateUrl: './custom-posts.component.html',
  styleUrl: './custom-posts.component.css'
})
export class CustomPostsComponent {
  suggestionService:AllSuggestionsService=inject(AllSuggestionsService);
  toast:NgToastService=inject(NgToastService)
  allPosts:AdminFetchPosts[];
  setBackClick:boolean=false;
  expanded:boolean=false;
  showPost:boolean=false;
  isShowLink:boolean=false;
  showBlueTick:boolean=false;
  reactiveForm:FormGroup;
  customPostService:CustomPostService=inject(CustomPostService);
  isLoader:boolean=false;
  isDeployClicked:boolean=false;
  expiryDays:number=1;
  ngOnInit(){
      // this.allPosts=this.suggestionService.getAllSuggestions();
    this.reactiveForm=new FormGroup({
      links:new FormArray([
        new FormControl(null,[Validators.required,linkValidator()]),
      ])
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
  onFetch(){
    this.isLoader=true;
    this.isDeployClicked=false;
    this.customPostService.fetchPosts(this.reactiveForm.value).subscribe((res)=>{
      console.log(res)
      this.allPosts=res['posts'];
    });
    setTimeout(()=>{
      this.setBackClick=true;
      this.isLoader=false;
    },3000)
  }
  addLink(){
    (<FormArray>this.reactiveForm.get('links')).push(new FormControl(null,Validators.required))
  }
  deleteLink(index){
    const controls=<FormArray>this.reactiveForm.get('links');
    controls.removeAt(index)
  }
  onBackClick(){
    this.setBackClick=false
    this.allPosts=null;
    this.isLoader=false;
  }
  deployPost(post){
    this.isLoader=true
    this.setBackClick=false;
    this.customPostService.deployAll(post,this.expiryDays).subscribe((res)=>{
      console.log(res)
      this.isDeployClicked=true
      setTimeout(()=>{
      this.isLoader=false;
      this.showBlueTick=true;
      this.allPosts=null;
      this.reactiveForm.reset();
      this.toast.success({
        detail:"Success",
        summary:"posts deployed succesfully",
        position:"topRight"
      })
      },2000)
    })
  }
  removePost(index:number){
    this.allPosts.splice(index, 1);
  
    if (index === this.selectedIndex && index === this.allPosts.length) {
      this.selectedIndex--;
    }
  }
  isValidLinks(): boolean { 
    const linksControl = this.reactiveForm.get('links');
    return linksControl.valid && linksControl.value && linksControl.value.length > 0;
  }
  
}

