---
title: The best of plans
description: I had a great plan, to write a blog series... but a codebase that hadn't been maintained for two year changed that
image: "2023/2023-06-25-best-of-plans.jpg"
category: "convention"
tags: "angular upgrade scully plans"
twitter_text: skarby.info an blog post on plans and upgrades
introduction: Making a plan, and reality hitting hard
published: true
published_date: 2023-06-07
licenses:
  - forItem: "post image, sign"
    from: "pixabay"
    url: "https://pixabay.com/photos/black-board-chalk-traces-school-1072366/"
  - forItem: "post image, road"
    from: "pixabay"
    url: "https://pixabay.com/da/vectors/asfalt-k%C3%B8re-vej-motorvej-overalt-157687/"
---

I had a great plan, I'd want to write a series of blog posts and (finally) had the energy and courage to do so, but
everything didn't go according to plan. This post will be about my struggle starting to write on my blog again, after
a hiatus lasting a couple of years - and what made me fail my first attempt.

# Maintain your code base

I last wrote on my blog at the end of 2021, and then nothing more happened. I mean, life happened... I changed freelance
contracts etc - but nothing happened in regards to my blog. Now, almost 2 years later I decide to change that, but when I
tried starting my blog, I failed to install node.js dependencies. I was simply greeted by a slurry of warning messages,
including (but not limited to), `old lockfile`, `EBADENGINE` and deprecation warnings followed by the error message:

```text
npm ERR! code 1
npm ERR! path /Users/askarby/Projects/blog/node_modules/puppeteer
npm ERR! command failed
npm ERR! command sh -c -- node install.js
npm ERR! The chromium binary is not available for arm64:
npm ERR! If you are on Ubuntu, you can install with:
npm ERR!
npm ERR!  apt-get install chromium-browser
npm ERR!
npm ERR! /Users/askarby/Projects/blog/node_modules/puppeteer/lib/cjs/puppeteer/node/BrowserFetcher.js:112
npm ERR!             throw new Error();
npm ERR!             ^
npm ERR!
npm ERR! Error
npm ERR!     at /Users/askarby/Projects/blog/node_modules/puppeteer/lib/cjs/puppeteer/node/BrowserFetcher.js:112:19
npm ERR!     at FSReqCallback.oncomplete (node:fs:207:21)
npm ERR!
npm ERR! Node.js v18.13.0
```

This indicated that it was not possible to install chromium, since it was not available for the current machine architecture.
I will gladly admit that it took me a couple of seconds before I figured out how that could be. Back when I last wrote a blog
entry, I had an older MacBook, which was Intel-based - now, I'm writing on a MacBook based on the Apple M1 architecture.

Not to worry, since looking at the `EBADENGINE` warnings (one of them below):

```text
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: '@angular-devkit/architect@0.1202.0',
npm WARN EBADENGINE   required: {
npm WARN EBADENGINE     node: '^12.14.1 || >=14.0.0',
npm WARN EBADENGINE     npm: '^6.11.0 || ^7.5.6',
npm WARN EBADENGINE     yarn: '>= 1.13.0'
npm WARN EBADENGINE   },
npm WARN EBADENGINE   current: { node: 'v18.13.0', npm: '8.19.3' }
npm WARN EBADENGINE
```

there was a mismatch between the supported [Node.js][nodejs] version, and that version I was currently running.

