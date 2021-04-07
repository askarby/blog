import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faGithub,
  faLinkedin,
  faStackOverflow,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { ExternalLink, InternalLink } from '../navigation.model';
import { SocialMedia } from '../../../../environments/environment.model';

@Component({
  selector: 'app-slide-out-menu',
  templateUrl: './slide-out-menu.component.html',
  styleUrls: ['./slide-out-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideOutMenuComponent implements OnChanges {
  @Input()
  menuItems!: (InternalLink | ExternalLink)[];

  @Input()
  socialMedia!: SocialMedia;

  @Input()
  menuShown: boolean;

  @Output()
  closeMenu: EventEmitter<void>;

  icons = {
    close: faTimes,
    social: {
      facebook: faFacebook,
      twitter: faTwitter,
      linkedin: faLinkedin,
      stackoverflow: faStackOverflow,
      github: faGithub,
    },
  };

  constructor(private hostElementRef: ElementRef, private renderer: Renderer2) {
    this.menuShown = false;
    this.closeMenu = new EventEmitter<void>();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { menuShown } = changes;
    if (menuShown) {
      if (menuShown.currentValue) {
        this.renderer.addClass(this.hostElementRef.nativeElement, 'shown');
      } else {
        this.renderer.removeClass(this.hostElementRef.nativeElement, 'shown');
      }
    }
  }
}
