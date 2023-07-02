import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { HighlightService } from '../../highlight.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { Post } from '../../models/post.model';
import { mapToPost } from '../operators/map-to-post.operator';
import { ENVIRONMENT_TOKEN } from '../../shared/di.tokens';
import { Environment } from '../../../environments/environment.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnInit, AfterViewChecked {
  current$?: Observable<Post | null>;

  constructor(
    private scully: ScullyRoutesService,
    private route: ActivatedRoute,
    private highlightService: HighlightService,
    @Inject(ENVIRONMENT_TOKEN) public environment: Environment
  ) {}

  ngOnInit(): void {
    this.current$ = this.scully
      .getCurrent()
      .pipe(mapToPost(this.scully.available$));
  }

  ngAfterViewChecked(): void {
    this.highlightService.highlightAll();
  }
}
