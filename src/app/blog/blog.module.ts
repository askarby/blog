import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BlogRoutingModule } from './blog-routing.module';
import { PostComponent } from './post/post.component';
import { ListingComponent } from './listing/listing.component';
import { SharedModule } from '../shared/shared.module';
import { ScullyContentModule } from '@scullyio/ng-lib';
import { PostHeaderComponent } from './post/post-header/post-header.component';
import { PostFooterComponent } from './post/post-footer/post-footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    ScullyContentModule,
    BlogRoutingModule,
  ],
  declarations: [
    PostComponent,
    ListingComponent,
    PostHeaderComponent,
    PostFooterComponent,
  ],
})
export class BlogModule {}
