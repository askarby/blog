export interface License {
  type: 'oss' | 'site';
  name: string;
  url: string;
}

export interface OpenSourceLicense extends License {
  type: 'oss';
  spdx: string;
}

export interface SiteLicense extends License {
  type: 'site';
  site: string;
}
