# TinyGallery
A simple javascript image gallery.

[Demo](https://gyrad.github.io/tinygallery/)

## Usage
Copy `tinygallery.min.css` and `tinygallery.min.js` from the [/dist](dist/) folder to your website.
Alternatively, you can link to these files hosted on a CDN:
```
https://cdn.jsdelivr.net/gh/gyrad/tinygallery/dist/tinygallery.min.css
https://cdn.jsdelivr.net/gh/gyrad/tinygallery/dist/tinygallery.min.js
```

Include `tinygallery.min.css` in the head section of your webpage:

```html
<link rel="stylesheet" href="/path/to/tinygallery.min.css">
```

Include `tinygallery.min.js` at the bottom of the body of your webpage just before the closing `</body>` tag:

```html
<script src="/path/to/tinygallery.min.js"></script>
```

Create a list of links to image files with enclosed thumbnails and add them to the body of your webpage, before including the tinygallery script:

```html
<div class="gallery">
    <a href="images/banana.jpg" title="Banana">
        <img src="images/thumbnails/banana.jpg" alt="Banana">
    </a>
    <a href="images/apple.jpg" title="Apple">
        <img src="images/thumbnails/apple.jpg" alt="Apple">
    </a>
    <a href="images/orange.jpg" title="Orange">
        <img src="images/thumbnails/orange.jpg" alt="Orange">
    </a>
</div>
```

Add the following JavaScript code after including the tinygallery script, to display the images. Change the `'.gallery'` to the CSS selector that contains the list of linked images.

```js
<script>
    const tiny = new TinyGallery('.gallery');
    tiny.init();
</script>
```
