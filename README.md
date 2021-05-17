# Blog

This is a re-work of my blog, now implemented in Angular, using Scully.io.

## Checklist

This is the checklist of action items remaining, for the blog to function as expected

In progress:

- [ ] Documentation of how the development environment is working

Still missing:

- [ ] Home (welcome) page
- [ ] Unit tests - writing the actual tests
  - This is "catching up" on initial "things" that have no tests
    - New functionality should have tests (since we're out of the "starting project"-phase)
  - Don't go overboard (pls!)
- [ ] E2E tests
  - [ ] Setting up Cypress
  - [ ] Writing the actual tests
- [ ] Search-functionality
- [ ] Linting markdown files (checking that front-matter contains required things)
- [ ] Github actions
  - [ ] Run unit tests
  - [ ] Run E2E tests
  - [ ] Deploy to github pages
- [ ] Analytics (tracking)
  - [ ] Actual integration configuration
  - [ ] Cookie consent

Completed items:

- [x] Footer
- [x] Copyright
  - Source code -> open source (MIT licensed?)
  - Content and images -> other license
- [x] Initial setup of blog seems to work now.
- [x] Blog posts are visible (and rendered correctly)
- [x] Top-bar navigation is working
- [x] Side-bar navigation is working, albeit missing styling.
- [x] Integration with front-matter on blog posts (missing header etc.)
- [x] Blog listings page
  - [x] Listing all posts in reverse-order (newest first, oldest last)
  - [x] Dynamically group
    - Based on number of posts within a time-period, group on these, eg. if 10 posts in a year then group by year, if > 10 in a year then group by month!
- [x] About page
