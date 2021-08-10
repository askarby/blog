import { Injectable } from '@angular/core';
import Fuse from 'fuse.js';
import {
  License,
  OpenSourceLicense,
  SiteLicense,
} from '../../models/license.model';
import { openSourceLicenses, siteLicenses } from './licenses.data';

@Injectable({
  providedIn: 'root',
})
export class LicenseRepositoryService {
  private openSource: Fuse<OpenSourceLicense>;
  private sites: Fuse<SiteLicense>;

  constructor() {
    this.openSource = new Fuse(openSourceLicenses, {
      includeScore: true,
      keys: ['spdx', 'name'],
    });
    this.sites = new Fuse(siteLicenses, {
      includeScore: true,
      keys: ['site', 'name'],
    });
  }

  getLicense(id: string): License | null {
    if (id === 'public-domain') {
      return {
        type: 'oss',
        name: 'Public Domain',
        url: 'https://fairuse.stanford.edu/overview/public-domain/welcome/',
      };
    }
    const results = [...this.sites.search(id), ...this.openSource.search(id)];
    // We sort by score, 0 is a perfect match, 1 is a complete mismatch!
    const sorted = results.sort((a, b) => Number(a.score) - Number(b.score));
    return sorted[0].item;
  }
}
