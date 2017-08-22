import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { DataService } from './../services/data.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    AboutRoutingModule
  ],
  declarations: [
    AboutComponent
  ],
  providers: [
  	DataService
  ]
})
export class AboutModule { }
