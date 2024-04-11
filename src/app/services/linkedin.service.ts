import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { tap } from "rxjs";
import { Suggestions } from "../../models/suggestions";
import { SharePost } from "../../models/share_post";
import { LinkedinFetchContent } from "../../models/linkedinFetchContent";
import { text } from "stream/consumers";
import { AdminFetchPosts } from "../../models/adminFetchPosts";


@Injectable({
    providedIn:"root"
})

export class LinkedinService{
    constructor(){}
    http:HttpClient=inject(HttpClient);
    authService:AuthService=inject(AuthService);
    navigateLinkedin(){
        const bearer_token=this.authService.getUser()['bearer_token'];
        const type=this.authService.getUser()['type'];
        const headers=new HttpHeaders({'Authorization':`Bearer ${bearer_token}`})
        return this.http.get("/linkedin/url",{headers:headers})
    }
    sharePost(data:SharePost){
        const bearer_token=this.authService.getUser()['bearer_token'];
        const headers=new HttpHeaders({'Authorization':`Bearer ${bearer_token}`})
        return  this.http.post("/user/share",data,{headers:headers})
    }
    fetchLinkedinPosts(){
        const bearer_token=this.authService.getUser()['bearer_token'];
        const headers=new HttpHeaders({'Authorization':`Bearer ${bearer_token}`})
        return  this.http.post("/admin/saved",{type:"linkedin"},{headers:headers})
    }
    fetchNewLinkedinPosts(){
        const bearer_token=this.authService.getUser()['bearer_token'];
        const headers=new HttpHeaders({'Authorization':`Bearer ${bearer_token}`})
        return this.http.get("/admin/linkedin",{headers:headers})
    }
    deployAllPosts(allPosts,expiration_days){
        const bearer_token=this.authService.getUser()['bearer_token'];
        const headers=new HttpHeaders({'Authorization':`Bearer ${bearer_token}`})
        delete allPosts.type;
        allPosts=[allPosts];
        const data={
            posts:allPosts,
            expire_in_days:expiration_days
           
        }
        return  this.http.post("/admin/deployall",data,{headers:headers})
    }
    deleteFetchedPost(link:string){
        const bearer_token=this.authService.getUser()['bearer_token'];
        const headers=new HttpHeaders({'Authorization':`Bearer ${bearer_token}`})
        return  this.http.post("/admin/block",{link:link},{headers:headers})
    }
    deployPosts(data:AdminFetchPosts[]){
        const dat={
            type:"linkedin",
            posts:data
        }
        const bearer_token=this.authService.getUser()['bearer_token'];
        const headers=new HttpHeaders({'Authorization':`Bearer ${bearer_token}`})
        return this.http.post("/admin/deploy",dat,{headers:headers});
    }
    logoutLinkedIn(){
        const bearer_token=this.authService.getUser()['bearer_token'];
        const headers=new HttpHeaders({'Authorization':`Bearer ${bearer_token}`})
        return this.http.get("/linkedin/remove",{headers:headers});
    }
}