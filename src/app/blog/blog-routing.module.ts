import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostComponent } from './post/post.component';
import { ListingComponent } from './listing/listing.component';
import { PostExistsGuard } from './guards/post-exists.guard';
import { LicenseItem } from '../models/license-info.model';

const headerImageLicense: LicenseItem = {
  forItem: 'header image',
  from: 'pixabay',
  url: 'https://pixabay.com/photos/coding-computer-hacker-hacking-1841550/',
};

const routes: Routes = [
  {
    path: '',
    component: ListingComponent,
    data: {
      licenses: [headerImageLicense],
    },
  },
  {
    path: 'post',
    data: {
      licenses: [headerImageLicense],
    },
    children: [
      {
        path: ':slug',
        component: PostComponent,
        canActivate: [PostExistsGuard],
      },
      {
        path: '**',
        component: PostComponent,
        canActivate: [PostExistsGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
