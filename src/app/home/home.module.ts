import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DataService } from './../services/data.service';
import { RecipeIconComponent } from './recipe-icon/recipe-icon.component';
import { WindowService } from '../services/window.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    RecipeIconComponent
  ],
  providers: [
    DataService,
    WindowService
  ]
})
export class HomeModule { }
