---
title: Scully plug-ins
description: Let's have a look at Scully's API for writing plug-ins
image: "2021/2021-08-28-scully-plugins.jpg"
category: "productivity"
tags: "scully angular"
twitter_text: skarby.info a blog post on scully plug-ins
introduction: On using and writing custom scully plug-ins
published: true
published_date: 2021-08-28
series: Angular and Scully
licenses:
  - forItem: "post image"
    from: "pixabay"
    url: "https://pixabay.com/photos/puzzle-last-part-joining-together-3223941/"
  - forItem: "scully logo"
    licenseType: "MIT"
    url: "https://github.com/scullyio/scully/raw/main/assets/logos/PNG/scullyio-logo.png"
references:
  - name: "Scully"
    url: "https://scully.io"
  - name: "sharp (fast node.js image manipulation library)"
    url: "https://sharp.pixelplumbing.com/"
---

First and foremost, the architecture of [Scully][scully] is awesome! It's extensible by nature, and it's very much a matter of
the entire Scully ecosystem being implemented in plug-ins. But we're getting way ahead of ourselves, let's rewind a bit!

The way that [Scully][scully] works is by looking at the [Angular][angular] routes provided by your application, then traversing
them and rendering the routes using [Puppeteer][puppeteer] (an API to render pages, etc. using Chrome's devtools protocol). The
most interesting part is the route discovery mechanism (extensible through plug-ins) and the pre-/post-rendering hooks (extensible
through plug-ins as well).

## Types of plug-ins

> “Give a man a fish, and you feed him for a day. Teach a man to fish, and you feed him for a lifetime.”
> <author style="float: right; margin-top: 1rem;">- Unknown</author>

So, how does that apply to [Scully][scully]'s plug-in mechanism? Well... think of it this way. If the [Scully][scully]-team has to
implement every thinkable mechanism you'd want for you statically rendered site, or deal with the potential slurry of pull request
of features to add to the framework - then they'd be busy, quite busy!

By going with an extensible architecture, which is what a system based on plug-ins provides, they open up the system to be expanded
upon and not having to support the implementations - but only the API. Not that API work is triviel, but it's simpler to focus on
one part of a task... they're basically "handing out fishing rods"!

[Scully][scully] provides an API with 9 (well, 7 if not counting [System](https://scully.io/docs/Reference/plugins/types/system/)-
or [Enterprise](https://scully.io/docs/Reference/plugins/types/enterprise/) plug-ins) different types of plug-ins.
Some plug-in implementations come pre-bundled (these are referred to as core plug-ins) and an (ever-expanding) amount of plug-ins are
provided by the community (these are referred to as community plug-ins, and are provided through [NPM][npm]). If you can't find what
you need, you can code a plug-in yourself (that will cover your needs)!

### AllDone

The first type of plug-in we'll have a look at is the `allDone` type of plug-in. As the name implies, it's a plug-in that will
execute when all of [Scully][scully]'s processing is done.

I'm personally not using this type of plug-in, since I feel this kind of "hook" is best solved by CI implementation / setup. If you're
running without a CI - this type of plug-in would be very useful!

### FileHandler

The `fileHandler` type of plug-in provides a way of transforming files (of a given type) to HTML. [Scully][scully] provides two
implementations of this type of plug-in, these being:

- **[md](https://scully.io/docs/Reference/plugins/built-in-plugins/md/)**, which provides transformation of [markdown] content
- **[adoc](https://scully.io/docs/Reference/plugins/built-in-plugins/adoc/)**, which provides transformation of [asciidoc] content

### PostProcessByHTML

The `postProcessByHtml` type of plug-in allows you to post-process the output from a `fileHandler` type of plug-in. You're given the HTML
as a `string` to transform upon.

This type of plug-in could be using for a wide range of improvements, enhancing the HTML. I've personally got plans for writing a plug-in
(of the `postProcessByHtml` type) to automatically enhance my blog-posts with `<a href="...">` (for adding links). It's currently a manual
process of adding links, and it's a somewhat repetitive (verbose) approach.

### PostProcessByDOM

The `postProcessByDOM` type of plug-in is very similar to the `postProcessByHtml` kind. The only difference is that you're given the `JSDOM`
object to operate upon.

**Notice:** Be aware that if you're using `postProcessByHtml` in addition to `postProcessByDOM`, the `postProcessByDOM` will run before the
`postProcessByHtml` type of plug-ins. So it's not a matter of choosing one or the other, since they may complement one another!

### Route Process

The `routeProcess` type of plug-in allows you to modify the list of discovered routes. This will run after [Scully][scully] has discovered
a list of routes to process, where you might want to filter (or enhance) the list of discovered routes.

You're given a generous amount of information about the rendering process (including the generated `RouteConfig` object), in addition to the
routes, so your opportunities of applying logic to filtering or enhancing routes are plentiful.

### RouteDiscoveryDone

The `routeDiscoveryDone` type of plug-in is very similar to the `allDone` type of plug-ins, the main difference being that this type of
plug-in will be invoked after all routes have been discovered.

The usage example (provided by [Scully][scully]) is generating an RSS-feed, and I cannot agree more with that being an optimal usage of this
type of plug-in.

### Router

The `router` type of plug-in provides a means of resolving parameters for your `Route`s that take in variable URL input (such as `/products/apple`,
`/products/orange` or `/products/strawberry` etc.). So what kind of routes are these? You might recognize the following example:

```ts
RouterModule.forRoot([
  {
    path: "products",
    component: ProductsListingComponent,
    children: [
      {
        path: ":productId",
        component: ProductDetailsComponent,
      },
    ],
  },
]);
```

Two routes have been created. The `ProductsListingComponent` will (when rendered) contain a list of all products, and the
`ProductDetailsComponent` will (when rendered) provide a detailed view of a certain product.

Remember that [Scully][scully] does not try to do any "crawling" of your website, it only analyses the Routing-configuration that you implemented
in your [Angular][angular] application. So to determine which value goes into the `:productId` URL path segment, we need a mechanism for
discovering these - **that** is where the `router` type of plug-ins come into play!

[Scully][scully] provides a single implementations of this type of plug-in - the **json** plug-in.

The **[json](https://scully.io/docs/Reference/plugins/built-in-plugins/json/)**-plug-in allows you to query JSON-based REST-endpoint for data, and from
a given property name acquire a list of data to pass into a configurable list of URL path segments.

## Scully plug-ins

During the previous walk-through of plug-in types, I've mentioned a couple of plug-ins. For good order, I thought I'd dedicate a section of this post
to "great plug-ins to keep handy". Remember, there's no need to "re-invent the wheel" if you can steal your neighbours wheel... errr, never mind 🤔!

Let's first have a look at some **core** plug-ins:

- **[md](https://scully.io/docs/Reference/plugins/built-in-plugins/md/)**, which I know I've already previously mentioned, provides rendering of content
  made in [markdown] - I ❤️ [markdown]!
- **[seoHrefOptimize](https://scully.io/docs/Reference/plugins/built-in-plugins/seoHrefOptimize/)**, which is a great plug-in, that provides a higher
  SEO-ranking simply by "plugging it in". It's accomplished by minimising the generated output (removing spaces and the like), leading to lower load-times
  which in turn leads to a higher SEO score - **neat**!

Next, let's have a look at some **community** plug-ins:

- **[time-to-read](https://scully.io/docs/Reference/plugins/community-plugins/time-to-read/)**, which adds a `readingTime`-property to the meta-data file
  (that is the `scully-routes.json`, located in the `assets`-folder). I use this plug-in myself, and find it **very** useful 👍
- **[toc](https://scully.io/docs/Reference/plugins/community-plugins/toc/)**, which adds "table of contents"-markup to your generated output. I was about
  to use this myself, until I realized that I had more specific requirements and ended up writing a similar plug-in myself - more on this, later!
- **[minifyHtml](https://scully.io/docs/Reference/plugins/community-plugins/minifyHtml/)**, which is another plug-in that increases your SEO-score, simply
  by "plugging it in" (additional details on this matter, can be read [here](https://developers.google.com/search/blog/2010/04/to-slash-or-not-to-slash))

## Custom plug-ins

The most interesting part of [Scully][scully] is, as I've mentioned repeatedly, the plug-in mechanism. You can of course look at repositories of plug-ins,
search for 3rd party plug-ins or use the core plug-ins to "your heart's content", but to really leverage the power of [Scully][scully], you should create a
custom plug-in to solve a very specific problem of your own. The best part of it, it's not all that complex to do - let's have a look at writing our own plug-in!

I've (at this point of time) written 2 custom plug-ins, these are:

### Another toc plug-in

This is a plug-in that I created for generating a **Table of Contents**, similar to that of the community plug-in [toc](https://scully.io/docs/Reference/plugins/community-plugins/toc/),
but with one major difference. Where the [toc](https://scully.io/docs/Reference/plugins/community-plugins/toc/) plug-in renders a table of contents into the
markup of the output, my plug-in places the information into [Scully][scully]'s meta-data file (`scully-routes.json`).

So, why... you might ask? Well, I want to produce an outline of the posts, and present it on the listing's page (in the plans, not currently implemented).

The source code for this plug-in can be found on GitHub, [here](https://github.com/askarby/blog/blob/master/scully/plugins/route-toc-plugin.ts), and for those
asking, yes I **am** planning on publishing a community plug-in for this (I just haven't gotten around to it, yet!)

### Thumbnail plug-in

This is a plug-in that I created for **automatically generating thumbnails** from my blog post header images. Now, I could generate these thumbnails
manually (it's a simple matter of creating two images with varying dimensions, instead of one) - however, I like to automate repetitive tasks. These thumbnails
are used on the front-page to prevent the user from downloading excess amount of image binaries (saving as much as 8-10x of data transfer).

This has huge impact on people with slower internet connection speeds (such as 3rd world countries, mobile user's, Australians and the like 😜).

The source code for this plug-in can be found on GitHub, [here](https://github.com/askarby/blog/blob/master/scully/plugins/route-thumbnail-plugin.ts)!

This just also happens to be the plug-in we'll go into details of "how it's build"!

### Dissecting the plug-in

First and foremost, when writing a plug-in for [Scully][scully], you'll be using [TypeScript][typescript] (which is a natural pairing, since you're already
writing your [Angular][angular] application in the same language - no context switching here).

The **plug-in** we've looking at here, is of the `routeProcess` type. Quite a few details are specific to varying kinds of [Scully][scully] plug-ins.
For specifics on the various API details, have a look at [the Scully API docs](https://scully.io/docs/Reference/scully-api/overview/).

There are three parts to implementing (designing) a plug-in:

1. Defining the configuration interface
2. Implementing the plug-in behaviour
3. Registering the plug-in

You could consider an optional 4th part, which is applying the plug-in to your application - but that's more in the realm of using the plug-in, in contrast
to the authoring / implementation part.

The **configuration interface**, in our example, is defined as:

```ts
interface RouteThumbnailOptions {
  /**
   * The path of the entries to generate thumbnails for.
   */
  path: string;

  /**
   * The property of the to read the image from.
   *
   * This is the property that the thumbnail is generated from.
   */
  imageProperty: string;

  /**
   * Configuration of the thumbnail that's being produced.
   */
  output: {
    /**
     * The desired width of the thumbnail.
     *
     * This can be omitted, and in case of that, the height will be
     * the determining size factor
     */
    width?: number;

    /*
     * The desired height of the thumbnail.
     */
    height?: number;

    /**
     * The desired output locations of the thumbnail. If omitted the
     * generated thumbnail will be placed "next to" the original image.
     */
    locations?: string[];
  };
}
```

The configuration object is then passed into the plug-in itself, in addition to the `HandledRoute`-array. A plug-in in [Scully][scully]
just happens to be a plain `function`, taking in a number of arguments and outputting a `Promise` - it's an `async` implementation.

In our case (implementing a `routeProcess` type of plug-in), the function looks like:

```ts
import { HandledRoute } from "@scullyio/scully";

// ...

export const routeThumbnailFunc = async (
  routes: HandledRoute[]
): Promise<HandledRoute[]> => {
  // Implementation details can be found on GitHub
  // (it read's much nicer, and will be up to date!)
};
```

I've left out the implementation of the plug-in `function`, but summarized in very broad terms, only two things happen:

- We do path-traversal logic to determine absolute paths (where to write images), based on the relative configuration paths.
- Lastly we resize the images (copy, at a scaled size) using the excellent [sharp] [NPM][npm]-library

I'm not sure if you're able to mutate the `routes`-argument, but as a rule of thumb (my preference), if you're passed in an argument
and expected to return the same type of object, you should always do it in an immutable way (that way you don't accidentally mutate
the data, that another part of the system expects to be in a given state).

Next up is to register the plug-in, and this is done by invoking the `registerPlugin` function:

```ts
import { registerPlugin } from "@scullyio/scully";

// ...

export const routeThumbnail = "routeThumbnail";
registerPlugin("routeProcess", routeThumbnail, routeThumbnailFunc);
```

You're actually able to provide an optional 4th argument to the `registerPlugin`-function, which is a number, providing the sort order
that multiple `routeProcess` plug-ins will be executed in.

The "last piece of the puzzle" is to apply the plug-in to your [Scully][scully] application, this is done in the `scully.config.ts` file.

```ts
setPluginConfig(routeThumbnail, {
  path: "/blog/post",
  imageProperty: "image",
  output: {
    width: 150,
    locations: ["dist/static/assets", "blog"],
  },
} as RouteThumbnailOptions);
```

Reading this, you can see that I:

- only process `HandledRoute`-objects that are obtained from the application path `/blog/post` (and children)
- look at the `image`-property of the `HandledRoute`-object, to determine the path of the file to generate the thumbnail from
- output to two locations (`dist/static/assets` as well as `blog`) - this is to accommodate using `ng serve` as well as building for production!
- images have a target width of 150 pixels (the height will be determined by scaling from this dimension)

## Conclusion

I absolutely love [Scully][scully] for its extensibility. The shear number of available plug-ins (either being core or provided by the community)
brings a great deal of flexibility and functionality at a very low level of investment. The plug-in API that's provided is easy to work with,
intuitive and inviting to use. If you can dream it up, you can most likely build it.

Don't go for manual repetitive tasks, instead build a plug-in to automatically solve it.

I hope to get some feedback from you, if you've implemented a plug-in. Please drop me a line on social media (they're linked at the footer
of this page), and I'll update this page with "honorable mentions".

[angular]: https://angular.io/
[scully]: https://scully.io/
[sharp]: https://sharp.pixelplumbing.com/
[puppeteer]: https://github.com/puppeteer/puppeteer
[npm]: https://www.npmjs.com/
[markdown]: https://en.wikipedia.org/wiki/Markdown
[asciidoc]: https://en.wikipedia.org/wiki/AsciiDoc
[typescript]: https://www.typescriptlang.org/
