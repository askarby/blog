import { OpenSourceLicense, SiteLicense } from '../../models/license.model';

export const openSourceLicenses: OpenSourceLicense[] = [
  {
    type: 'oss',
    spdx: 'Apache-2.0',
    name: 'Apache License, Version 2.0',
    url: 'https://opensource.org/licenses/Apache-2.0',
  },
  {
    type: 'oss',
    spdx: 'BSD-3-Clause',
    name: 'The 3-Clause BSD License',
    url: 'https://opensource.org/licenses/BSD-3-Clause',
  },
  {
    type: 'oss',
    spdx: 'BSD-2-Clause',
    name: 'The 2-Clause BSD License',
    url: 'https://opensource.org/licenses/BSD-2-Clause',
  },
  {
    type: 'oss',
    spdx: 'GPL-3.0-only',
    name: 'GNU General Public License version 3',
    url: 'https://opensource.org/licenses/GPL-3.0',
  },
  {
    type: 'oss',
    spdx: 'GPL-2.0',
    name: 'GNU General Public License version 2',
    url: 'https://opensource.org/licenses/GPL-2.0',
  },
  {
    type: 'oss',
    spdx: 'LGPL-3.0',
    name: 'GNU Lesser General Public License version 3\n',
    url: 'https://opensource.org/licenses/LGPL-3.0',
  },
  {
    type: 'oss',
    spdx: 'LGPL-2.1',
    name: 'GNU Lesser General Public License, version 2.1',
    url: 'https://opensource.org/licenses/LGPL-2.1',
  },
  {
    type: 'oss',
    spdx: 'LGPL-2.0',
    name: 'GNU Library General Public License, version 2',
    url: 'https://opensource.org/licenses/LGPL-2.0',
  },
  {
    type: 'oss',
    spdx: 'MIT',
    name: 'The MIT License',
    url: 'https://opensource.org/licenses/MIT',
  },
  {
    type: 'oss',
    spdx: 'MPL-2.0',
    name: 'Mozilla Public License 2.0',
    url: 'https://opensource.org/licenses/MPL-2.0',
  },
  {
    type: 'oss',
    spdx: 'CDDL-1.0',
    name: 'Common Development and Distribution License 1.0',
    url: 'https://opensource.org/licenses/CDDL-1.0',
  },
  {
    type: 'oss',
    spdx: 'EPL-2.0',
    name: 'Eclipse Public License version 2.0',
    url: 'https://opensource.org/licenses/EPL-2.0',
  },
];

export const siteLicenses: SiteLicense[] = [
  {
    type: 'site',
    name: 'Simplified Pixabay License',
    site: 'pixabay',
    url: 'https://pixabay.com/da/service/license/',
  },
  {
    type: 'site',
    name: 'Font Awesome Free License',
    site: 'fontawesome',
    url: 'https://fontawesome.com/license/free',
  },
];
