---
title: New blog engine
description: I've re-vamped the blog, this time around using Angular with Scully
image: "2021/2021-08-13-new-blog-engine.jpg"
category: "convention"
tags: "blog scully angular engine"
twitter_text: skarby.info a blog post on a new blog engine
introduction: On writing a blog engine with Angular and Scully
published: true
published_date: 2021-08-13
series: Angular and Scully
licenses:
  - forItem: "post image"
    from: "pixabay"
    url: "https://pixabay.com/photos/motorcycle-engine-metal-motor-459594/"
  - forItem: "Angular shield"
    licenseType: "CC-BY-40"
    url: "https://angular.io/presskit"
  - forItem: "scully logo"
    licenseType: "MIT"
    url: "https://github.com/scullyio/scully/raw/main/assets/logos/PNG/scullyio-logo.png"
---

"Another year, another blog engine... as they say?".

It is almost becoming a running joke that I switch between blog engines more often than I write posts for my blog.

I've been through [Wordpress][wordpress], which is based on [php]. It's a really nice engine to write your content
in. There are no requirements to be technically savvy, but if you go the "cheapo, I'll host it myself way" you're
the prime target for hackers and script kiddies.

That was sufficient reason for me to switch away.

## Statically rendered sites

This lead me to "think different" (thanks Apple, anno 1997'ish).

"Do you know what's impossible to hack? ... static HTML pages!"

Well, I guess you can hack the host, but having static pages hosted on [GitHub Pages][github-pages] takes away a lot
of vulnerabilities (as long as you choose passwords for [GitHub][github] with a sufficient level of entropy, combined
with two-factor authentication). So that was the way I decided to go (roughly 3 years and 4 posts ago).

I had a quick brush with a (potentially JavaScript-based) specific site generator, but I can't remember what the name
was. I do believe it was called "ghost", but what I can find on [GitHub][github] does **not** resemble the project I
used at all back then (it's now a headless CMS system?). I don't know what I don't like about it, but it didn't stick.

Next up, I decided to go with [Jekyll][jekyll], which is based on [Ruby][ruby]. The engine is solid, and the decision of
producing content in [Markdown][markdown] is wonderful. I loved this solution... to some extent.

[Ruby][ruby] is not my "language of choice", and even when I succeeded at modifying an existing template, I felt "like a
🦆 out of 💧". Not to say anything bad about said programming language, I'm just more acquainted with programming
languages that resemble C, Java, C# or JavaScript in syntax.

## Angular to the resque

This leads us to "now", that I've decided to re-do the blog in Angular.

[Angular][angular] is my first choice, when it comes to web development, at least when we're talking about developing
Single Page Applications. I don't want to talk bad about other SPA frameworks. [React][react], [Vue.js][vue.js],
[SVELTE][svelte] or [Lit][lit] are all great - but having had more experience with [Angular][angular] it's my "go to
choice".

There's however a couple of things that makes [Angular][angular] a less than optimal choice, when it comes to it being
the optimal choice for creating a blog.

- Not all search engines are able to index the site, since it requires a browser evaluating the JavaScript to produce
  the HTML that has to be indexed.
- The [Angular][angular] (JavaScript) application needs to bootstrap itself, hence there's a (slightly perceived delay) - it's
  not the "biggest thing", but it's lowering the user experience (and the [Lighthouse][lighthouse] score) - and that's
  not what I want.

## Scully

But there's a fix for that, and the fix is called [Scully][scully]!

[Scully][scully] is a framework that generates static sites (hence enables creating [Jamstack][jamstack] applications using [Angular][angular]).

If you're curious what [Jamstack][jamstack] application is, it's a type if application that is build at compile time. That's in contrast to
having it being produced in runtime on the browser, or rendered on the server side (per request).

It provides the following benefits:

- It can be hosted anywhere (it's just static files), hence can be deployed via. CDNs for enhanced scalability.
- It's less vulnerable, due to fewer attack vectors (static files say: "come at me, bro!"), data micro APIs can be limited
  ... just to mention a few!

### How does it work

Have you even taken a look at the `index.html`-page of your application. I've added the file for my blog's `index.html`-page,
at the time of writing this (and just to be clear, it's the source code of the `index.html`-page):

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Anders Skarby's Blog</title>
    <meta charset="utf-8" />
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="favicon.ico" />

    <!-- Fonts -->
    <link
      href="https://fonts.googleapis.com/css?family=Titillium+Web:300,400,700"
      rel="stylesheet"
    />
  </head>
  <body>
    <app-root></app-root>

    <!-- Google Analytics -->
    <script>
      window.ga =
        window.ga ||
        function () {
          (ga.q = ga.q || []).push(arguments);
        };
      ga.l = +new Date();
    </script>
    <script async src="https://www.google-analytics.com/analytics.js"></script>
    <!-- End Google Analytics -->
  </body>
</html>
```

Nothing much is going on, and what's usually added to this file is (apart from CSS files and the occasional JavaScript
tracking-snippet) is simply the root element of your SPA (in the example above `app-root`).

But there's a very interesting little part about this page, that you may not know. Whatever you place inside the `app-root`-
element, will be rendered immediately to the page.

I've used this trick to add enable lightning-fast user-feedback (progress until the page has boot-strapped) to various
applications. [Scully][scully] does something even more clever - it pre-renders the Angular route of the specific page,
and places the content inside the tags. What you get from that is an immediately rendered page, and as the [Angular][angular]
runtime successfully bootstraps itself, you're seamlessly migrated to the SPA application!

### That seems very limited

If that was all [Scully][scully] had to offer, I'd have to agree that it was a limited offering - but that is far from the case.

[Scully][scully] provides an extendable plugin model, which allows you to:

- Determine which routes should be indexed
- Provide a means of resolving dynamic routes (from remote API, JSON, XML or additional means)
- Generating markup from various formats ([Markdown][markdown] is provided out of the box)
- ... and much, much more!

### Made by

First of all [Scully][scully] is Open Sourced under [The MIT License][mit-license], and you can find the source code for the project
at their [GitHub repository][scully-github-repo].

It's made available by [HeroDevs][herodevs] (you may know [Aaron Frost][aaron-frost-twitter] from various Angular presentations, user
groups and conferences). Since it's Open Sourced, work has contributed by several contributors, which count 92 people at the time of
writing this post.

## What I want to build

Given the great toolset that [Angular][angular] combined with [Scully][scully] is, I hope to create blog software that makes my life easy,
at least in regard to writing blog posts, and not having to feel that the software is in my way of writing content.

I'm choosing to keep the blog as a client-side application only (based on static content, and progressively enhancing it when JavaScript
is available). This means that I won't be adding a "commentary track", since I believe that social media is doing a much better job at that
than any comment system I will ever be able to build! Additionally, this means that I will be using [GitHub][github] for bug tracking,
and content correction(based on user feedback).

I've already built mechanisms to ensure that attribution (references et al.) are provided, but when it comes to "materials used for
writing the posts" as well as images, icons etc. I expect that this can be improved upon even further.

For plug-ins, I've already created a few. They're based on processing the [Front Matter][front-matter] of the posts, and they provide:

- Automatic thumbnail generation
- Table of contents generation
- ... and over time, I'll create more of them (I'm sure)

Google is great at searching, but I want to try my hands with creating my own "in blog"-search engine, based on:

- [fuse.js]
- IndexedDB
- WebWorkers

This is of course only a subset of "what I want to build", the complete ever-growing list (of items and their progress) can be
found [here](https://github.com/askarby/blog/projects/1). Since the source code of the software is open sourced, it can be browsed
freely from [here][github-blog-repo]!

## Part of a series

This post is the first part of a series, where I will take you onto the journey of creating this blog software. Granted, it's tailor-made
for my needs, but you could easily "fork it" and adapt your own blog site from it. Regardless, I'll try to describe how I create custom
plugins, tailoring this Angular blog to my exact needs, along with various (whatever I find interesting) subjects about creating the software.

I hope that you'll follow along!

[wordpress]: https://wordpress.com/
[php]: https://www.php.net/
[github-pages]: https://pages.github.com/
[github-blog-repo]: https://github.com/askarby/blog
[github]: https://github.com
[jekyll]: https://jekyllrb.com/
[ruby]: https://www.ruby-lang.org/en/
[markdown]: https://en.wikipedia.org/wiki/Markdown
[aaron-frost-twitter]: https://twitter.com/aaronfrost
[scully]: https://scully.io/
[scully-github-repo]: https://github.com/scullyio/scully
[angular]: https://angular.io
[react]: https://reactjs.org/
[vue.js]: https://vuejs.org/
[svelte]: https://svelte.dev/
[lit]: https://lit.dev/
[lighthouse]: https://developers.google.com/web/tools/lighthouse/
[jamstack]: https://jamstack.org/
[mit-license]: https://opensource.org/licenses/MIT
[herodevs]: https://herodevs.com/
[fuse.js]: https://fusejs.io/
[front-matter]: https://jekyllrb.com/docs/front-matter/
