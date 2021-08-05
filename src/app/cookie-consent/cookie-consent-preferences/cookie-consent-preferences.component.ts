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
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { CookieEnablement } from '../cookie-enablement.model';

@Component({
  selector: 'app-cookie-consent-preferences',
  templateUrl: './cookie-consent-preferences.component.html',
  styleUrls: ['./cookie-consent-preferences.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookieConsentPreferencesComponent implements OnInit, OnDestroy {
  showConsentPanel$: Observable<boolean>;

  icons = {
    hide: faChevronRight,
  };

  private destroy$ = new Subject();

  constructor(
    public consentService: CookieConsentService,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    this.showConsentPanel$ = consentService.displayConsentPreferences$;
  }

  ngOnInit(): void {
    this.showConsentPanel$
      .pipe(takeUntil(this.destroy$))
      .subscribe((visible) => {
        this.setVisible(visible);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setEnablementOf(enablement: CookieEnablement) {
    this.consentService.setOne(enablement.provider, enablement.enabled);
  }

  approveAll() {
    this.consentService.approveAll();
    this.setVisible(false);
  }

  rejectAll() {
    this.consentService.rejectAll();
    this.setVisible(false);
  }

  private setVisible(visible: boolean) {
    if (visible) {
      this.renderer.addClass(this.elementRef.nativeElement, 'shown');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'shown');
    }
  }
}
