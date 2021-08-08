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

This blog is build using the [Github actions][github-actions] CI system. This is done on every `push` to the `master`-branch.

You can have a look at the [configuration file](.github/workflows/build-and-deploy-actions.yml)-file for the specific details,
but a (quick) summary of what happens is:

1. Install [Node.js][node] and packages referenced by `package.json`
2. Execute the unit tests
3. Build the [Angular][angular] application
4. Process the build application with [Scully.io][scully] (to generate a static site)
5. Publish the processed site to [Github pages][github-pages]

## Blog content

Writing a blog-post is a process involving a few steps, these include:

1. Create a folder in the `blog`-folder named as the year of the post, eg. `2021`
2. Create a post markdown file, and name it `YYYY-MM-DD-title.md` (substitute the `YYYY-MM-DD` with the actual date)
3. Create a post-header image, preferably with the same name as the post (the image must have the dimensions of 880px x 463px)

**NOTICE:** The thumbnail image is generated by a [Scully.io][scully]-plugin, for further information about custom plugins have a
look at the documentation in the [scully/plugins](scully/plugins)-folder.

## Checklist

This section used to contain a markdown checklist of items "to-do" (but I grew tired of this )

Instead, have a look at "what's going on" in the "Project's kanban board", found here:
https://github.com/askarby/blog/projects/1

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
[github-actions]: https://github.com/features/actions
[node]: https://nodejs.org/en/
[github-pages]: https://pages.github.com/
