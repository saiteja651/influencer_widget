import {  Injectable, inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
    providedIn:"root"
})
export class widgetDataService{
    authService:AuthService=inject(AuthService);
    http:HttpClient=inject(HttpClient)
    private getHeaders() {
        const bearer_token = this.authService.getUser()['bearer_token'];
        return new HttpHeaders({ 'Authorization': `Bearer ${bearer_token}` });
      }
    
      getDeployedPosts() {
        const headers = this.getHeaders();
        return this.http.get("/admin/widget", { headers: headers });
      }
    
      archievePosts(link) {
        const headers = this.getHeaders();
        return this.http.post("/admin/archive",{link:link},{headers:headers})
      }
}