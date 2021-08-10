import { Component, Inject } from '@angular/core';
import { mapToPosts } from '../blog/operators/map-to-post.operator';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { map } from 'rxjs/operators';
import { sort, SortingOrder } from '../shared/utilities/sorting.utility';
import { ENVIRONMENT_TOKEN } from '../shared/di.tokens';
import { Environment } from '../../environments/environment.model';
import { LicenseRepositoryService } from '../shared/services/license-repository.service';
import { License } from '../models/license.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  newestPosts$!: Observable<Post[]>;
  sourceCodeLicense: License | null;

  constructor(
    private scully: ScullyRoutesService,
    private licenses: LicenseRepositoryService,
    @Inject(ENVIRONMENT_TOKEN) public environment: Environment
  ) {
    this.newestPosts$ = scully.available$.pipe(
      mapToPosts(),
      map((posts) =>
        sort(posts).by('published_date', SortingOrder.DESC).apply()
      ),
      map((posts) => posts.slice(0, environment.frontPage.numberOfNewestPosts))
    );
    this.sourceCodeLicense = this.licenses.getLicense('MIT');
  }
}
