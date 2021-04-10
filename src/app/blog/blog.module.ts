import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BlogRoutingModule } from './blog-routing.module';
import { PostComponent } from './post/post.component';
import { ListingComponent } from './listing/listing.component';
import { SharedModule } from '../shared/shared.module';
import { ScullyContentModule } from '@scullyio/ng-lib';
import { PostHeaderComponent } from './post/post-header/post-header.component';
import { PostFooterComponent } from './post/post-footer/post-footer.component';

@NgModule({
  imports: [CommonModule, SharedModule, BlogRoutingModule, ScullyContentModule],
  declarations: [
    PostComponent,
    ListingComponent,
    PostHeaderComponent,
    PostFooterComponent,
  ],
})
export class BlogModule {}
