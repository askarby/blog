import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { CookieConsentService } from '../cookie-consent.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cookie-consent-bar',
  templateUrl: './cookie-consent-bar.component.html',
  styleUrls: ['./cookie-consent-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookieConsentBarComponent implements OnInit, OnDestroy {
  showConsentBar$: Observable<boolean>;

  private destroy$ = new Subject();

  constructor(
    public consentService: CookieConsentService,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    this.showConsentBar$ = consentService.displayConsentBar$;
  }

  ngOnInit(): void {
    this.showConsentBar$.pipe(takeUntil(this.destroy$)).subscribe((visible) => {
      this.setVisible(visible);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  private setVisible(visible: boolean) {
    const value = visible ? 'visible' : 'hidden';
    this.renderer.setStyle(this.elementRef.nativeElement, 'visibility', value);
  }
}
