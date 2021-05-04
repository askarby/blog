/* eslint-disable @typescript-eslint/naming-convention */
import { Observable, of } from 'rxjs';
import {
  GroupedPosts,
  GroupedPostsByYear,
  GroupedPostsByYearAndMonth,
} from '../../models/grouped-posts.model';
import { groupPosts } from './group-posts.operator';
import { Month } from '../../models/month.model';
import { Post } from '../../models/post.model';
import { addCopiesWithYears, createPost } from '../../testing/post.test-utils';
import { dateOfYear } from '../../testing/date.test-utils';

describe('groupPosts operator', () => {
  const splitAt = 2;

  describe('given an empty array of Posts', () => {
    it('should return an empty array (of PostGroups)', (done) => {
      of([])
        .pipe(groupPosts())
        .subscribe((grouped) => {
          expect(grouped).toEqual([]);
          done();
        });
    });
  });

  describe('given an array of Posts, not exceeding limit to group by month', () => {
    let posts: Post[];
    let posts$: Observable<GroupedPosts[]>;

    beforeEach(() => {
      posts = [
        dateOfYear(2021).withoutTime().withMonth('apr').withDay(1),
        dateOfYear(2021).withoutTime().withMonth('apr').withDay(20),
        dateOfYear(2021).withoutTime().withMonth('feb').withDay(3),
        dateOfYear(2021).withoutTime().withMonth('aug').withDay(16),
        dateOfYear(2021).withoutTime().withMonth('aug').withDay(19),
      ].map((builder) =>
        createPost({
          title: builder.toString('date'),
          published_date: builder.build(),
        })
      );

      posts$ = of(posts).pipe(
        groupPosts({
          splitAt,
        })
      );
    });

    it('should produce a single group (by year, without any subgroups), with all posts', (done) => {
      posts$.subscribe((grouped) => {
        expect(grouped).toHaveLength(1);
        expect(grouped[0].type).toBe('by-year');
        expect(grouped[0].year).toBe(2021);
        const yearsPosts = (grouped[0] as GroupedPostsByYear).posts;
        expect(yearsPosts.length).toBe(5);
        done();
      });
    });

    it('should return a group, where Posts are sorted by date (latest first)', (done) => {
      posts$.subscribe((grouped) => {
        const yearsPosts = (grouped[0] as GroupedPostsByYear).posts;
        const titles = yearsPosts.map((post) => post.title);
        expect(titles).toStrictEqual([
          'August 19th, 2021',
          'August 16th, 2021',
          'April 20th, 2021',
          'April 1st, 2021',
          'February 3rd, 2021',
        ]);
        done();
      });
    });

    describe('multiple years of posts', () => {
      beforeEach(() => {
        posts = addCopiesWithYears(posts, 2022);
        posts$ = of(posts).pipe(
          groupPosts({
            splitAt,
          })
        );
      });

      it('should produce multiple groups (by year, without any subgroups)', (done) => {
        posts$.subscribe((grouped) => {
          expect(grouped).toHaveLength(2);

          expect(grouped[0]).toEqual(
            expect.objectContaining({
              type: 'by-year',
              year: 2022,
            })
          );
          const postsOf2022 = (grouped[0] as GroupedPostsByYear).posts;
          expect(postsOf2022).toHaveLength(5);

          expect(grouped[1]).toEqual(
            expect.objectContaining({
              type: 'by-year',
              year: 2021,
            })
          );
          const postsOf2021 = (grouped[1] as GroupedPostsByYear).posts;
          expect(postsOf2021).toHaveLength(5);
          done();
        });
      });

      it('should return groups, where Groups and Posts are sorted by date (latest first)', (done) => {
        posts$.subscribe((grouped) => {
          const postsOf2022 = (grouped[0] as GroupedPostsByYear).posts;
          const titlesOf2022 = postsOf2022.map((post) => post.title);
          expect(titlesOf2022).toStrictEqual([
            'August 19th, 2022',
            'August 16th, 2022',
            'April 20th, 2022',
            'April 1st, 2022',
            'February 3rd, 2022',
          ]);

          const postsOf2021 = (grouped[1] as GroupedPostsByYear).posts;
          const titlesOf2021 = postsOf2021.map((post) => post.title);
          expect(titlesOf2021).toStrictEqual([
            'August 19th, 2021',
            'August 16th, 2021',
            'April 20th, 2021',
            'April 1st, 2021',
            'February 3rd, 2021',
          ]);
          done();
        });
      });
    });
  });

  describe('given an array of Posts, exceeding limit to group by month', () => {
    let posts: Post[];
    let posts$: Observable<GroupedPosts[]>;

    beforeEach(() => {
      posts = [
        dateOfYear(2021).withoutTime().withMonth('apr').withDay(1),
        dateOfYear(2021).withoutTime().withMonth('apr').withDay(20),
        dateOfYear(2021).withoutTime().withMonth('apr').withDay(3),
        dateOfYear(2021).withoutTime().withMonth('feb').withDay(3),
        dateOfYear(2021).withoutTime().withMonth('aug').withDay(16),
        dateOfYear(2021).withoutTime().withMonth('aug').withDay(19),
      ].map((builder) =>
        createPost({
          title: builder.toString('date'),
          published_date: builder.build(),
        })
      );

      posts$ = of(posts).pipe(
        groupPosts({
          splitAt,
        })
      );
    });

    it('should produce a single group (by year), with posts split (by month) into sub groups', (done) => {
      posts$.subscribe((grouped) => {
        expect(grouped).toHaveLength(1);
        expect(grouped[0].type).toBe('by-year-and-month');
        expect(grouped[0].year).toBe(2021);

        const byYear = grouped[0] as GroupedPostsByYearAndMonth;
        expect(byYear.subgroups).toHaveLength(3);
        done();
      });
    });

    it('should return a sub group, where Posts are grouped by month and sorted by date (latest first)', (done) => {
      posts$.subscribe((grouped) => {
        const subGroups = (grouped[0] as GroupedPostsByYearAndMonth).subgroups;

        expect(subGroups[0].month).toEqual(Month.august);
        let titles = subGroups[0].posts.map((post) => post.title);
        expect(titles).toStrictEqual([
          'August 19th, 2021',
          'August 16th, 2021',
        ]);

        expect(subGroups[1].month).toEqual(Month.april);
        titles = subGroups[1].posts.map((post) => post.title);
        expect(titles).toStrictEqual([
          'April 20th, 2021',
          'April 3rd, 2021',
          'April 1st, 2021',
        ]);

        expect(subGroups[2].month).toEqual(Month.february);
        titles = subGroups[2].posts.map((post) => post.title);
        expect(titles).toStrictEqual(['February 3rd, 2021']);

        done();
      });
    });

    describe('multiple years of posts', () => {
      beforeEach(() => {
        posts = addCopiesWithYears(posts, 2022);
        posts$ = of(posts).pipe(
          groupPosts({
            splitAt,
          })
        );
      });

      it('should produce multiple groups (by year, with subgroups)', (done) => {
        posts$.subscribe((grouped) => {
          expect(grouped).toHaveLength(2);
          expect(grouped[0].type).toBe('by-year-and-month');
          expect(grouped[0].year).toBe(2022);
          const byYear2022 = grouped[0] as GroupedPostsByYearAndMonth;
          expect(byYear2022.subgroups).toHaveLength(3);

          expect(grouped[1].type).toBe('by-year-and-month');
          expect(grouped[1].year).toBe(2021);
          const byYear2021 = grouped[1] as GroupedPostsByYearAndMonth;
          expect(byYear2021.subgroups).toHaveLength(3);

          done();
        });
      });

      it('should return groups, where Groups, Subgroups and Posts are sorted by date (latest first)', (done) => {
        posts$.subscribe((grouped) => {
          // 2022
          const subGroups2022 = (grouped[0] as GroupedPostsByYearAndMonth)
            .subgroups;
          expect(subGroups2022[0].month).toEqual(Month.august);
          let titles = subGroups2022[0].posts.map((post) => post.title);
          expect(titles).toStrictEqual([
            'August 19th, 2022',
            'August 16th, 2022',
          ]);

          expect(subGroups2022[1].month).toEqual(Month.april);
          titles = subGroups2022[1].posts.map((post) => post.title);
          expect(titles).toStrictEqual([
            'April 20th, 2022',
            'April 3rd, 2022',
            'April 1st, 2022',
          ]);

          expect(subGroups2022[2].month).toEqual(Month.february);
          titles = subGroups2022[2].posts.map((post) => post.title);
          expect(titles).toStrictEqual(['February 3rd, 2022']);

          // 2021
          const subGroups2021 = (grouped[1] as GroupedPostsByYearAndMonth)
            .subgroups;
          expect(subGroups2021[0].month).toEqual(Month.august);
          titles = subGroups2021[0].posts.map((post) => post.title);
          expect(titles).toStrictEqual([
            'August 19th, 2021',
            'August 16th, 2021',
          ]);

          expect(subGroups2021[1].month).toEqual(Month.april);
          titles = subGroups2021[1].posts.map((post) => post.title);
          expect(titles).toStrictEqual([
            'April 20th, 2021',
            'April 3rd, 2021',
            'April 1st, 2021',
          ]);

          expect(subGroups2021[2].month).toEqual(Month.february);
          titles = subGroups2021[2].posts.map((post) => post.title);
          expect(titles).toStrictEqual(['February 3rd, 2021']);

          done();
        });
      });
    });
  });
});
