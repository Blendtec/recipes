import 'rxjs/add/operator/finally';

import { Component, OnInit, HostListener, Inject, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { DOCUMENT } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { WindowService } from '../services/window.service';

interface RecipeList {
    recipes: any[];
}

interface PlacementAndPixelsToTop {
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
  iconPlacementIcon: PlacementAndPixelsToTop[];
  pageLocationFromTopOnLoad: number;
  @ViewChild('recipeContainer') elementView: ElementRef;

  constructor(private dataService: DataService,
    @Inject(DOCUMENT) private docAng: Document,
    private windowAng: WindowService) {
    this.recipes = [];
    this.currentPage = 1;
  }

  callRecipes(pageNum: number = 0) {
    this.isLoading = true;
    this.dataService.getBaseRecipes(pageNum)
      .finally(() => { this.isLoading = false; })
      .subscribe((out: RecipeList) => {
        for (let i = 0; i < out.recipes.length; i++) {
          out.recipes[i].imageLoad = false;
          this.recipes.push(out.recipes[i]);
        }
      });
  }

  ngOnInit() {
    this.callRecipes();
    this.recipes = [];
    this.iconPlacementIcon = [];
    this.pageLocationFromTopOnLoad = this.docAng.body.scrollTop + this.windowAng.nativeWindow.innerHeight;
  }

  distanceToTop(input: PlacementAndPixelsToTop) {
    this.iconPlacementIcon.push(input);
  }

  loadIconImageByPixel(pixels: number) {
    for (const i in this.iconPlacementIcon) {
      if (this.iconPlacementIcon[i].pixelsToTop < pixels) {
        this.recipes[this.iconPlacementIcon[i].placement].imageLoad = true;
      }
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currNumber = this.docAng.body.scrollTop + this.windowAng.nativeWindow.innerHeight;
    const height = this.elementView.nativeElement.offsetHeight + this.elementView.nativeElement.offsetTop;
    this.loadIconImageByPixel(currNumber);
    if (height - currNumber < 10 && !this.isLoading) {
      this.currentPage++;
      this.callRecipes(this.currentPage);
    }
  }

}
