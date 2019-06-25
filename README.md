# TinyGallery

A simple javascript image gallery.

![Demo](tinygallery-screengrab.gif)

[Demo](https://gyrad.github.io/tinygallery/)

## Installation

### From NPM

```console
$ npm install tinygallery
```

### Download from Github or use a CDN

Copy `tinygallery.min.css` and `tinygallery.min.js` from the [/dist](dist/) folder to your website. Alternatively, you can link to these files hosted on a CDN:

```
https://raw.githack.com/gyrad/tinygallery/master/dist/tinygallery.min.css
https://raw.githack.com/gyrad/tinygallery/master/dist/tinygallery.min.js
```

## Usage

Include `tinygallery.min.css` in the head section of your webpage:

```html
<link rel="stylesheet" href="/path/to/tinygallery.min.css" />
```

Include `tinygallery.min.js` at the bottom of the body of your webpage just before the closing `</body>` tag:

```html
<script src="/path/to/tinygallery.min.js"></script>
```

Create a list of links to image files with enclosed thumbnails and add them to the body of your webpage. The root div **MUST** have `class="tinygallery"` and also an `id` set to a unique name. You can also add the `data-caption` attribute to show a caption underneath the image.

```html
<div class="tinygallery" id="my_main_gallery">
  <a href="images/lhasa.jpg">
    <img
      src="images/thumbnails/lhasa.jpg"
      alt="Lhasa"
      data-caption="A view of Lhasa, the capital of Tibet."
    />
  </a>
  <a href="images/potala.jpg">
    <img src="images/thumbnails/potala.jpg" alt="Potala Palace" />
  </a>
  <a href="images/tibet.jpg">
    <img
      src="images/thumbnails/tibet.jpg"
      alt="Tibet"
      data-caption="An aerial view of Tibet, the roof of the world."
    />
  </a>
</div>
```

Add the following JavaScript code after including the tinygallery script, to initialize the gallery. Change the `'my_main_gallery'` to the id of the div that contains the list of linked images.

<!-- prettier-ignore -->
```js
<script>
  const my_gallery = new TinyGallery('my_main_gallery'); 
  my_gallery.init(); 
  
  // You can also add more than one gallery. 
  const another_gallery = new
  TinyGallery('my_other_gallery'); 
  another_gallery.init();
</script>
```
