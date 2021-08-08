---
title: Commit messages
description: I used to write worthless commit messages, maybe you were too?
image: "2021/2021-08-08-commit-messages.jpg"
category: "convention"
tags: "git vcs tools"
twitter_text: skarby.info an blog post on commit messages
introduction: On commit messages and tooling
published: true
published_date: 2021-08-08
licenses:
  - forItem: "post image"
    from: "pixabay"
    url: "https://pixabay.com/photos/black-board-chalk-traces-school-1072366/"
references:
  - name: "Conventional Commits specification"
    url: "https://www.conventionalcommits.org/"
  - name: "Andreas Kling"
    url: "https://awesomekling.github.io/"
---

We all do it, and by "we" I mean software developers, and by "it" I mean write commit messages for our code.

## I did it wrong

There was a common theme in how I used to write commit messages. A single message always summarized one complete feature
or bugfix, pertaining the code that was being committed. Now, there's nothing wrong in that, since that's what a commit
message should be. The commit span modifications to 10s or 100s of files. This resulted in my commit messages covering
large filesets, and being broadly worded.

## What should I be doing

Instead, what I should have done, was to do multiple commits, even though I was working on a singular feature (or bugfix).

Let's say that I was fixing functionality related to calculating the wrong sum (on a website checkout), which includes:

- Fixing the actual issue
- Testing that the regression doesn't re-appear at a later point in time
- Added a code comment to existing code

Now, would you rather read the very brief commit message - including all changes to all files:

```text
fixed summary issue
```

...or would you instead prefer the well-structured, and more verbose, multi commit-version:

```text
fix(summary): fixed issue related to wrong sum calculation

Summary didn't account for discount, hence total was too high on discounted items.
The issue was fixed by adding "artificial items", for the discounts, but with a
negative value. Hence the algorithm remains "calculating a simple sum", but the object
model now differs.

Jira: ABS-27354
```

_(containing only the modifications to the newly introduced model)_

in addition to:

```text
test(summary): testing fix to issue related to wrong sum calculation

Added an integration test to verify that regressions do not occur in regards to issue
related to wrong summary calculation.

Jira: ABS-27354
```

_(containing only the newly added test)_

finally including the last commit

```text
docs(summary): enhanced documentation of sum calculation

Added a code-comment indicating new model utilized by sum calculation.

Jira: ABS-27354
```

_(containing only the introduced / enhanced code comment)_

I know exactly which option I'd go for (it's the latter if it's not clear!)

It all comes down to using your commit messages as documentation, describing what you've
done and why you did it. Referencing bug tracking systems is an optional feature, but from
my experience it's worked really well.

## That looks familiar

If you look at the example above, you might think that it looks fairly familiar - and you
are absolutely right! The way I like writing commit messages follow a standard called
[conventional commits][conventional-commits].

Without going into too much detail of how the standard works, here's a quick 2-minute
introduction.

A commit message (based on the [conventional commits][conventional-commits]) must be
composed of 1, or up to 3 parts.

1. A "type", "scope" and "description" line
2. A body
3. One or more footers

### The "type", "scope" and "description" line

Is the first line of the commit message, and it's the only line that a VCS application will display
in a brief / listing, hence it must be condensed, informational and "down to the point".

The line must adhere to the following format:

```text
<type>[optional scope]: <description>
```

...or by example:

```text
feat(auth): implemented role based authorization
```

