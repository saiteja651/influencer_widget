import { Component, OnInit,Input, AfterViewInit, Output, EventEmitter, inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Suggestions } from '../../../../models/suggestions';
import { linkValidator } from '../../../Validators/linkValidator';
import { LinkedinService } from '../../../services/linkedin.service';
import { SharePost } from '../../../../models/share_post';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { AllSuggestionsService } from '../../../services/allsugestions.service';
import { AuthService } from '../../../services/auth.service';



@Component({
  selector: 'app-sharepost',
  templateUrl: './sharepost.component.html',
  styleUrl: './sharepost.component.css'
})
export class SharepostComponent implements OnInit{
  toast:NgToastService=inject(NgToastService);
  allSuggestionService:AllSuggestionsService=inject(AllSuggestionsService);
  router:Router=inject(Router)
  linkedinService:LinkedinService=inject(LinkedinService);
  authService:AuthService=inject(AuthService)
  isLinkDisabled:boolean=true;
  isNewDescription:boolean=false;
  newDescription:string;
  isLinkedInLoggedin:boolean;
  reactiveForm:FormGroup
  @Input()currentPost:Suggestions|null=null;
  @Output()backClick:EventEmitter<boolean>=new EventEmitter<boolean>
  @Output()onCloseDetailedView:EventEmitter<boolean>=new EventEmitter<boolean>
  expanded:boolean=false;
  ngOnInit(): void {
    this.reactiveForm=new FormGroup({
     text:new FormControl('hi connections look at this post ...!',Validators.required),
     visibility:new FormControl('PUBLIC',Validators.required),
     link:new FormControl(this.currentPost.link,[Validators.required,linkValidator()])
    })
    this.authService.showLinkedIn().subscribe((res)=>{
      if(res['status']==='present'){
        this.isLinkedInLoggedin=true
      }
      else{
        this.isLinkedInLoggedin=false;
      }
    })
  }
  onSubmit(){
    setTimeout(()=>{
      this.onCloseDetailedView.emit(false);
    },3000)
    
    this.linkedinService.sharePost(this.reactiveForm.value).subscribe((res)=>{
      console.log(res)
      this.router.navigate(['/home']);
      if(res['success']===true){
        this.toast.success({
          detail:"Success",
          summary:"Post Shared Successfully",
          position:"topRight"
        })
      }
      else{
        this.toast.error({
          detail:"Error",
          summary:res['error'],
          position:"topRight"
        })
      }
    })
   
  }
  onBackClick(){
    this.backClick.emit(true);
  }

  toggle() {
    this.expanded = !this.expanded;     // Toggle the flag
  }
  onGenerate(post){
    const data={
      title:post.title,
      description:post.description,
    }
    this.allSuggestionService.getDescription(data).subscribe((res)=>{
      this.isNewDescription=true;
      this.reactiveForm.get('text').setValue(res['description'])
      this.newDescription=res['description'];
      console.log(res);
    })
  }
  loginWithLinkedin(){
    this.linkedinService.navigateLinkedin().subscribe((res)=>{
      const linkedin_url=res['url'];
      window.location.href=linkedin_url
    })
  }
}