So, there was a need to upgrade [Scully][scully], in the hope that it now depended on a newer version of puppeteer (and in tern supported
Apple's M1 architecture), and hopefully that would involve supporting a newer [Node.js][nodejs] version as well.

# Upgrading Angular is Easy

Furtunateley, upgrading Angular is as easy as issuing (according to the [Angular Upgrade Guide](https://update.angular.io/?v=12.0-16.0)):

```sh
ng update @angular/core@13 @angular/cli@13
```

... and then repeating the command for every version (I had to upgrade from v. 12.2 -> 16). This was however not as easy as implied, since
the terminal then gave the following feedback:

```sh
Workspace extension with invalid name (defaultProject) found.
The installed Angular CLI version is outdated.
Installing a temporary Angular CLI versioned 13.3.11 to perform the update.
✔ Packages successfully installed.
Using package manager: 'npm'
Collecting installed dependencies...
Found 0 dependencies.
Package '@angular/core' is not a dependency.
```

The issue being that due to puppeteer requiring an incompatible version of chromium, no dependencies was being installed. I'm sure I could have
force installed the dependency to proceed, but not being able to test each intermediate upgraded version - I didn't do that.

# Doing it the hard way

So instead, I did the following:

First, I needed to upgrade my [Node.js][nodejs] installation to the latest version (at the time being 18.16.0), this was a simply task of typing:

```sh
nvm install 18.16 --reinstall-packages-from=current
```

this however only works since I use [nvm][nvm].

Next up, it's a matter of deleting the `package-lock.json`-file, and tweaking the versions of the respective packages. Searching
[npmjs.com](https://www.npmjs.com/) I found (at the time of writing):

| Package   | Version                                                         |
| --------- | --------------------------------------------------------------- |
| Scully.io | [2.4.1](https://www.npmjs.com/package/@scullyio/scully)         |
| Angular   | [Version compatibility page](https://angular.io/guide/versions) |

This resulted in me updating my `dependencies` as follows:

| Dependency                           | From      | To        |
| ------------------------------------ | --------- | --------- |
| `@angular/animations`                | `~12.2.0` | `~16.0.4` |
| `@angular/common`                    | `~12.2.0` | `~16.0.4` |
| `@angular/compiler`                  | `~12.2.0` | `~16.0.4` |
| `@angular/core`                      | `~12.2.0` | `~16.0.4` |
| `@angular/forms`                     | `~12.2.0` | `~16.0.4` |
| `@angular/platform-browser`          | `~12.2.0` | `~16.0.4` |
| `@angular/platform-browser-dynamic`  | `~12.2.0` | `~16.0.4` |
| `@angular/router`                    | `~12.2.0` | `~16.0.4` |
| `@fortawesome/angular-fontawesome`   | `^0.8.2`  | `^0.13.0` |
| `@fortawesome/fontawesome-svg-core`  | `^1.2.35` | `^6.4.0`  |
| `@fortawesome/free-brands-svg-icons` | `^5.15.3` | `^6.4.0`  |
| `@fortawesome/free-solid-svg-icons ` | `^5.15.2` | `^6.4.0`  |
| `@scullyio/init`                     | `^1.1.4`  | `^2.1.41` |
| `@scullyio/ng-lib`                   | `^1.1.1`  | `^2.1.41` |
| `@scullyio/scully`                   | `^1.1.1`  | `^2.1.41` |
| `rxjs`                               | `~6.6.0`  | `~7.8.1`  |
| `zone.js`                            | `~0.11.4` | `~0.13.0` |

... and updating my `devDependencies` as follows:

| Dependency                               | From      | To         |
| ---------------------------------------- | --------- | ---------- |
| `@angular-builders/jest`                 | `12.1.0`  | `16.0.0`   |
| `@angular-devkit/build-angular`          | `~12.2.0` | `~16.0.4`  |
| `@angular-eslint/builder`                | `^12.3.1` | `^16.0.3`  |
| `@angular-eslint/eslint-plugin`          | `^12.3.1` | `^16.0.3`  |
| `@angular-eslint/eslint-plugin-template` | `^12.3.1` | `^16.0.3`  |
| `@angular-eslint/schematics`             | `12.3.1`  | `16.0.3`   |
| `@angular-eslint/template-parser`        | `^12.3.1` | `^16.0.3`  |
| `@angular/cli`                           | `~12.2.0` | `~16.0.4`  |
| `@angular/compiler-cli`                  | `~12.2.0` | `~16.0.4`  |
| `@ngneat/spectator`                      | `^8.0.2`  | `^15.0.0`  |
| `@types/jest`                            | `26.0.24` | `29.5.2`   |
| `@types/node`                            | `^14.16`  | `^14.16.0` |
| `@typescript-eslint/eslint-plugin`       | `4.29.0`  | `5.59.8`   |
| `@typescript-eslint/parser`              | `4.29.0`  | `5.59.8`   |
| `eslint`                                 | `^7.32.0` | `^8.42.0`  |
| `eslint-plugin-import`                   | `2.24.0`  | `2.27.5`   |
| `eslint-plugin-jsdoc`                    | `36.0.6`  | `46.2.0`   |
| `jest`                                   | `27.0.6`  | `29.5.0`   |
| `jest-marbles`                           | `^2.5.1`  | `^3.0.3`   |
| `ng-mocks`                               | `^12.4.0` | `^14.10.1` |
| `sharp`                                  | `^0.28.3` | `^0.32.1`  |
| `ts-node`                                | `~10.2.0` | `~10.9.1`  |
| `typescript`                             | `~4.3.5`  | `~4.9.5`   |

Then installed dependencies, and tried running my blog, as follows:

```sh
npm i
npm start
```

## Compilation errors

This did not result in what I expected (a running piece of software), where as the actual outcome was a bunch of errors:

```text
./src/scss/styles.scss - Error: Module build failed (from ./node_modules/sass-loader/dist/cjs.js):
SassError: Can't find stylesheet to import.
   ╷
15 │ @use '~prismjs/plugins/toolbar/prism-toolbar';
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   ╵
  src/scss/styles.scss 15:1  root stylesheet

./src/scss/styles.scss?ngGlobalStyle - Error: Module build failed (from ./node_modules/mini-css-extract-plugin/dist/loader.js):
HookWebpackError: Module build failed (from ./node_modules/sass-loader/dist/cjs.js):
SassError: Can't find stylesheet to import.
   ╷
15 │ @use '~prismjs/plugins/toolbar/prism-toolbar';
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   ╵
  src/scss/styles.scss 15:1  root stylesheet
```

This was easily solved, by changing the `@use '~prismjs/plugins/toolbar/prism-toolbar';` to `@use 'prismjs/plugins/toolbar/prism-toolbar';`.

```text
Error: src/app/cookie-consent/cookie-consent-bar/cookie-consent-bar.component.ts:39:19 - error TS2554: Expected 1 arguments, but got 0.

39     this.destroy$.next();
                     ~~~~~~

  node_modules/rxjs/dist/types/internal/Subject.d.ts:32:10
    32     next(value: T): void;
                ~~~~~~~~
    An argument for 'value' was not provided.


Error: src/app/home/new-posts/new-posts.component.ts:42:19 - error TS2554: Expected 1 arguments, but got 0.

42     this.destroy$.next();
                     ~~~~~~

  node_modules/rxjs/dist/types/internal/Subject.d.ts:32:10
    32     next(value: T): void;
                ~~~~~~~~
    An argument for 'value' was not provided.


Error: src/app/home/new-posts/new-posts.component.ts:48:19 - error TS2554: Expected 1 arguments, but got 0.

48     this.destroy$.next();
                     ~~~~~~

  node_modules/rxjs/dist/types/internal/Subject.d.ts:32:10
    32     next(value: T): void;
                ~~~~~~~~
    An argument for 'value' was not provided.
```

This was easily resolved by passing `null` to all `next`-method invocations (which would most likely have been automatically solved, if able to
run the `ng update`-command).

## Making tests pass

Next up, I wanted to see if my tests would still pass, simply by running:

```sh
npm test
```

Unfortunately, that was not a successfull outcome, since by terminal displayed:

```text
Error: Schema validation failed with the following errors:
  Data path "/polyfills" must be array.
```

The fix to this issue was simply to wrap the entries of the `polyfills` property to an array (located in the `angular.json`-file, at the path
`/projects/<project name>/architect/test/options/polyfills`). Making those modifications, and re-running the tests, I now got the output (well, I got
multiple similar errors, so this is just one of them):

```text
 FAIL  src/app/shared/utilities/array.utility.spec.ts
  ● Test suite failed to run

    Jest encountered an unexpected token

    Jest failed to parse a file. This happens e.g. when your code or its dependencies use non-standard JavaScript syntax, or when Jest is not configured to support such syntax.

    Out of the box Jest supports Babel, which will be used to transform your files into valid JS based on your Babel configuration.

    By default "node_modules" folder is ignored by transformers.

    Here's what you can do:
     • If you are trying to use ECMAScript Modules, see https://jestjs.io/docs/ecmascript-modules for how to enable it.
     • If you are trying to use TypeScript, see https://jestjs.io/docs/getting-started#using-typescript
     • To have some of your "node_modules" files transformed, you can specify a custom "transformIgnorePatterns" in your config.
     • If you need a custom transformation specify a "transform" option in your config.
     • If you simply want to mock your non-JS modules (e.g. binary assets) you can stub them out with the "moduleNameMapper" config option.

    You'll find more details and examples of these config options in the docs:
    https://jestjs.io/docs/configuration
    For information about custom transformations, see:
    https://jestjs.io/docs/code-transformation

    Details:

    /Users/askarby/Projects/blog/node_modules/@angular/core/fesm2022/testing.mjs:7
    import { getDebugNode, RendererFactory2 as RendererFactory2$1, InjectionToken as InjectionToken$1, ɵstringify, ɵReflectionCapabilities, Directive, Component, Pipe, NgModule, ɵgetInjectableDef, resolveForwardRef as resolveForwardRef$1, ɵNG_COMP_DEF, ɵRender3NgModuleRef, ApplicationInitStatus, LOCALE_ID as LOCALE_ID$1, ɵDEFAULT_LOCALE_ID, ɵsetLocaleId, ɵRender3ComponentFactory, ɵcompileComponent, ɵNG_DIR_DEF, ɵcompileDirective, ɵNG_PIPE_DEF, ɵcompilePipe, ɵNG_MOD_DEF, ɵtransitiveScopesFor, ɵpatchComponentDefWithScope, ɵNG_INJ_DEF, ɵcompileNgModuleDefs, provideZoneChangeDetection, Compiler, COMPILER_OPTIONS, Injector as Injector$1, ɵisEnvironmentProviders, ɵNgModuleFactory, ModuleWithComponentFactories, ɵconvertToBitFlags, InjectFlags as InjectFlags$1, ɵsetAllowDuplicateNgModuleIdsForTest, ɵresetCompiledComponents, ɵsetUnknownElementStrictMode as ɵsetUnknownElementStrictMode$1, ɵsetUnknownPropertyStrictMode as ɵsetUnknownPropertyStrictMode$1, ɵgetUnknownElementStrictMode as ɵgetUnknownElementStrictMode$1, ɵgetUnknownPropertyStrictMode as ɵgetUnknownPropertyStrictMode$1, EnvironmentInjector as EnvironmentInjector$1, NgZone, ɵflushModuleScopingQueueAsMuchAsPossible } from '@angular/core';
    ^^^^^^

    SyntaxError: Cannot use import statement outside a module

      at Runtime.createScriptFromCode (node_modules/jest-runtime/build/index.js:1495:14)
      at Object.<anonymous> (node_modules/jest-preset-angular/setup-jest.js:2:24)
      at Object.<anonymous> (node_modules/@angular-builders/jest/src/jest-config/setup.ts:1:1)
```

Reading this error message made me quite confused, I had absolutely no idea what was going on... the only thing that came to mind was that "something must be up with the
TypeScript / Jest configuration", to fix that issue I first tried googling for solutions, but nothing positive came of that... so, final decision was to generate a new Angular
project (using v. 16) and then align the configuration files from there.

For more in-depth information, have a look at this [commit](https://github.com/askarby/blog/commit/a2d96a65cbf2009470f1796a7f071eac2342e313).

## CI failing

Next up (because this seemed like it would never come to an end), the CI (being [GitHub Actions](https://github.com/features/actions)) starting complaining about not being able
to build. This was however quite an easy fix, as I just needed to upgrade the runtime to match with the [Node.js][nodejs] version of my development environment.

The change related to that fix can be found in this [commit](https://github.com/askarby/blog/commit/1cb6e7c137f3667062c0e2f00432747c43ece215).

## Jest custom matchers

At this point everything should be working, but it just happened that I now got errors about Jest not recognizing the custom matchers I've implemented. The fix was to ensure that
the type-definition of the matchers recided in their own `d.ts`-file (as per this [change](https://github.com/askarby/blog/blob/a2d96a65cbf2009470f1796a7f071eac2342e313/src/app/testing/matchers/matchers.d.ts)).

This was however not an immediate fix, as I got inspired by a blog post (I unfortunately forgot the link to it) to create my own type defition of the matchers, when I instead
could be using the built-in `CustomMatcher` as found in this [commit](https://github.com/askarby/blog/commit/8f1129d2337aa8466c9021459718950178319bac).

This **almost** fixed the issue, but I kept getting the same "unrecognized matcher"-error - this was fortunately fixed by clearing Jest's cache, eg.:

```sh
jest --clearCache
```

# Lesson learned

So, what's the lesson learned? - Keep your projects updated, or at least ensure that you have an automated tool running that reminds you of keeping your dependencies up-to-date,
such as [Dependabot][dependabot].

Having upgraded on a regular basis (say every 6 months, since [Angular][angular] comes out with a new release approximately every 6 months) would have spared me a lot of time,
and it would have been so much easier, since I could have upgraded using the `ng update` command.

You live and you learn, I guess? `¯\_(ツ)_/¯`.

[scully]: https://scully.io/
[angular]: https://angular.io
[nodejs]: https://nodejs.org/
[nvm]: https://github.com/nvm-sh/nvm
[dependabot]: https://github.com/dependabot
