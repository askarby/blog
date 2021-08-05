# Blog

This is a re-work of my blog, now implemented in [Angular][angular], using [Scully.io][scully].

## Setting up the development environment

1. Clone the repository

```bash
git clone https://github.com/askarby/blog
```

2. Install dependencies

```bash
npm install
```

3. Open the repository in your favorite editor / IDE, and **start coding**!

**Pro-tip**: You can get additional information about available [scripts](#scripts) by consulting the [Scripts](#scripts)-section below!

### VCS guide-lines

All commit messages, made to this project, are to follow the conventions set by [Conventional Commits][conventional-commits].

Linting has been configured on the `commit-msg` [Git hook][git-hooks], hence you shouldn't be able to break these conventions,
unless you commit with the `--no-verify`-flag (which is highly discouraged).

(yes, initial commits of this repository didn't follow these guide-lines, hence you'll see some commit messages that
did not follow these conventions, but these are limited to early commits in the repository)

#### Configured git hooks

This blog has a couple of git hooks configured. These git hooks exist to get a quick feedback loop. By-passing the hooks will not let you
break any rules, as the same checks are enforced by the CI.

The list of configured git hooks are as follows:

| Git Hook     | Configured behavior                                                                                        |
| ------------ | ---------------------------------------------------------------------------------------------------------- |
| `commit-msg` | Performs linting of commit messages, based on the convention: [Conventional Commits][conventional-commits] |
| `pre-commit` | Lints all staged files                                                                                     |
| `pre-push`   | Executes all unit test (E2E tests are not included in this, but they **are** run on the CI!)               |

### Tooling

This blog uses the following libraries and tools (not a complete list, by any means):

| Tool                   | Purpose (provides)                                                                           |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| [Angular][angular]     | As a base-technology, for providing the basic building blogs for the SPA, making up the blog |
| [Scully.io][scully]    | Provides the bridge for [Angular][angular] to enable [Jamstack][jamstack]                    |
| [Prettier][prettier]   | To avoid concerning myself with code-formatting                                              |
| [Stylelint][stylelint] | To performing linting on SCSS-files (**NOTE**: this has not been implemented yet)            |
| [Husky][husky]         | Provides the bridge for easily installing [git] hooks                                        |
| [ESLint][eslint]       | To avoid concerning myself with code issues that can be prevented by static analysis         |
| [lint-staged]          | To perform incremental linting on [git]'s `pre-commit` hook                                  |
| [Cypress.io][cypress]  | For testing the blog "on the glass" (E2E-test), without having too bad a time                |
| [Jest][jest]           | For unit testing (quickly, in a virtual DOM)                                                 |
| [commitlint]           | For linting commit messages (to adhere to [Conventional Commits][conventional-commits]       |

### Scripts

This is a list of scripts that you should know about, when you're developing on the blog.

The scripts are run using `npm run <script name>` (where you substitute `<script name>` with a script from the table below)

| Script name         | Description                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------- |
| `build`             | Makes a build of the Angular application (in `dev`-mode)                                          |
| `build:prod`        | Makes a build of the Angular application (in `prod`-mode)                                         |
| `clean`             | Cleans any output from the build scripts, and removes the discovered scully routes (file)         |
| `dist`              | Does a clean complete distribution build of the blog                                              |
| `e2e`               | Runs all the E2E tests (none, at the current moment)                                              |
| `lint`              | Performs linting of the project                                                                   |
| `start`             | Runs the Angular development server (accessible from port `4200`)                                 |
| `scully:serve`      | Runs the scully development server (static content @ port ``)                                     |
| `scully:full-build` | Does a clean complete build of the blog                                                           |
| `test`              | Run all the unit tests (once)                                                                     |
| `test:serve`        | Run all the unit tests, and watch for file changes to trigger another test-run (interactive mode) |

**NOTE:** This is only a subset of the available scripts, for a complete list, have a look at the
`scripts`-section of the `package.json`-file.

### CI

**TODO**: Write about the "GitHub actions"-setup, when this has been implemented!

## Blog content

Writing a blog-post is a process involving a few steps, these include:

**TODO**: Write steps required to write a new blog post

## Checklist

This is the checklist of action items remaining, for the blog to function as expected

In progress:

- [ ] Add ability to discard side-nav by clicking upon "content"

Still missing:

- [ ] Search-functionality
- [ ] E2E tests
  - [ ] Setting up Cypress
  - [ ] Writing the actual tests
- [ ] Linting markdown files (checking that front-matter contains required things)
- [ ] Github actions
  - [ ] Run unit tests
  - [ ] Run E2E tests
  - [ ] Deploy to github pages
- [ ] Indication of "which post is new"
  - Display it with "a badge"
  - New posts are "released less than a month ago"
    - Based on Browser's (device's) date
    - "A month" is read from environment (hence, adjustable)
  - Show on "blog listings"-page
  - Show on "Home (welcome)"-page
- [ ] Clean-up / refactor SCSS-styles
  - Loads of repeated code, in regard to layout (copy and pasted between Component's SCSS-files)
  - Add stylelint for linting!
- [ ] Mark posts to "read later"

Completed items:

- [x] Analytics (tracking)
  - [x] Actual integration configuration
  - [x] Cookie consent
    - https://www.osano.com/cookieconsent/documentation/javascript-api/
    - https://github.com/osano/cookieconsent/
    - https://stackoverflow.com/questions/60173853/how-to-set-the-google-analytics-cookie-only-after-another-consent-cookie-is-set
- [x] Upgrade to Angular 12 (and newest version of Scully)
- [x] Unit tests - writing the actual tests
  - This is "catching up" on initial "things" that have no tests
    - New functionality should have tests (since we're out of the "starting project"-phase)
  - Don't go overboard (pls!)
- [x] Home (welcome) page
- [x] Fix issue with mobile layout (header) of "About"-page
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
- [x] Documentation of how the development environment is working

<!-- External links / references -->

[angular]: https://angular.io/
[scully]: https://scully.io/
[prettier]: https://prettier.io/
[stylelint]: https://stylelint.io/
[husky]: https://typicode.github.io/husky/#/
[eslint]: https://eslint.org/
[lint-staged]: https://github.com/okonet/lint-staged
[cypress]: https://www.cypress.io/
[jamstack]: https://jamstack.org/
[git]: https://git-scm.com/
[jest]: https://jestjs.io/
[commitlint]: https://github.com/conventional-changelog/commitlint
[conventional-commits]: https://www.conventionalcommits.org
[git-hooks]: https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks
