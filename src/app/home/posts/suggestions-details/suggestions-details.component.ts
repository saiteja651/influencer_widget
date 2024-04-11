import { Component, Input, Output,EventEmitter, OnInit} from '@angular/core';
import { BlobOptions } from 'buffer';
import { Suggestions } from '../../../../models/suggestions';


@Component({
  selector: 'app-suggestions-details',
  templateUrl: './suggestions-details.component.html',
  styleUrl: './suggestions-details.component.css'
})
export class SuggestionsDetailsComponent implements OnInit{
  
 @Output()
 closeDetailedView:EventEmitter<boolean>=new EventEmitter<boolean>();
 @Input()currentSuggestion:Suggestions|null=null;
 share:boolean=false;
 ngOnInit(): void {
   window.scroll(0,0);
 }
 onClose(){
  this.closeDetailedView.emit(false)
 }
 expanded: boolean = false;            // Flag to track whether content is expanded

  toggle() {
    this.expanded = !this.expanded;     // Toggle the flag
  }

  fullcontent:string="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur quos commodi ex cupiditate ipsum sapiente, quo ullam eveniet odit? Ea possimus debitis, earum totam corrupti consectetur placeat mollitia laudantium iusto labore. Dolorem officiis quos cupiditate impedit magni laborum temporibus vero voluptas. Nulla quae ex ipsam vitae adipisci qui iste eaque expedita perferendis similique ratione laudantium nostrum neque consectetur dolore aspernatur quas distinctio nihil voluptates dignissimos impedit omnis eligendi, soluta labore. Maxime iste aliquid accusamus commodi id distinctio necessitatibus hic perferendis quis, ducimus consequuntur consectetur doloremque obcaecati, quidem sed maiores, deleniti tempora odit minus reiciendis. Veniam dolore officiis minus quisquam dicta."
  onShare(){
    this.share=!this.share
  }
  onBackClick(){
    this.share=false;
  }
}
