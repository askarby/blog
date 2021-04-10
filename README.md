# Blog

This is a re-work of my blog, now implemented in Angular, using Scully.io.

## Checklist

This is the checklist of action items remaining, for the blog to function as expected

In progress:

- [ ] Integration with front-matter on blog posts (missing header etc.)

Still missing:

- [ ] Blog listings page
  - [ ] Listing all posts in reverse-order (newest first, oldest last)
  - [ ] Dynamically group
    - Based on number of posts within a time-period, group on these, eg. if 10 posts in a year then group by year, if > 10 in a year then group by month!
- [ ] Home (welcome) page
- [ ] About page
- [ ] Setting up github actions for deploying blog
- [ ] Documentation of how the development environment is working
- [ ] Unit tests - writing the actual tests
- [ ] E2E tests
  - [ ] Setting up Cypress
  - [ ] Writing the actual tests
- [ ] Linting markdown files (checking that front-matter contains required things)

Completed items:

- [x] Initial setup of blog seems to work now.
- [x] Blog posts are visible (and rendered correctly)
- [x] Top-bar navigation is working
- [x] Side-bar navigation is working, albeit missing styling.
