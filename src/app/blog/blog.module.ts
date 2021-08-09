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
import { TableOfContentsComponent } from './post/table-of-contents/table-of-contents.component';
import { ListingPostComponent } from './listing/listing-post/listing-post.component';
import { ListingByYearComponent } from './listing/listing-by-year/listing-by-year.component';
import { ListingByMonthAndYearComponent } from './listing/listing-by-month-and-year/listing-by-month-and-year.component';
import { ListingPostPreviewComponent } from './listing/listing-post-preview/listing-post-preview.component';
import { FeedbackButtonComponent } from './post/post-footer/feedback-button/feedback-button.component';
import { PostStatusbarComponent } from './post/post-statusbar/post-statusbar.component';

@NgModule({
  imports: [
    CommonModule,
    ScullyContentModule,
    SharedModule,
    FontAwesomeModule,
    BlogRoutingModule,
  ],
  declarations: [
    PostComponent,
    ListingComponent,
    PostHeaderComponent,
    PostFooterComponent,
    PostStatusbarComponent,
    TableOfContentsComponent,
    ListingPostComponent,
    ListingByYearComponent,
    ListingByMonthAndYearComponent,
    ListingPostPreviewComponent,
    FeedbackButtonComponent,
  ],
})
export class BlogModule {}
