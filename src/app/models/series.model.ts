export interface SeriesPostReference {
  title: string;
  published_date: Date;
  route: string;
}

export interface Series {
  title: string;
  previous?: SeriesPostReference;
  next?: SeriesPostReference;
}
