# TinyGallery
A simple javascript image gallery.

[Demo](https://gyrad.github.io/tinygallery/)

## Usage
Copy `tinygallery.min.css` and `tinygallery.min.js` to your website.

Include `tinygallery.min.css` in the head section of your webpage:

```
<link rel="stylesheet" href="tinygallery.min.css">
```

Include `tinygallery.min.js` at the bottom of the body of your webpage just before the closing `</body>` tag:

```
<script src="tinygallery.min.js"></script>
```

Create a list of links to image files with enclosed thumbnails and add them to the body of your webpage, before including the **_tinygallery_** script:

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

Add the following JavaScript code after including the **_tinygallery_** script, to display the images. Change the `'.gallery'` to the CSS selector that contains the list of linked images.

```
<script>
    const tg = new TinyGallery('.gallery');
    tg.init();
</script>
```