The `type` must be which kind of change has been made, which kind be a wide array of options. These can be
custom-defined or "by convention". [Angular][angular] happens to use the following  
[convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

The `scope` (is optional, and hence can be left out), describes which area the change concerns.

The `description` is a short summary of the changes you've made, in relation to the `type` (and `scope`).

### The body

Can contain an extended description of what you did (it may also be completely omitted, since it's optional).

I strive to be very verbose, mentioning:

- The solution I implemented
- The choices that made it into the implementation
- The choices that were discarded, hence not making it into the implementation!

The body may span multiple paragraphs (separated by an empty line), if this improved readability.

### The footer(s)

Is the final paragraph of the commit message, and may not be multi-paragraph. There are no real rules
set for what content this may contain, but it incorporates really well with
[git's interpret trailer](https://git-scm.com/docs/git-interpret-trailers) lines.

An example hereof could be a reference to a Jira ticket, e.g.:

```text
jira: ABS-123456
```

Another example would be integration with [github]'s issue tracking system, where you close an issue by
using a keyword (additional information in can be found in
[github's documentation](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue)):

```text
closes: #8736
```

Please notice that you cannot add multiple footer paragraphs, but multiple lines _are_ allowed
(read: you're allowed content spanning multiple lines, but no empty lines seperating footers)

## Why structured commits

The general idea of having valuable information (in commit messages) I can't take credit
for either, but I do (passionately) resent messages without any value. Examples of these
are:

- ` ` (the single space, a.k.a. "I'm too lazy to do this right")
- `Fixing stuff` (the quick and dirty solution, adding no value)
- Message written in language different from english (a preference of mine)

Trying to cherry-pick from [git][git], or having to guess from file contents is a pain. Since
there's always a header / summary you get a quick idea of what's going on. Combining a good
message with a small file counts as well.

## Benefits

The real power of [conventional commits][conventional-commits] comes into play when combining them
with [semantic versioning][semver].

```text
<major>.<minor>.<patch>
...
1.2.8
```

A commit with the type `fix` indicates that a **patch** was applied to fix a bug. This corresponds to
an increment of the `patch` portion of a version.

A commit with the type `feat` indicates that a new feature was introduced. This corresponds to
an increment of the `minor` portion of a version.

Finally, to increase the `major` portion of a version, we need to indicate in our commit message that
a breaking change has been committed. This can be done in one of two ways:

By adding a footer line, saying "BREAKING CHANGE":

```text
feat(storage): updated persistence

Changed storage mechanism to persist data in database

BREAKING CHANGE: removed support for JSON persistence
```

...or by adding a `!` (exclamation mark) after the `type` / `scope`:

```text
feat(storage)!: updated persistence

Changed storage mechanism to persist data in database
```

It now becomes really clear how-to version your product upon release, and making a
change log, or release document becomes somewhat triviel. Sure, you can't necessarily
ship your commit messages in a customer facing document, but it removes the guessing
of "what did we do, the last sprint"?

We can benefit even further with this, if we combine it with efficient tooling!

## Tooling

Any principle or standard is only as good as the way (and consistency) of how it's
applied. Hence, we need to automate everything we can, also when it comes to improving
the quality of our commit messages.

In this section I'll go into a couple of tools, which automate:

- that conventional commits are being applied
- that help with creating commit messages having the correct structure
- that generate change logs from your (structurally sound) commit messages

**NOTICE:** These tools are all based on [Node.js][node], and are applicable when using [git] as your VCS!
(there are most likely similar tools for other VCSs, but I'm only using [git] so I don't know of these)

### commitlint

The first tool I'd like to mention is [commitlint]. This tool does exactly
what the name implies - it performs linting upon your commit messages. This can of course
be applied manually, but for it to add real value, it should be applied automatically.

For automatically applying it when committing we can utilize [git hooks][git-hooks]. This
can manually be applied by writing shell scripts and placing them in the `.git/hooks`-folder.
But, using [husky] makes this process much easier.

I would recommend applying the linting on the CI as well in addition to your local development environment,
since developers _can_ get away with circumventing [git hooks][git-hooks] by applying the
`--no-verify`-argument to your git commits (`git commit` in this case).

### commitizen

The second tool I'd like to mention is [commitizen]. It's a tool that helps you write syntactically correct
commit messages. It will provide an interactive experience, and make sure that lines are wrapped to the
correct width. All for the cost of replacing `git commit` with `git cz`.

### conventional-changelog

The third and final tool I'd like to mention is [conventional-changelog]. Its name pretty much sums up what
it does; which is to generate a change log from your commit messages.

Now, if you want to get a full [npm][npm] release experience (bumping versions in addition to generating a
`CHANGELOG` file et al.), you may want to have a look at the [standard-version] utility, or
[semantic-release] utility if integrating with a CI / CD.

## Inspiration

So what's my inspiration for writing this blog post, and going the [conventional commits][conventional-commits]
route?

I've known about conventional commits for a while, and I've recognized that there's a need to be consistency
in all facets of software development. As a freelance developer you get exposed to quite a few code bases, and
you're constantly exposed to a few anti-patterns:

- documentation that is obsolete
- software repositories that are chaotic

[Conventional commits][conventional-commits] won't fix both (or perhaps any) of these issue, it will however
help you provide an introduction to the code. First and foremost; there is no obsolescence related to commit
messages. They are applied to an exact code change, at that exact point in time! Secondly, providing
detailed information about "why code was written" will always be informational.

My biggest issue with knowing about a tool / technology and applying that practice is the way that I "pick up things".
I can read documentation, or a blog post, but that doesn't necessarily translate to how I should "practically apply it".
I've found that the way my brain works (best) is get a practical example, _then_ read up on the documentation.

This leads me to 2021, me being in a "Covid-19 mood" (having worked from home for more than a year). I needed some
"background noise" (the "chitter chatter" of being in an open spaced office) and I had started using
[Andreas Kling][awesomekling]'s [SerenityOS][serenityos] live coding [Youtube videos](https://www.youtube.com/c/AndreasKling)
for that exact purpose.

It just happened that _he_ wrote very good commit messages, albeit not necessarily following the
[Conventional commits][conventional-commits] standard, in addition to doing small commits. That was my kick-off point!

Another motivator was going through a major refactoring of the project (I was working on at the moment) not being able to
figure out what was logic being applied to the codebase, from looking at the [git] history (log).

[conventional-commits]: https://www.conventionalcommits.org/
[git]: https://git-scm.com/
[github]: https://github.com/
[angular]: https://angular.io/
[semver]: https://semver.org/
[node]: https://nodejs.org/en/
[commitlint]: https://commitlint.js.org/
[husky]: https://typicode.github.io/husky
[conventional-changelog]: https://github.com/conventional-changelog/conventional-changelog
[git-hooks]: https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks
[commitizen]: https://github.com/commitizen/cz-cli
[npm]: https://www.npmjs.com/
[standard-version]: https://github.com/conventional-changelog/standard-version
[semantic-release]: https://github.com/semantic-release/semantic-release
[awesomekling]: https://awesomekling.github.io/
[serenityos]: http://serenityos.org/
