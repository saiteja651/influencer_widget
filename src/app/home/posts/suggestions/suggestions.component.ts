import { Component, Input, OnInit, Output, inject,EventEmitter } from '@angular/core';
import { Suggestions } from '../../../../models/suggestions';
import { AllSuggestionsService } from '../../../services/allsugestions.service';

import { BlobOptions } from 'buffer';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.css'
})
export class SuggestionsComponent implements OnInit{
  allSuggestions:Suggestions[];
  suggestionService:AllSuggestionsService=inject(AllSuggestionsService);
  currentSuggestion:Suggestions;
  currentIndex = 0;
  infoClicked:boolean=false;
  @Output()
  toParentInfoClicked:EventEmitter<boolean>=new EventEmitter<boolean>();
  ngOnInit(){
    
    this.suggestionService.getAllSuggestion().subscribe((res)=>{
      this.allSuggestions=res['posts']
    })
  }
  removePost(index:number): void {
    this.allSuggestions.splice(index, 1);
    // if (this.currentIndex === this.allPosts.length) {
    //   this.currentIndex = 0;
    // }
  }
  onInfoClicked(post:Suggestions){
    this.infoClicked=true;
    this.toParentInfoClicked.emit(true);
    this.currentSuggestion=post;
  }
  closeSuggestion(){
    this.infoClicked=false;
  }
}
