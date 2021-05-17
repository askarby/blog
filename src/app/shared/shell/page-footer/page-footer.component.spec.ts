import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { PageFooterComponent } from './page-footer.component';
import { SocialMediaComponent } from '../../components/social-media/social-media.component';
import { NavigationListComponent } from '../navigation-list/navigation-list.component';
import { MockComponents } from 'ng-mocks';
import {
  createLinks,
  createSocialMedia,
} from '../../../testing/environment.test-utils';
import { SocialMedia } from '../../../../environments/environment.model';
import { ExternalLink, InternalLink } from '../navigation.model';
import { LicenseItem } from '../../../models/license-info.model';
import { createLicenseItem } from '../../../testing/license.test-util';

describe('PageFooterComponent', () => {
  const createComponent = createComponentFactory({
    component: PageFooterComponent,
    declarations: [
      MockComponents(SocialMediaComponent, NavigationListComponent),
    ],
  });
  let spectator: Spectator<PageFooterComponent>;
  let component: PageFooterComponent;

  let socialMedia: SocialMedia;
  let menuItems: (InternalLink | ExternalLink)[];
  let licenseItems: LicenseItem[];

  beforeEach(() => {
    socialMedia = createSocialMedia();
    menuItems = createLinks();
    licenseItems = [createLicenseItem()];

    spectator = createComponent({
      props: {
        socialMedia,
        menuItems,
        licenseItems,
      },
    });
    component = spectator.component;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('social media links', () => {
    let soMeComponent: SocialMediaComponent | null;

    beforeEach(() => {
      soMeComponent = spectator.query(SocialMediaComponent);
    });

    it('should be rendered using the app-social-media component', () => {
      expect(soMeComponent).not.toBeNull();
    });

    it('should bind the social media links to the "socialMedia"-input of component', () => {
      expect(soMeComponent?.socialMedia).toEqual(socialMedia);
    });
  });

  describe('navigation links', () => {
    let navComponent: NavigationListComponent | null;

    beforeEach(() => {
      navComponent = spectator.query(NavigationListComponent);
    });

    it('should be rendered using the app-navigation-list component', () => {
      expect(navComponent).not.toBeNull();
    });

    it('should bind the menu items to the "menuItems"-input of component', () => {
      expect(navComponent?.menuItems).toEqual(menuItems);
    });
  });

  describe('copyright links', () => {
    let links: HTMLAnchorElement[];

    beforeEach(() => {
      links = spectator.queryAll('.copyright a');
    });

    it('should render two links per license item', () => {
      expect(links).toHaveLength(2);
    });

    it('should render links that targets a new window (or tab)', () => {
      links.forEach((link) => expect(link.target).toBe('_blank'));
    });

    describe('item link', () => {
      it('should render the name of the item that\'s being licensed, with title case', () => {
        const link = spectator.query('.copyright a.item');
        expect(link).toHaveText('Header Image');
      });

      it('should link to where the item was obtained', () => {
        const link = spectator.query('.copyright a.item') as HTMLAnchorElement;
        expect(link.href).toEqual(licenseItems[0].url);
      });
    });

    describe('license link', () => {
      it('should render the name of the license', () => {
        const link = spectator.query('.copyright .license a');
        expect(link).toHaveText(licenseItems[0].licenseType as string);
      });

      it('should link to where the details of the license can be read', () => {
        const link = spectator.query(
          '.copyright .license a'
        ) as HTMLAnchorElement;
        expect(link.href).toEqual(licenseItems[0].licenseUrl as string);
      });
    });
  });
});
