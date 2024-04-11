import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { widgetDataService } from '../services/widget_data.service';
import { widgetData } from '../../models/widget_data';
import { NgToastService } from 'ng-angular-popup';
ElementRef
@Component({
  selector: 'app-widget-data',
  templateUrl: './widget-data.component.html',
  styleUrl: './widget-data.component.css'
})
export class WidgetDataComponent implements OnInit{
  toast:NgToastService=inject(NgToastService);
  allPosts:widgetData[]=[]
  sortedItems:widgetData[]=[]
  widgetService:widgetDataService=inject(widgetDataService)
  isLoader:boolean=false;
  showTitleIcons:boolean=false;
  showLinkIcons:boolean=false;
  showExpiryDateIcons:boolean=false;
  showTypeIcons:boolean=false;
  showShareCountIcons:boolean=false;
  showPostDateIcons:boolean=false;
  ngOnInit(){
    this.isLoader=true;
    setTimeout(()=>{
      this.widgetService.getDeployedPosts().subscribe((res)=>{
        console.log(res['posts'])
        this.allPosts=res['posts']
        this.sortedItems = [...this.allPosts];
        this.isLoader=false;
      })
    },1000)
   
  }
  
  sortDirection = {};

  constructor() { }

  sortTable(property: string): void {
    this.sortedItems.sort((a, b) => {
      if (this.sortDirection[property] === 'asc') {
        return a[property] > b[property] ? 1 : -1;
      } else {
        return a[property] < b[property] ? 1 : -1;
      }
    });
    console.log(property);
    this.sortDirection[property] = this.sortDirection[property] === 'asc' ? 'desc' : 'asc';
    if(property==='title'){
      this.showTitleIcons=true;
      this.showExpiryDateIcons=false;
      this.showLinkIcons=false;
      this.showPostDateIcons=false;
      this.showShareCountIcons=false;
      this.showTypeIcons=false;
    }
    if(property==='link'){
      this.showTitleIcons=false;
      this.showExpiryDateIcons=false;
      this.showLinkIcons=true;
      this.showPostDateIcons=false;
      this.showShareCountIcons=false;
      this.showTypeIcons=false;
    }
    if(property==='expiry_date'){
      this.showTitleIcons=false;
      this.showExpiryDateIcons=true;
      this.showLinkIcons=false;
      this.showPostDateIcons=false;
      this.showShareCountIcons=false;
      this.showTypeIcons=false;
    }
    if(property==='post_date'){
      this.showTitleIcons=false;
      this.showExpiryDateIcons=false;
      this.showLinkIcons=false;
      this.showPostDateIcons=true;
      this.showShareCountIcons=false;
      this.showTypeIcons=false;
    }
    if(property==='share_count'){
      this.showTitleIcons=false;
      this.showExpiryDateIcons=false;
      this.showLinkIcons=false;
      this.showPostDateIcons=false;
      this.showShareCountIcons=true;
      this.showTypeIcons=false;
    }
    if(property==='type'){
      this.showTitleIcons=false;
      this.showExpiryDateIcons=false;
      this.showLinkIcons=false;
      this.showPostDateIcons=false;
      this.showShareCountIcons=false;
      this.showTypeIcons=true;
    }
  }

  highlightRow(event: MouseEvent): void {
    const targetRow = (event.target as HTMLElement).closest('tr');
    if (targetRow) {
      targetRow.classList.add('hovered');
    }
  }

  removeHighlight(event: MouseEvent): void {
    const targetRow = (event.target as HTMLElement).closest('tr');
    if (targetRow) {
      targetRow.classList.remove('hovered');
    }
  }

  archivePost(item: widgetData): void {
    this.closeModal();
    this.widgetService.archievePosts(item.link).subscribe(()=>{
      this.isLoader=true;
      setTimeout(()=>{
        this.widgetService.getDeployedPosts().subscribe((res)=>{
          console.log(res['posts'])
          this.allPosts=res['posts']
          this.sortedItems = [...this.allPosts];
          this.isLoader=false;
          this.toast.success({
            detail:"succes",
            summary:"post archived successfully",
            position:"topRight"
          })
        })
      },1000)
    })
  }
  @ViewChild('myModal') modal: ElementRef;
  openModal() {
    this.modal.nativeElement.classList.add('show');
    this.modal.nativeElement.style.display = 'block';
    document.body.classList.add('modal-open');
    const backdrop = document.createElement('div');
    backdrop.classList.add('modal-backdrop', 'fade', 'show');
    document.body.appendChild(backdrop);
  }

  closeModal() {
    this.modal.nativeElement.classList.remove('show');
    this.modal.nativeElement.style.display = 'none';
    document.body.classList.remove('modal-open');
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
  }
}
