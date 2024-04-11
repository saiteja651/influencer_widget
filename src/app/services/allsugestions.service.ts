import { Injectable, inject } from "@angular/core";
import { Suggestions } from "../../models/suggestions";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";


@Injectable({
    providedIn:"root"
})

export class AllSuggestionsService{
    constructor(){
    }
    content:string="Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus esse ducimus repellendus repudiandae exercitationem iusto error dicta aliquam pariatur eos id saepe libero eius, molestias temporibus ipsum reiciendis debitis quidem ex! Iusto harum enim minus accusantium illum sequi voluptate! Ab maiores ut cumque ratione impedit, consequatur cum quas corporis commodi! Obcaecati recusandae nulla a est autem eveniet consequuntur officia soluta accusantium, error maxime dolores eaque impedit rerum quis voluptates quam voluptas quia, similique architecto? Nostrum, alias. Nisi numquam impedit nobis sequi eum nostrum laboriosam repudiandae atque temporibus. Vel facere incidunt, esse pariatur praesentium excepturi vero consequatur atque nostrum vitae reiciendis"
    http:HttpClient=inject(HttpClient);
    authService:AuthService=inject(AuthService);
    getAllSuggestion(){
        const bearer_token=this.authService.getUser()['bearer_token'];
        const headers=new HttpHeaders({'Authorization':`Bearer ${bearer_token}`})
        return this.http.get("/user/widget",{headers:headers});
    }
    getDescription(data){
        const bearer_token=this.authService.getUser()['bearer_token'];
        const headers=new HttpHeaders({'Authorization':`Bearer ${bearer_token}`})
        return this.http.post("/user/generate",data,{headers:headers});
    }
}