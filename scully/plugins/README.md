# Custom Scully plugins

This page describes the custom scully plugins that have been "tailor made" for the blog.

In addition to these, various other (3rd party) plugins have also been used. Please consult
the `scully.blog.config.ts`-file on which ones (and their respective configuration).

# route-thumbnail-plugin.ts

This plugin generates thumbnail files based on a property in the [Front Matter][front-matter]
section of a blog post.

**TODO:** Describe properties, how it's used, limitations etc.

# route-toc-plugin.ts

This plugin generates a table of contents, based on the H-elements (`h1`, `h2`, `h3` etc.) in the
generated blog posts (it's actually generated based on `#`-prefixed (header) strings in the markdown
files.

The difference from [the existing toc-plugin](https://www.npmjs.com/package/scully-plugin-toc), and
this implementation, is that the TOC-contents is placed in the `scully-routes.json`-file (and **not**
inline in the generated HTML-file).

**TODO:** Describe properties, how it's used, limitations etc.

[front-matter]: https://jekyllrb.com/docs/front-matter/
