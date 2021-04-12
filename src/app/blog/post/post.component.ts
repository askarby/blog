import {
  AfterViewChecked,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { HighlightService } from '../../highlight.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { Post } from '../../models/post.model';
import { tap } from 'rxjs/operators';
import { mapToPost } from '../operators/map-to-post.operator';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated,
})
export class PostComponent implements OnInit, AfterViewChecked {
  current$?: Observable<Post>;

  constructor(
    private scully: ScullyRoutesService,
    private route: ActivatedRoute,
    private highlightService: HighlightService
  ) {}

  ngOnInit(): void {
    this.current$ = this.scully.getCurrent().pipe(mapToPost());
  }

  ngAfterViewChecked(): void {
    this.highlightService.highlightAll();
  }
}
