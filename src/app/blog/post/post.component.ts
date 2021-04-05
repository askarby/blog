import {
  AfterViewChecked,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { HighlightService } from '../../highlight.service';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, EMPTY, Observable, of } from 'rxjs';
import {
  combineAll,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated,
})
export class PostComponent implements OnInit, AfterViewChecked {
  current$?: Observable<ScullyRoute>;

  constructor(
    private scully: ScullyRoutesService,
    private route: ActivatedRoute,
    private highlightService: HighlightService
  ) {
    console.log(scully);
    scully.available$.subscribe((available) => console.log(available));
  }

  ngOnInit(): void {
    this.current$ = combineLatest(this.route.url, this.scully.available$).pipe(
      map(([urlTree, availableRoutes]) => ({
        currentRoute: urlTree.join('/'),
        availableRoutes,
      })),
      tap((res) => console.log(res)),
      switchMap(({ currentRoute, availableRoutes }) => {
        const found = availableRoutes.find((candidate) =>
          candidate.route.endsWith(currentRoute)
        );
        return found ? of(found) : EMPTY;
      })
    );
  }

  ngAfterViewChecked(): void {
    this.highlightService.highlightAll();
  }
}
