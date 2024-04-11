import { Injectable, inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
    providedIn:"root"
})
export class AdminConfigService{
    authService:AuthService=inject(AuthService)
    http:HttpClient=inject(HttpClient)
    private getHeaders() {
        const bearer_token = this.authService.getUser()['bearer_token'];
        return new HttpHeaders({'Authorization': `Bearer ${bearer_token}`});
      }
    
      oAuthTokenStatus() {
        return this.http.get("/admin/status", { headers: this.getHeaders() });
      }
    
      adminEmailSend(email) {
        return this.http.post("/admin/mail", { email }, { headers: this.getHeaders() });
      }
    
      postOrganizationUrl(organization) {
        return this.http.post("/admin/organization", { organization }, { headers: this.getHeaders() });
      }
      getOrganizationUrl(){
        return this.http.get("/admin/organization",{headers:this.getHeaders()});
      }
      postKeywords(keyword1:string,keyword2:string,keyword3:string){
        let data = { keywords: [] };

        if (keyword1) {
          data.keywords.push(keyword1);
        }
        if (keyword2) {
          data.keywords.push(keyword2);
        }
        if (keyword3) {
          data.keywords.push(keyword3);
        }
        console.log(data)
        return this.http.post("/admin/keywords", data, { headers:this.getHeaders() });
                
      }
      getKeywords(){
        return this.http.get("/admin/keywords", { headers:this.getHeaders() });
      }
      postCountryCode(countryCode){
        return this.http.post("/admin/region",{region:countryCode},{headers:this.getHeaders()});
      }
      getCountryCode(){
        return this.http.get("/admin/region",{headers:this.getHeaders()});
      }
}