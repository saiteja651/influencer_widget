import { Injectable, inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AdminComponent } from "../deploy_content/admin.component";
import { AdminFetchPosts } from "../../models/adminFetchPosts";

@Injectable({
    providedIn:"root"
})
export class CustomPostService{
    authService:AuthService=inject(AuthService);
    http:HttpClient=inject(HttpClient)
    fetchPosts(data){
        console.log(data)
        const bearer_token=this.authService.getUser()['bearer_token'];
        const headers=new HttpHeaders({'Authorization':`Bearer ${bearer_token}`})
        const dat={
            links:data['links']
        }
        return  this.http.post("/admin/custom",dat,{headers:headers})
    }
    deployAll(dat,expiryDays:number){
        dat=[dat]
        const data={
            posts:dat,
            expire_in_days:expiryDays
        }
        console.log(data)
        const bearer_token=this.authService.getUser()['bearer_token'];
        const headers=new HttpHeaders({'Authorization':`Bearer ${bearer_token}`})
        return this.http.post("/admin/deployall",data,{headers:headers})
    }
}