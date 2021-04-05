import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BlogRoutingModule } from './blog-routing.module';
import { PostComponent } from './post/post.component';
import { ListingComponent } from './listing/listing.component';
import { SharedModule } from '../shared/shared.module';
import { ScullyContentModule } from '@scullyio/ng-lib';

@NgModule({
  imports: [CommonModule, SharedModule, BlogRoutingModule, ScullyContentModule],
  declarations: [PostComponent, ListingComponent],
})
export class BlogModule {}
