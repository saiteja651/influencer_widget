import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { AuthService } from "./auth.service";
@Injectable({
    providedIn:"root"
})
export class SharedHistoryService{
    http:HttpClient=inject(HttpClient);
    authService:AuthService=inject(AuthService);
    fetchSharedPosts(){
        const bearer_token=this.authService.getUser()['bearer_token'];
        const type=this.authService.getUser()['type'];
        const headers=new HttpHeaders({'Authorization':`Bearer ${bearer_token}`})
        return this.http.get("/user/history",{headers:headers});
    }
}