import { Component, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';
import { DataService } from './../services/data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  version: string = environment.version;

  constructor(private dataService: DataService) { }

  ngOnInit() { }

  callUrl() {
    const url = 'https://www.blendtec.com/recipes.json';

    this.dataService.getDataFromURL(url)
      .subscribe((out: any) => { console.log(out); });
  }

}
