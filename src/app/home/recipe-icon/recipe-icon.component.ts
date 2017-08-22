import { Component, OnInit, Input, Output, ElementRef, EventEmitter, OnChanges } from '@angular/core';
import {Observable} from 'rxjs/Observable';

interface placementAndPixelsToTop {
	placement: number,
	pixelsToTop: number
}

@Component({
  selector: 'app-recipe-icon',
  templateUrl: './recipe-icon.component.html',
  styleUrls: ['./recipe-icon.component.scss']
})
export class RecipeIconComponent implements OnInit, OnChanges {

  constructor(private thisElement: ElementRef) { }

  @Input() recipe: any;
  @Input() placement: number;
  @Input() enableImage: boolean;
  @Input() loadPageLocation: number;
  @Input() pageLocationFromTopOnLoad: number;
  @Output() distanceToTop = new EventEmitter<placementAndPixelsToTop>();
  showRecipe: boolean;
  description: string;
  title: string;
  indexImageUrl: string;
  prepTime: number;
  cooktime: number;
  totalTime: number;
  calories: number;
  rating: number;
  slug: string;
  pixelsToTop: number;

  seeIfValidRecipe(){
  	if (this.recipe.constructor != Object) {
  		return false;
  	} else if (this.recipe.Recipe.constructor != Object) {
  		return false;
  	} else if (typeof this.recipe.Recipe.active != 'boolean' || !this.recipe.Recipe.active) {
  		return false;
  	} else if (typeof this.recipe.Recipe.description != 'string') {
  		return false;
  	} else if (typeof this.recipe.Recipe.title != 'string') {
  		return false;
  	} else if (typeof this.recipe.Recipe.indexImageUrl != 'string') {
  		return false;
  	} else if (typeof this.recipe.Recipe.preptime_seconds == 'undefined' || isNaN(this.recipe.Recipe.preptime_seconds)) {
  		return false;
  	} else if (typeof this.recipe.Recipe.cooktime_seconds == 'undefined' || isNaN(this.recipe.Recipe.cooktime_seconds)) {
  		return false;
  	} else if (typeof this.recipe.Recipe.calories == 'undefined') {
  		return false;
  	} else if (typeof this.recipe.Recipe.rating == 'undefined' || isNaN(this.recipe.Recipe.rating)) {
  		return false;
  	} else if (typeof this.recipe.Recipe.slug != 'string') {
  		return false;
  	} else {
  		return true;
  	}

  }

  setValuesFromRecipe(){
  	if (this.showRecipe) {
  		this.title = this.recipe.Recipe.title;
  		this.prepTime = Number(this.recipe.Recipe.preptime_seconds);
  		this.cooktime = Number(this.recipe.Recipe.cooktime_seconds);
  		this.totalTime = this.prepTime + this.cooktime;
  		this.calories = this.recipe.Recipe.calories;
  		this.rating = Number(this.recipe.Recipe.rating);
  		this.slug = this.recipe.Recipe.slug;
  		if (this.pixelsToTop < this.pageLocationFromTopOnLoad) {
  			this.indexImageUrl = this.recipe.Recipe.indexImageUrl;
  		}
  	}
  }

  ngOnInit() {
  	this.showRecipe = this.seeIfValidRecipe();
  	this.pixelsToTop = this.thisElement.nativeElement.offsetTop;
  	this.setValuesFromRecipe();
  	this.distanceToTop.emit({placement: this.placement, pixelsToTop: this.pixelsToTop});
  }

  ngOnChanges() {
  	if (this.enableImage && this.showRecipe) {
  		this.indexImageUrl = this.recipe.Recipe.indexImageUrl;
  	}
  }

}
