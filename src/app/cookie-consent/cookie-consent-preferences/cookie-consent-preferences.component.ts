import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CookieConsentService } from '../cookie-consent.service';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { CookieEnablement } from '../cookie-enablement.model';

@Component({
  selector: 'app-cookie-consent-preferences',
  templateUrl: './cookie-consent-preferences.component.html',
  styleUrls: ['./cookie-consent-preferences.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookieConsentPreferencesComponent {
  icons = {
    hide: faChevronRight,
  };

  constructor(public consentService: CookieConsentService) {}

  setEnablementOf(enablement: CookieEnablement) {
    this.consentService.setOne(enablement.provider, enablement.enabled);
  }

  approveAll() {
    this.consentService.approveAll();
    this.consentService.hideConsentPreferences();
  }

  rejectAll() {
    this.consentService.rejectAll();
    this.consentService.hideConsentPreferences();
  }
}
