import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject,InjectionToken, Inject } from "@angular/core";
import { User } from "../../models/user";
import { BehaviorSubject, retry, tap } from "rxjs";
import { UserToken } from "../../models/user_token";
import { Router } from "@angular/router";
import { Linkedin_Status } from "../../models/linkedin_Status";


// export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
//     providedIn: 'root',
//     factory: () => localStorage,
//   });
@Injectable({
    providedIn:"root"
})

  
export class AuthService{
    constructor(){}
    http:HttpClient=inject(HttpClient);
    router:Router=inject(Router);
    user=new BehaviorSubject<UserToken>(null);
    linkedin_status=new BehaviorSubject<Linkedin_Status>(null);
    isLogged:boolean=false;
    private tokenExpirerTime:any;
    login(data:User){
        return this.http.post("/site/login",data).pipe(tap((res)=>{
            const user_token=new UserToken(res['name'],res['username'],res['type'],res['bearer_token'])
            console.log(res)
            this.user.next(user_token);
            if(user_token){
                this.isLogged=true;
                this.autoLogout();
            }
            else{
                this.isLogged=false;
            }
            if (typeof window !== 'undefined'&&res['status']!=="failure") {
                (window as any).localStorage.setItem('user',JSON.stringify(user_token));
            }
        }));
        
    }
    logout(){
        this.isLogged=false;
        if (typeof window !== 'undefined') {
            (window as any).localStorage.removeItem('user');
        }
        this.router.navigate(['/'])
        if(this.tokenExpirerTime){
            clearTimeout(this.tokenExpirerTime);
        }
        this.tokenExpirerTime=null;

    }
    getUser(){
        if (typeof window !== 'undefined') {
            const user=JSON.parse((window as any).localStorage.getItem('user'));
            return user;
        }
        
    }
    showLinkedIn(){
        
        if(this.getUser()){
        const bearer_token=this.getUser()['bearer_token'];
        const headers=new HttpHeaders({'Authorization':`Bearer ${bearer_token}`})
        return this.http.get("/linkedin/status",{headers:headers}).pipe(tap((res)=>{
            this.linkedin_status.next(res['status']);
        }))
        }
        // else console.log("hiiii")
        return null;
    }
    isAuthenticated(){
        if(typeof window!=="undefined"){
            const user=(window as any).localStorage.getItem("user");
            if(!user) return false;
            return true;
        }
        return false
    }
    autoLogin(){
        if(typeof window!=="undefined"){
        const res=(window as any).localStorage.getItem("user");
        if(!res) return false;
        else{
            this.autoLogout();
            return true;
        }
        }
        return false;
    }
    autoLogout(){
        this.tokenExpirerTime= setTimeout(()=>{
              this.logout();
        },1000000)
          
      }
}