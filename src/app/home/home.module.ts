import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { ScullyContentModule } from '@scullyio/ng-lib';
import { NewPostsComponent } from './new-posts/new-posts.component';

@NgModule({
  imports: [CommonModule, SharedModule, HomeRoutingModule, ScullyContentModule],
  declarations: [HomeComponent, NewPostsComponent],
})
export class HomeModule {}
