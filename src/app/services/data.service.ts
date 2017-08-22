import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class DataService {

	testNum: number = 0;
  topRecipes: string = "https://www.blendtec.com/recipes";
  recipeSlugBase: string = "https://www.blendtec.com/recipes/";
  recipeCategoryBase: string = "https://www.blendtec.com/recipes/categories/";


  constructor(private http: Http) { }

  getDataFromURL(url: string): Observable<any> {
    return this.http.get(url, { cache: true })
      .map((res: Response) => res.json())
      .map(body => body)
      .catch(() => Observable.of('Error'));
  }

  getBaseRecipes(page: number = 0) {
    if (page === 0) {
      return this.getDataFromURL(this.topRecipes + ".json");
    } else {
      return this.getDataFromURL(this.topRecipes + "/index/page:" + page + ".json");
    }
  }

  getRceipeBySlug(slug: string) {
    return this.getDataFromURL(this.recipeSlugBase + slug + ".json");
  }

  getRecipesByCategory(category: string) {
    return this.getDataFromURL(this.recipeCategoryBase + category + ".json");
  }

  getTestNum() {
  	this.testNum++;
  	return this.testNum;
  }

}
