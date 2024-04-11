import { Component, OnInit, inject } from '@angular/core';
import { Posts } from '../../../models/post';
import { PostsService } from '../../services/post.service';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit{
   allPosts:Posts[]=[]
   postService:PostsService=inject(PostsService);
   postBlur:boolean=false;
   ngOnInit(){
    this.allPosts=this.postService.getPosts();
   }
   toParentInfoClicked(){
    this.postBlur=true;
   }
}
