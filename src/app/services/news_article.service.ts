import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { AuthService } from "./auth.service";


@Injectable({
    providedIn:"root"
})

export class NewsArticleService{
    constructor(){}
    http:HttpClient=inject(HttpClient);
    authService:AuthService=inject(AuthService);
    fetchNewsArticles(){
        const bearer_token=this.authService.getUser()['bearer_token'];
        const headers=new HttpHeaders({'Authorization':`Bearer ${bearer_token}`})
        return  this.http.post("/admin/saved",{type:"article"},{headers:headers})
    }
    fetchNewNewsArticles(){
        const bearer_token=this.authService.getUser()['bearer_token'];
        const headers=new HttpHeaders({'Authorization':`Bearer ${bearer_token}`})
        return  this.http.get("/admin/article",{headers:headers})
    }
    deployAllNewsArticles(allPosts,expiryDays){
        const bearer_token=this.authService.getUser()['bearer_token'];
        const headers=new HttpHeaders({'Authorization':`Bearer ${bearer_token}`})
         delete allPosts.type;
         allPosts=[allPosts];
        const data={
            posts:allPosts,
            expire_in_days:expiryDays
           
        }
        return this.http.post("/admin/deployall",data,{headers:headers});
    }
    deleteNewsArticle(link){
        const bearer_token=this.authService.getUser()['bearer_token'];
        const headers=new HttpHeaders({'Authorization':`Bearer ${bearer_token}`})
        return this.http.post("/admin/block",link,{headers:headers});
    }
}