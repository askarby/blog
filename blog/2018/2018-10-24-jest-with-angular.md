---
title: "Jest with Angular"
description: A "step-by-step" guide on testing your Angular application with Jest.
image: "2018/jest-angular.jpg"
category: "angular"
tags: "angular jest test"
twitter_text: skarby.info blog post on testing Angular applications with Jest
introduction: A step-by-step tutorial on how-to re-configure an Angular CLI project to use Jest for unit testing.
published: true
published_date: 2018-10-24
legacy_url: jest-with-angular
---

**Update (Oct. 6th, 2019)** I've meant to update this article for quite a while now. I'd simply like to notice that this lengthy guide is not at all
necessary for setting up [Jest](https://jestjs.io/). If all you require is to setup [Jest](https://jestjs.io/), simply use [Briebug's](https://github.com/briebug) [schematic](https://github.com/briebug/jest-schematic)
or go "all in" with [Nrwl's](https://nrwl.io/) [Nx](https://github.com/nrwl/nx). This post does however provide good insight into what "goes on behind the scenes".

## What is Jest?

[Jest](https://jestjs.io/) is a testing framework (including test runner), very similar to [Jasmine](https://jasmine.github.io/). It an has very similar assertion library, has built-in mocking capabilities - but it
doesn't stop there. It aims to be zero-configuration, although that statement is only applicable for testing [React](https://reactjs.org/) applications. Oh, and speaking of [React](https://reactjs.org/);
[React](https://reactjs.org/) is a library made by [Facebook](https://developers.facebook.com/), and so is [Jest](https://jestjs.io/). "But wait, there's more"... [Jest](https://jestjs.io/) comes with built-in code coverage.

So, you'd look at the "feature-galore" above, and say "That's great, but [Angular CLI](https://cli.angular.io/) already does that for me".... and you'd be right, that didn't use to be the case, but the CLI
tooling for [Angular](https://angular.io) has indeed "caught up". But there's still **two things** that [Jest](https://jestjs.io/) beats [Angular CLI](https://cli.angular.io/)'s toolchain at:

**Speed!**

[Jest](https://jestjs.io/) is fast, and that's due to a couple of things:

- The tests are not run in a browser, not even a headless one - it's run in a virtual DOM (using [jsdom](https://github.com/jsdom/jsdom)) - and that makes it blazingly fast.
- Since there's little to no overhead, nor any limitations when using [jsdom](https://github.com/jsdom/jsdom), tests are run in parallel.

**...and Clarity**

- Test failures are reported clearly, and to the point. [Jest](https://jestjs.io/) has one of the best (to my experience, at least) outputs, for explaining what went wrong (and **where** the cause of that is).
- To avoid writing cumbersome test setup-routines, [Jest](https://jestjs.io/) introduces the feature of [Snapshot Testing](https://jestjs.io/docs/en/snapshot-testing.html), to write "no nonsense" tests.

## It's not _too_ difficult!

Before I start out explaining how [Jest](https://jestjs.io/) can be configured to be used for testing [Angular](https://angular.io)-applications, let me refer to a quote:

> “The only real mistake is the one from which we learn nothing.”
> <author style="float: right; margin-top: 1rem;">- Henry Ford</author>

... so why mention that quote? Well, when I first (and that's pretty recently, actually) setup [Jest](https://jestjs.io/) to run with [Angular](https://angular.io), I did it the
"hard way", scouring the web for information on configuring it, hunting solutions to problems encountered.

This has been made a lot easier due to [jest-preset-angular](https://github.com/thymikee/jest-preset-angular) (available as an [NPM package](https://www.npmjs.com/package/jest-preset-angular))
which does all the "hard work" for you. So, even though this tutorial is rather lengthy, it's not difficult to configure, if you follow the steps.

I would be stupid if I didn't learn from my mistakes, so I'll take the easy way round (and give you a good experience in setting up [Jest](https://jestjs.io/) to run
with [Angular](https://angular.io)) - using the [jest-preset-angular](https://github.com/thymikee/jest-preset-angular) package!

## Getting the project

To have a common starting point, I'll be giving you a small Angular application I've created.

The project is a small "Todo list"-application (also known as the "Hello World" of modern web applications), but it's not a trivial implementation. The more involved implementation is given to
provide a real-life scenario. In doing so, the ugly sides of configuring [Jest](https://jestjs.io/) should surface (and we can tackle them, as we go along).

- The Todo items are persistent (lives between browser refreshes) - and are stored / retrieved from the browser's LocalStorage.
- State management is handled by the store implementation given [@ngrx](https://github.com/ngrx/platform)
  - We're using [@ngrx/effects](https://github.com/ngrx/platform/blob/master/docs/effects/README.md) for mediating data to and from LocalStorage (using Actions).
  - We're using [@ngrx/entity](@ngrx/entity) to do an easier reducer implementation.
  - We've included [@ngrx/store-tools](https://github.com/ngrx/platform/blob/master/docs/store-devtools/README.md) to be able to connect with the [Redux DevTools](https://github.com/reduxjs/redux-devtools),
    to get better insight in the action flow (and state reduction) in the browser.
- Tests have been written (initially in [Jasmine](https://jasmine.github.io/)) to cover almost "every bit" of logic in the example application.

**Notice:** Tags exists in the repository, to allow you to "fast travel" to certain parts of the tutorial - a table of contents (tags) is listed on the documentation (`README.md`) of
the [repostiory](https://github.com/askarby/jest-example).

### Requirements

I only expect you to have three things installed on your machine:

- [Node.js](https://nodejs.org/en/) (use an LTS, unless you're feeling adventurous - I used 8.x).
- [Angular CLI](https://cli.angular.io/) (the latest version will do - I used the CLI that goes along with Angular 6.x).
- [A Git client](https://git-scm.com/) (I prefer a commandline / terminal version of Git, but you don't have to).

(and I'll be using a few shell commands, that are executable on MacOS / Linux - but I assume they'll execute equally as good in a Windows PowerShell environment).

### Check out the code

Feel free to either `checkout` a version of the application from my github-repository: [https://github.com/askarby/jest-example](https://github.com/askarby/jest-example), or even better - fork the repository
if you want to get your hands really dirty.

Cloning the repository is as easy as executing:

```bash
git clone git@github.com:askarby/jest-example.git
```

To follow along this tutorial, you'd want to check out the initial tag called `v1` (and follow the steps from that state of the codebase). Checking out the initial tag is done by executing the command:

```bash
git checkout v1
```

### Scripts

Only a few script targets exist (and these are all executed through [npm](https://www.npmjs.com/get-npm)):

- To execute the application (in development mode), simply run the command: `npm start` (available on [localhost at port 4200](http://localhost:4200))
- To execute the tests (once), simply run the command: `npm test`
- To execute the tests (in watch mode), simply run the command: `npm run test:watch`

### Testing thing out

You may want to test out a few of the targets. I would suggest that you:

- try to run the application, create, complete and delete a couple of items
- execute the tests (notice, all of them _are_ passing)
- read through the source-code (there's not a lot of it), to "get a feel for what's going on"

## Get rid of jasmine

Since we'll be transitioning to [Jest](https://jestjs.io/), we might as well start getting rid of the dependencies on [Jasmine](https://jasmine.github.io/) and the [Karma](http://karma-runner.github.io/latest/index.html)
test runner. We'll do so by executing the command:

```bash
npm uninstall @types/jasmine @types/jasminewd2 jasmine-core \
jasmine-spec-reporter karma karma-chrome-launcher \
karma-coverage-istanbul-reporter karma-jasmine \
karma-jasmine-html-reporter --save-dev
```

We also need to remove [Karma](http://karma-runner.github.io/latest/index.html)s configuration files, this is done by executing the command:

```
rm src/karma.conf.js src/test.ts
```

Next, we'll go into `src/tsconfig.spec.json`, and remove `"jasmine"` from the array at the `compilerOptions.types`-path, as well as removing `"test.ts"` from the array at the `files`-path.
Your `tsconfig.spec.json`-file should then look something like this:

```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "outDir": "../out-tsc/spec",
    "types": ["node"]
  },
  "files": ["polyfills.ts"],
  "include": ["**/*.spec.ts", "**/*.d.ts"]
}
```

All dependencies and configuration options, related to [Jasmine](https://jasmine.github.io/), are now removed from the project and we're now ready to move on the next step.

## Adding in Jest

Next, let's add [Jest](https://jestjs.io/) "to the mix" (which will be handled by adding a few dependencies - mainly [jest-preset-angular](https://github.com/thymikee/jest-preset-angular), and it's required peer dependencies).
Adding the dependencies is as simple as executing a single command:

```bash
npm install jest jest-preset-angular --save-dev
```

We'll also have to update the "test"-scripts in the `package.json`-file. We'll change the test-execution from running using [Angular CLI](https://cli.angular.io/) to using the [Jest](https://jestjs.io/) CLI directly.

Change the values of your test-scripts in your `package.json`-file so that they contain:

```bash
"scripts": {
  "ng": "ng",
  "start": "ng serve",
  "build": "ng build",
  "test": "jest",
  "test:watch": "jest --watch",
  "test:ci": "jest -ci --runInBand",
  "lint": "ng lint"
},
```

The three test targets are:

- `test` - running all tests once, then completing.
- `test:watch` - running the tests continuously, watching for changes (using [git](https://git-scm.com/) to check for files with modifications made to them).
- `test:ci` - acting like the `test`, but running all tests using only a single thread (which is good if your buildserver is limited on processor cores). Furthermore it will restrict snapshot testing (more on that later) only to verify (and not update when encountering a test without a snapshot present).

But we're not there, quite yet. We need to configure [Jest](https://jestjs.io/) to use the [jest-preset-angular](https://github.com/thymikee/jest-preset-angular), and add in configurations specific to the needs our application
(**Notice:** the requirements of the [sample application](https://github.com/askarby/jest-example) may not be the same requirements that yours have - but the basics are the same).

First, let's add the [jest-preset-angular](https://github.com/thymikee/jest-preset-angular), and doing so is a simple matter of adding the following lines to your `package.json`file:

```json
"jest": {
  "preset": "jest-preset-angular",
  "setupTestFrameworkScriptFile": "<rootDir>/src/setupJest.ts"
}
```

... and, of course, when we're referring to `setupJest.ts`, we'll need to create that file. So in the `src`-folder, create the file `setupJest.ts` containing the following:

```typescript
import "jest-preset-angular";
```

If you try to run your tests at this point (please try it out, it's as simple as issuing the command `npm test`, remember?), you'll be created by a slurry of error messages, eg.:

```bash
 FAIL  src/app/pie-chart/pie-chart.component.spec.ts
  ● Test suite failed to run

    Jest encountered an unexpected token

    This usually means that you are trying to import a file which Jest cannot parse, e.g. it's not plain JavaScript.

    By default, if Jest sees a Babel config, it will use that to transform your files, ignoring "node_modules".

    Here's what you can do:
     • To have some of your "node_modules" files transformed, you can specify a custom "transformIgnorePatterns" in your config.
     • If you need a custom transformation specify a "transform" option in your config.
     • If you simply want to mock your non-JS modules (e.g. binary assets) you can stub them out with the "moduleNameMapper" config option.

    You'll find more details and examples of these config options in the docs:
    https://jestjs.io/docs/en/configuration.html

    Details:

    /Users/askarby/Projects/jest-example/src/setupJest.ts:1
    ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,global,jest){import 'jest-preset-angular';
                                                                                             ^^^^^^

    SyntaxError: Unexpected token import

      at ScriptTransformer._transformAndBuildScript (node_modules/jest-runtime/build/script_transformer.js:403:17)

```

That's due to the fact that we havn't adjusted our [Typescript](https://www.typescriptlang.org) test configuration. Since we previously removed [Jasmine](https://jasmine.github.io/), we should
really add in the dependency on [Jest](https://jestjs.io/) and [jsdom](https://github.com/jsdom/jsdom).

So, let's go into `src/tsconfig.spec.json`, and add `"jest"` as well as `"jsdom"` to the the array at the `compilerOptions.types`-path.
Futhermore, we also want to set the module-system to be commonjs - this is done by adding the entry `"module": "commonjs",` to the `compilerOptions`-path.

Your `tsconfig.spec.json`-file should then look something like this:

```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "outDir": "../out-tsc/spec",
    "module": "commonjs",
    "types": ["node", "jest", "jsdom"]
  },
  "files": ["polyfills.ts"],
  "include": ["**/*.spec.ts", "**/*.d.ts"]
}
```

Some vendors don't transpile their sources, hence Jest needs to be configured to do so. This is done by modifying the `jest`-path of `package.json` to include a `transform`-section, eg.:

```json
"transform": {
  "^.+\\.(ts|html)$": "<rootDir>/node_modules/jest-preset-angular/preprocessor.js",
  "^.+\\.js$": "babel-jest"
}
```

The entire `jest`-path of your `package.json`-file should now resemble:

```json
"jest": {
  "preset": "jest-preset-angular",
  "setupTestFrameworkScriptFile": "<rootDir>/src/setupJest.ts",
  "transform": {
    "^.+\\.(ts|html)$": "<rootDir>/node_modules/jest-preset-angular/preprocessor.js",
    "^.+\\.js$": "babel-jest"
  }
}
```

Configuring the transformation-part of [Jest](https://jestjs.io/) is not enough to have your code transpiled, it also requires you to
install the `babel-preset-env`-[NPM package](https://www.npmjs.com/package/babel-preset-env).

```bash
npm install babel-preset-env --save-dev
```

and configuring [babel](https://babeljs.io/) to utilize it, by creating the file `.babelrc`, in the root of the project, with the contents:

```json
{
  "presets": ["env"]
}
```

## Making our tests pass

Now that we're able to execute our tests, we need to make sure that they'll actually pass. Remember, we didn't change the
behaviour of any code, only our test tool - hence the tests should pass. Unfortunately, [Jest](https://jestjs.io/) is not a drop-in replacement for [Jasmine](https://jasmine.github.io/).

Fortunately, the fixes to the failing tests are relatively trivial. The test failures we're facing can be put into a couple of categories:

- Not being able to use constructs of [Jasmine](https://jasmine.github.io/), as indicated by the error messages:
  - `TypeError: createSpyObj is not a function`
  - `TypeError: Cannot read property 'returnValue' of undefined` and `TypeError: Cannot read property 'throwError' of undefined`
  - `expect(array).toContain(value) ... Expected array: [...] To contain value: {}`
- [jsdom](https://github.com/jsdom/jsdom) not providing the entire browser API

### `createSpyObj` is not a function

In the example project, we use a function called `createSpyObj`, which basically provides a mock object, given a type and an array of
mock methods to provide for that particular object.

In [Jest](https://jestjs.io/), there's no such function - so you're stuck with two options:

1. Use [Jest](https://jestjs.io/)'s build-in object mocking feature, or...
2. Use a 3rd-party library that provides a "sort of" polyfill for that missing `createSpyObj`function.

#### Using the build-in object mocking

Is "simply" a matter of changing every place you require a mock object, eg.:

```typescript
createSpyObj("LocalStorageService", ["getArray", "persist"]);
```

with something like:

```typescript
jest.fn({
  getArray: jest.fn(),
  persist: jest.fn(),
});
```

The downside to this, is you have to go in a make there changes all over your tests, inside your test-code... which can be a handful,
if you already have a larger amount of tests, written using this feature.

This is also why I prefer the second option:

#### Using a 3rd-party library

First you'll need to install the dependency. The package is called [jest-createspyobj](https://github.com/unlight/jest-createspyobj) (on NPM [jest-createspyobj](https://www.npmjs.com/package/jest-createspyobj)) -
which is done by executing the following command:

```
npm install jest-createspyobj --save-dev
```

Next, we'll need to replace the all imports of:

```typescript
import createSpyObj = jasmine.createSpyObj;
```

with the library we installed:

```typescript
import { createSpyObj } from "jest-createspyobj";
```

This only requires changes to the import-section of your code, and is (to me, at least) preferable.

### Differences in mocking APIs

As earlier explained, the assertion library of [Jest](https://jestjs.io/) is very similar to that of [Jasmine](https://jasmine.github.io/), however
when looking at the spy / mock portion of the two libraries, there are a few differences.

[Jasmine](https://jasmine.github.io/) programs the return value of a mock function / method by providing the following syntax:

```typescript
<method or function>.and.returnValue(<expected response value>);
```

[Jest](https://jestjs.io/)'s mocking API provides the following API:

```typescript
<method or function>.mockReturnValue(<expected response value>);
```

Futhermore, where [Jasmine](https://jasmine.github.io/) exposes "throwing Error"s-functionality through the following syntax:

```typescript
<method or function>.and.throwError(<Error instance or message for Error>);
```

[Jest](https://jestjs.io/)'s mocking API provides the following API, not just for throwing Errors, but for any error:

```typescript
<method or function>.mockImplementation(() => throw <Error instance>);
```

A smaller difference exists in the behaviour of the `toContain`-method, where it checks if an array contains an instance of the given expected value.
[Jasmine](https://jasmine.github.io/)'s implementation test on object equality, where [Jest](https://jestjs.io/)'s implementation tests on identity.

To fix this issue, you replace the `toContain`-method with a call to the method: `toContainEqual`.

### Global API availability

Finally, since the [jsdom](https://github.com/jsdom/jsdom) doesn't provide the entire browser API, you should provide mocks for the cases that your application requires.
A good starting point would be [the example](https://github.com/thymikee/jest-preset-angular/blob/master/example/src/jestGlobalMocks.ts) provided by the example application of
[jest-preset-angular](https://github.com/thymikee/jest-preset-angular) - since it provides mocks for [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage),
[SessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage), [Doctype](https://developer.mozilla.org/en-US/docs/Glossary/Doctype) and the
[transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)-property (the latter being a requirement if using "almost any modern" UI framework).

```typescript
global["CSS"] = null;

const mock = () => {
  let storage = {};
  return {
    getItem: (key) => (key in storage ? storage[key] : null),
    setItem: (key, value) => (storage[key] = value || ""),
    removeItem: (key) => delete storage[key],
    clear: () => (storage = {}),
  };
};

Object.defineProperty(window, "localStorage", { value: mock() });
Object.defineProperty(window, "sessionStorage", { value: mock() });
Object.defineProperty(document, "doctype", {
  value: "<!DOCTYPE html>",
});
Object.defineProperty(window, "getComputedStyle", {
  value: () => {
    return {
      display: "none",
      appearance: ["-webkit-appearance"],
    };
  },
});
/**
 * ISSUE: https://github.com/angular/material2/issues/7101
 * Workaround for JSDOM missing transform property
 */
Object.defineProperty(document.body.style, "transform", {
  value: () => {
    return {
      enumerable: true,
      configurable: true,
    };
  },
});
```

You either download the `jestGlobalMocks.ts`-file (or create your own) and place it in the `src`-folder, and refer to it from the `src/setupJest.ts`-file (simply by importing the file). This
should make the contents of your `setupJest.ts`-file look like:

```typescript
import "jest-preset-angular";
import "./jestGlobalMocks.ts";
```

With all of these configurations, and code adjustments in place - you should be good to go, testing with [Jest](https://jestjs.io/)!

## Snapshot Testing

As mentioned at the beginning of this tutorial, [Jest](https://jestjs.io/) comes with snapshot testing.

Snapshot testing is a means of verifying that either JavaScript, or HTML corresponds to a saved snapshot image. The snapshots does not have to be created by hand, since you'll write the test code using
the snapshot API, and if the snapshot's not there, [Jest](https://jestjs.io/) will create it for you. Naturally, if the snapshot is present - it will verify the state against it.

So, let's try to create test using the snapshot functionality.

We'll create a test where we verify that the HTML-marjyo behaves as we'd expect - and we'll be doing it with the `ItemComponent` has resides in the file: `src/app/item-list/item/item.component.ts`.
Opening up the test-specification file for the component (being `src/app/item-list/item/item.component.spec.ts`), we can now add in a test:

```typescript
describe("snapshot of markup", () => {
  it("should match the markup for a item", () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
```

Then executing the tests the first time, we'll get the output indicating that the snapshot was updated:

```bash
 PASS  src/app/item-list/item/item.component.spec.ts
 › 1 snapshot written.

Snapshot Summary
 › 1 snapshot written from 1 test suite.

Test Suites: 10 passed, 10 total
Tests:       68 passed, 68 total
Snapshots:   1 written, 1 total
Time:        3.616s
Ran all test suites.
```

the snapshots are stored in a `__snapshots__`-folder, located in the `src/app/item-list/item`-folder.

If we then decide to update the template for our `ItemComponent` (found in the file `src/app/item-list/item/item.component.html`), for instance by adding a class to the outer div (with `class="item"`), as in:

```html
<div class="item added-class">
  <tl-checkbox [(checked)]="completed"></tl-checkbox>

  <!-- Edit-mode -->
  <ng-container *ngIf="isEditing; else readOnly">
    <input
      type="text"
      #task
      [value]="item.task"
      (keydown.enter)="confirm(task.value)"
      (keydown.escape)="cancel()"
    />
    <button class="confirm" (click)="confirm(task.value)">
      <fa-icon icon="check"></fa-icon>
    </button>
    <button class="cancel" (click)="cancel()">
      <fa-icon icon="times"></fa-icon>
    </button>
  </ng-container>

  <!-- Read-only-mode -->
  <ng-template #readOnly>
    <div class="label-container" (click)="toggleMode()">
      <span class="label" [ngClass]="{striked: completed}">{{item.task}}</span>
    </div>
    <button class="delete" (click)="delete.emit(item)">
      <fa-icon icon="trash"></fa-icon>
    </button>
  </ng-template>
</div>
```

... and re-run the tests (using "watch"-mode, ie: `npm run test:watch`, we'll be presented with the following error test-failure:

```bash
  ● ItemComponent › snapshot of markup › should match the markup for a item

    expect(value).toMatchSnapshot()

    Received value does not match stored snapshot "ItemComponent snapshot of markup should match the markup for a item 1".

    - Snapshot
    + Received

    @@ -3,11 +3,11 @@
        delete={[Function EventEmitter]}
        isEditing="false"
        item={[Function Object]}
      >
        <div
    -     class="item"
    +     class="item added-class"
        >
          <tl-checkbox
            ng-reflect-checked="false"
          />


      173 |     it('should match the markup for a item', () => {
      174 |       fixture.detectChanges();
    > 175 |       expect(fixture).toMatchSnapshot();
          |                       ^
      176 |     });
      177 |   });
      178 | });

      at src/app/item-list/item/item.component.spec.ts:175:23

 › 1 snapshot failed.
Snapshot Summary
 › 1 snapshot failed from 1 test suite. Inspect your code changes or press `u` to update them.

```

You can now either revert your change, or update the snapshot (by pressing <kbd>u</kbd>). If you have multiple snapshots that have changed, you can enter into an **interactive mode** (by pressing <kbd>i</kbd>)
and update each failing snapshot test interactively (one by one) from there.

## Other resources

Here's an additional list of links to relevant resources (not including links to the various NPM packages and GitHub repositories):

- [Jessy Sanders' talk on "Jest Testing"](https://www.youtube.com/watch?v=d91uDEmbBUs) - a YouTube video of the talk given on the subject of testing Angular with Jest, at [ngConf '2018](http://2018.ng-conf.org/)
- [X-five's article: "Testing Angular Faster with Jest"](https://www.xfive.co/blog/testing-angular-faster-jest/) - an article on testing Angular with Jest.
- [Brian Love's article "Angular + Jest"](https://brianflove.com/2018/05/26/angular-jest-testing/) - an article on testing Angular with Jest.
- [Fabrizio Fortunato's article "Unit testing Angular applications with Jest"](https://izifortune.com/unit-testing-angular-applications-with-jest/) - an article on configuring Angular with Jest.
- [Fabrizio Fortunato's article "Snapshot testing Angular applications"](https://izifortune.com/snapshot-testing-angular-applications/) - an article on testing Angular using Jest snapshots.

If you have any feedback, corrections or additional resources you would like to have mentioned in the resources section - or even other stuff you'd like to point my attention to -
don't hesitate contacting me (either by [e-mail](mailto:anders@skarby.info), or [twitter](https://twitter.com/askarby)).
