# toc-toc.js

> Table of Contents that will knock-knock you down

## Installation 

To install the library, use NPM
```
npm install toc-toc.js
```

If  you want to use a dev version not published to npm yet, use `npm link`

First clone this project from github.

Then go to your cloned folder and type
```bash
npm link
```

In the project you want to use `toc-toc.js`, type
```bash
npm link toc-toc.js
```

It will act similar to `npm install`

## Basic Usage

First import the library in your JavaScript
```javascript
import 'toc-toc.js';
```

You can now use `toc-toc.js` on your page using the following HTML tag
```html
<toc-toc></toc-toc>
```

By default it will generate a table of content using :
* the entire body
* `<h1>` tags for primary titles
* `<h2>` tags for secondary titles
* `<h3><h4><h5><h6>` tags for tertiary titles

## Configuration options

### `target` 

CSS selector that defines the context of the TOC

**default:** `body`

Example : 
```html
<toc-toc target="#content"></toc-toc>
```

### `primary`

CSS selector for first level titles, use `disabled` as a value to disable the level

**default:** `h1`

Example : 
```html
<toc-toc primary=".title-1"></toc-toc>
```

### `secondary`

CSS selector for second level titles, use `disabled` as a value to disable the level 

**default:** `h2`

Example : 
```html
<toc-toc secondary=".title-2"></toc-toc>
```

### `tertiary`

CSS selector for third level titles, use `disabled` as a value to disable the level

**default:** `h3,h4,h5,h6`

Example : 
```html
<toc-toc tertiary=".title-3"></toc-toc>
```

### `bullet`
 
Whether the list should be rendered as a styled bullet list (`<ul>`). Omit the attribute to disable it.

Example : 
```html
<toc-toc bullet></toc-toc>
```

### `ordered`

Whether the list should be rendered as an ordered list (`<ol>`). Omit the attribute to disable it.

Example : 
```html
<toc-toc ordered></toc-toc>
```

### `scrollspy`

Whether the scroll listener should be registered. Omit the attribute to disable it.
This will apply the `active` class to the highest currently visible element in the TOC.

Example:
```
<toc-toc scrollspy></toc-toc>
``` 

## Style

You can override the style as you want using the following selectors :

* `toc-toc` to style the whole component
* `toc-toc ul` or `toc-toc ol` to style the inner list
* `toc-toc .toc-primary` to style primary list items
* `toc-toc .toc-secondary` to style secondary list items
* `toc-toc .toc-tertiary` to style tertiary list items
* `toc-toc a` to style links
* `toc-toc .toc-primary a` to style links on a specific level

Default classes are also defined to help you use `toc-toc.js` quickly

`tiles` to render the TOC as bordered list with adequate style and hover/active effects

`stick-left` to position the TOC on left of the screen, useful when used with `scrollspy` 
:warning: it will position the TOC absolutely with a high `z-index` so it might cover the content below it