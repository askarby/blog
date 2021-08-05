import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CookieEnablement } from '../../cookie-enablement.model';
import { CookieImportance } from '../../cookie-provider.model';

@Component({
  selector: 'app-cookie-consent-item',
  templateUrl: './cookie-consent-item.component.html',
  styleUrls: ['./cookie-consent-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookieConsentItemComponent {
  @Input()
  item!: CookieEnablement;

  @Output()
  itemChange = new EventEmitter<CookieEnablement>();

  setProvider(enabled: boolean) {
    this.itemChange.emit({
      enabled,
      provider: this.item.provider,
    });
  }

  get isUnmodifiable() {
    return this.item.provider.importance === CookieImportance.default;
  }
}
