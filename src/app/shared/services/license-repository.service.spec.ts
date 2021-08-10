import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { LicenseRepositoryService } from './license-repository.service';
import { OpenSourceLicense, SiteLicense } from '../../models/license.model';

jest.mock('fuse.js', () => {
  let lastScore = 0.1;
  let mockNo = 0;
  const mock = jest.fn().mockImplementation(() => {
    const mockName = `mock:${mockNo++}`;

    return {
      search: jest.fn().mockImplementation((query: string) => [
        {
          score: (lastScore += 0.1),
          item: {
            type: 'oss',
            name: `[${mockName}] name:${query}`,
            url: `[${mockName}] url:${query}`,
            spdx: `[${mockName}] spdx:${query}`,
          } as OpenSourceLicense,
        },
        {
          score: (lastScore += 0.1),
          item: {
            type: 'site',
            name: `[${mockName}] name:${query}`,
            url: `[${mockName}] url:${query}`,
            site: `[${mockName}] site:${query}`,
          } as SiteLicense,
        },
      ]),
    };
  });
  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    default: mock,
  };
});

describe('LicenseRepositoryService', () => {
  const createService = createServiceFactory({
    service: LicenseRepositoryService,
  });
  let spectator: SpectatorService<LicenseRepositoryService>;
  let service: LicenseRepositoryService;

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getLicense', () => {
    it('should return result with lowest score', () => {
      const result = service.getLicense('something');
      const expected = {
        name: '[mock:3] name:something',
        spdx: '[mock:3] spdx:something',
        type: 'oss',
        url: '[mock:3] url:something',
      };
      expect(result).toEqual(expected);
    });
  });
});
