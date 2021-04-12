import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostComponent } from './post/post.component';
import { ListingComponent } from './listing/listing.component';
import { PostExistsGuard } from './guards/post-exists.guard';

const routes: Routes = [
  {
    path: '',
    component: ListingComponent,
  },
  {
    path: 'post',
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
