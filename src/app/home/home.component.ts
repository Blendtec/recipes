import 'rxjs/add/operator/finally';

import { Component, OnInit, HostListener, Inject, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { DOCUMENT } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

interface recipeList {
    recipes: any[];
}

interface placementAndPixelsToTop {
  placement: number,
  pixelsToTop: number
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  quote: string;
  isLoading: boolean;
  recipes: any[];
  currentPage: number;
  iconPlacementIcon: placementAndPixelsToTop[];
  pageLocationFromTopOnLoad: number;
  @ViewChild('recipeContainer') elementView: ElementRef;

  constructor(private dataService: DataService, @Inject(DOCUMENT) private document: Document) {
    this.recipes = [];
    this.currentPage = 1;
  }

  callRecipes(pageNum: number = 0) {
    this.isLoading = true;
    this.dataService.getBaseRecipes(pageNum)
      .finally(() => { this.isLoading = false; })
      .subscribe((out: recipeList) => {
        for(let i in out.recipes) {
          out.recipes[i].imageLoad = false;
          this.recipes.push(out.recipes[i]);
        }
      });
  }

  ngOnInit() {
    this.callRecipes();
    this.recipes = [];
    this.iconPlacementIcon = [];
    this.pageLocationFromTopOnLoad = this.document.body.scrollTop + window.innerHeight;
  }

  distanceToTop(input: placementAndPixelsToTop) {
    this.iconPlacementIcon.push(input);
  }

  loadIconImageByPixel(pixels: number) {
    for (var i in this.iconPlacementIcon) {
      if (this.iconPlacementIcon[i].pixelsToTop < pixels) {
        this.recipes[this.iconPlacementIcon[i].placement].imageLoad = true;
      }
    }
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    let currNumber = this.document.body.scrollTop + window.innerHeight;
    let height = this.elementView.nativeElement.offsetHeight + this.elementView.nativeElement.offsetTop;
    this.loadIconImageByPixel(currNumber);
    if (height - currNumber < 10 && !this.isLoading) {
      this.currentPage++;
      this.callRecipes(this.currentPage);
    }
  }

}
