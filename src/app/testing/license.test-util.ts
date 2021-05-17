import { OpenSourceLicense, SiteLicense } from '../models/license.model';
import { LicenseItem } from '../models/license-info.model';

export const createOpenSourceLicense = (
  seed: Partial<OpenSourceLicense> = {}
): OpenSourceLicense => ({
  type: 'oss',
  spdx: 'MIT',
  name: 'The MIT License',
  url: 'https://opensource.org/licenses/MIT',
  ...seed,
});

export const createSiteLicense = (
  seed: Partial<SiteLicense> = {}
): SiteLicense => ({
  type: 'site',
  name: 'Simplified Pixabay License',
  site: 'pixabay',
  url: 'https://pixabay.com/da/service/license/',
  ...seed,
});

export const createLicenseItem = (
  seed: Partial<LicenseItem> = {}
): LicenseItem => ({
  forItem: 'header image',
  from: 'pixabay',
  url:
    'https://pixabay.com/da/illustrations/univers-himmel-stjerner-rum-kosmos-1566159/',
  licenseUrl: 'https://pixabay.com/da/service/license/',
  licenseType: 'Simplified Pixabay License',
  ...seed,
});
