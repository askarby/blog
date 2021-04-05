export interface Link {
  type: 'internal' | 'external';
  title: string;
  theme: string;
}

export interface InternalLink extends Link {
  type: 'internal';
  urlTree: string[];
}

export interface ExternalLink extends Link {
  type: 'external';
  url: string;
}
