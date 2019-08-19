export default class TinyGallery {
  constructor(galleryId) {
    this.body = document.querySelector('body');
    this.galleryId = galleryId;
    this.galleryLink = document.querySelectorAll('#' + this.galleryId + ' a');
    this.galleryImage = document.querySelectorAll(
      '#' + this.galleryId + ' img'
    );

    this.litebox = null;
    this.liteboxImage = null;
    this.liteboxId = 'litebox-' + this.galleryId;
    this.imageURL = null;

    this.isFullscreen = false;
    this.fullscreenBtnJustClicked = false;
    this.openState = false;
    this.index = null;
    this.mouseTime = null;
    this.imageCloseTransitionTime = 0.4 * 1000; // in milliseconds
  }
  init() {
    // renders litebox to DOM
    this.render();

    // Loop through items in the gallery and add these set of instructions to each image
    for (let i = 0; i < this.galleryLink.length; i++) {
      // Add click handler to open the litebox
      this.galleryLink[i].addEventListener('click', e => {
        // Prevents html link from opening image file
        e.preventDefault();

        // marks the litebox as being open
        this.openState = true;

        // Makes litebox visible
        this.litebox.style.visibility = 'visible';
        this.litebox.style.opacity = '1';
        // litebox.style.backgroundColor = 'rgba(0,0,0,.8)';

        this.showImage(i);

        this.showCaption(i);

        // Prevents bubbling/closure of litebox when the image or caption is clicked
        // this.liteboxImage.addEventListener('click', e => {
        //   e.stopPropagation();
        //   console.log('liteboxImage propagation stopped');
        // });
        // this.liteboxCaption.addEventListener('click', e => {
        //   e.stopPropagation();
        //   console.log('caption propagation stopped');
        // });
      });
    }

    this.events();
  }

  closeLitebox() {
    // marks the litebox state as being closed
    if (this.openState) {
      console.log('closed litebox');
      this.openState = false;
      this.liteboxLoader.style.visibility = 'hidden';
      this.litebox.style.visibility = 'hidden';
      this.litebox.style.opacity = 0;
      this.litebox.style.pointerEvents = 'none';
      this.liteboxPrevBtn.style.cursor = 'pointer';
      this.liteboxNextBtn.style.cursor = 'pointer';
      this.liteboxPrevBtn.style.borderColor = '#FFF';
      this.liteboxNextBtn.style.borderColor = '#FFF';
      setTimeout(() => {
        this.liteboxImage.style.visibility = 'hidden';
      }, this.imageCloseTransitionTime);
      this.liteboxImage.style.transform = 'translate(-50%, -50%)  scale(1.2)';
      this.body.classList.remove('noscroll');
      this.index = undefined;
    }
  }

  zoomIn() {}

  showPrev() {
    if (this.openState) {
      if (this.index > 0) {
        console.log('show prev');
        this.liteboxImage.style.opacity = 0;
        this.liteboxImage.style.visibility = 'visible';
        this.liteboxCaption.style.opacity = 0;
        setTimeout(() => {
          this.showImage(this.index - 1);
          this.showCaption(this.index);
        }, this.imageCloseTransitionTime);
      } else {
        console.log('No more images.');
      }
    }
  }

  showNext() {
    if (this.openState) {
      if (this.index < this.galleryLink.length - 1) {
        console.log('show next');
        this.liteboxImage.style.opacity = 0;
        this.liteboxImage.style.visibility = 'visible';
        this.liteboxCaption.style.opacity = 0;
        setTimeout(() => {
          this.showImage(this.index + 1);
          this.showCaption(this.index);
        }, this.imageCloseTransitionTime);
      } else {
        console.log('No more images.');
      }
    }
  }

  toggleFullscreen() {
    if (!this.isFullscreen && this.openState) {
      // fullscreen now
      this.isFullscreen = true;
      this.liteboxFullscreenBtn.innerHTML = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 384 384" style="enable-background:new 0 0 384 384;" xml:space="preserve">
     <style type="text/css">
       .st0{fill:#FFFFFF;}
     </style>
     <g>
       <g id="fullscreen_x5F_exit">
         <g>
           <polygon class="st0" points="294.1,328.5 348.9,383.4 382.8,349.6 327.9,294.7 382.8,239.8 239.2,239.8 239.2,383.4 			"/>
           <polygon class="st0" points="0,144.2 143.5,144.2 143.5,0.6 88.7,55.5 34.4,1.1 0.6,35 54.9,89.3 			"/>
           <polygon class="st0" points="0,349.6 33.8,383.4 88.7,328.5 143.5,383.4 143.5,239.8 0,239.8 54.9,294.7 			"/>
           <polygon class="st0" points="239.2,144.2 382.8,144.2 327.9,89.3 382.3,35 348.5,1.1 294.1,55.5 239.2,0.6 			"/>
         </g>
       </g>
     </g>
     </svg>
     `;
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    } else if (this.isFullscreen && this.openState) {
      // not fullscreen now
      this.isFullscreen = false;
      this.liteboxFullscreenBtn.innerHTML = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 384 384" style="enable-background:new 0 0 384 384;" xml:space="preserve">
     <style type="text/css">
       .st0{fill:#FFFFFF;}
     </style>
     <g>
       <g>
         <g>
           <polygon class="st0" points="110.3,243.5 49,305 0,256 0,384 128,384 79,335 140.5,273.7 			"/>
           <polygon class="st0" points="128,0 0,0 0,128 49,79 110.3,140.5 140.5,110.3 79,49 			"/>
           <polygon class="st0" points="256,0 305,49 243.5,110.3 273.7,140.5 335,79 384,128 384,0 			"/>
           <polygon class="st0" points="273.7,243.5 243.5,273.7 305,335 256,384 384,384 384,256 335,305 			"/>
         </g>
       </g>
     </g>
     </svg>`;
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }

  events() {
    // Closes litebox when the ESC key is pressed
    document.addEventListener('keyup', e => {
      if (e.keyCode === 27) this.closeLitebox();
    });

    // Clicking the x button will result in the lightbox being closed.
    this.liteboxCloseBtn.addEventListener('click', () => this.closeLitebox());
    // litebox.addEventListener('click', closeLitebox);

    // Shows previous and next images respectively
    this.liteboxPrevBtn.addEventListener('click', e => {
      e.stopPropagation();
      this.showPrev();
    });

    this.liteboxNextBtn.addEventListener('click', e => {
      e.stopPropagation();
      this.showNext();
    });

    // same as above but is listening to left/right arrow keys
    document.addEventListener('keyup', e => {
      if (e.keyCode === 37) this.showPrev();
    });
    document.addEventListener('keyup', e => {
      if (e.keyCode === 39) this.showNext();
    });

    // Detect swipe left/right to browse. Up/down to close. Uses the Hammer.js library
    let hammer = new Hammer(this.litebox);
    hammer.get('swipe').set({
      direction: Hammer.DIRECTION_ALL
    });
    hammer.on('swiperight', () => this.showPrev());
    hammer.on('swipeleft', () => this.showNext());
    hammer.on('swipeup swipedown', () => this.closeLitebox());

    // Fullscreen
    this.liteboxFullscreenBtn.addEventListener('click', () => {
      this.fullscreenBtnJustClicked = true;
      this.toggleFullscreen();
    });
    // Fullscreen on 'F' key press
    document.addEventListener('keyup', e => {
      if (e.keyCode === 70) {
        this.fullscreenBtnJustClicked = true;
        this.toggleFullscreen();
      }
    });
    // Browser detects fullscreen toggle. Run our toggle function unless fullscreen is closed using ESC key. Note: When ESC is pressed while on fullscreen, we dont want to run our toggle function lest it run and send us back to fullscreen mode
    document.addEventListener(
      'fullscreenchange',
      () => {
        if (!this.fullscreenBtnJustClicked) {
          this.toggleFullscreen();
        } else {
          this.fullscreenBtnJustClicked = false;
        }
      },
      false
    );
    document.addEventListener(
      'webkitfullscreenchange',
      () => {
        // Check if exit fullscreen triggered by ESC key
        if (!this.fullscreenBtnJustClicked) {
          this.toggleFullscreen();
        } else {
          this.fullscreenBtnJustClicked = false;
        }
      },
      false
    );
    document.addEventListener(
      'mozfullscreenchange',
      () => {
        if (!this.fullscreenBtnJustClicked) {
          this.toggleFullscreen();
        } else {
          this.fullscreenBtnJustClicked = false;
        }
      },
      false
    );
  }

  showCaption(i) {
    try {
      var captionText = this.galleryImage[i].dataset.caption;
    } catch (err) {
      console.log('Closed before the next caption could be computed.');
    }
    if (captionText) {
      this.liteboxCaption.innerText = captionText;
      this.liteboxCaption.style.visibility = 'visible';
      this.liteboxCaption.style.opacity = 1;
    } else {
      this.liteboxCaption.style.visibility = 'hidden';
      this.liteboxCaption.style.opacity = 0;
    }
  }

  showImage(i) {
    this.index = i;
    try {
      this.imageURL = this.galleryLink[this.index].getAttribute('href');

      this.liteboxContainer.innerHTML = `<img src="${
        this.imageURL
      }" class="litebox__image ${this.liteboxId}">`;

      // Defining liteboxImage here since the litebox image class doesn't exist until just before this line. We'll use this value a few lines below.
      this.liteboxImage = document.querySelector(
        `.litebox__image.${this.liteboxId}`
      );

      this.litebox.style.pointerEvents = 'auto';

      // displays a loader while image is being loaded
      this.loader();

      this.showImageIndex();

      // This line adds to the body tag a class 'noscroll' defined in our css. This prevents page from being able to scroll while litebox is open.
      this.body.classList.add('noscroll');

      // Change color of arrow to faded once it has reached end of list
      this.disabledArrow();

      if (this.openState) {
        document.addEventListener('mousemove', e => this.autohideNav(e));
        document.addEventListener('keydown', e => this.autohideNav(e));
        document.addEventListener('touchstart', e => this.autohideNav(e));
      }
    } catch (err) {
      console.log('Closed before the next image could be computed.');
    }
  }

  autohideNav(e) {
    // Show nav
    // this.liteboxCaption.style.opacity = 1;
    // this.liteboxPrevBtn.style.opacity = 1;
    // this.liteboxNextBtn.style.opacity = 1;
    // this.liteboxCloseBtn.style.opacity = 1;
    // this.liteboxFullscreenBtn.style.opacity = 1;
    // this.liteboxImageIndex.style.opacity = 1;
    // this.liteboxGradientBG.style.opacity = 1;

    document.querySelector(
      `#${this.liteboxId} .litebox__caption`
    ).style.opacity = 1;
    document.querySelector(
      `#${this.liteboxId} .litebox__prev-btn`
    ).style.opacity = 1;
    document.querySelector(
      `#${this.liteboxId} .litebox__next-btn`
    ).style.opacity = 1;
    document.querySelector(
      `#${this.liteboxId} .litebox__close-btn`
    ).style.opacity = 1;
    document.querySelector(
      `#${this.liteboxId} .litebox__fullscreen-btn`
    ).style.opacity = 1;
    document.querySelector(
      `#${this.liteboxId} .litebox__image-index`
    ).style.opacity = 1;
    document.querySelector(
      `#${this.liteboxId} .litebox__gradient-bg`
    ).style.opacity = 1;

    //Hide nav
    clearTimeout(this.mouseTimer); //resets setTimeout everytime event is triggered
    this.mouseTimer = setTimeout(() => {
      // this.liteboxCaption.style.opacity = 0;
      // this.liteboxPrevBtn.style.opacity = 0;
      // this.liteboxNextBtn.style.opacity = 0;
      // this.liteboxCloseBtn.style.opacity = 0;
      // this.liteboxFullscreenBtn.style.opacity = 0;
      // this.liteboxImageIndex.style.opacity = 0;
      // this.liteboxGradientBG.style.opacity = 0;
      document.querySelector(
        `#${this.liteboxId} .litebox__caption`
      ).style.opacity = 0;
      document.querySelector(
        `#${this.liteboxId} .litebox__prev-btn`
      ).style.opacity = 0;
      document.querySelector(
        `#${this.liteboxId} .litebox__next-btn`
      ).style.opacity = 0;
      document.querySelector(
        `#${this.liteboxId} .litebox__close-btn`
      ).style.opacity = 0;
      document.querySelector(
        `#${this.liteboxId} .litebox__fullscreen-btn`
      ).style.opacity = 0;
      document.querySelector(
        `#${this.liteboxId} .litebox__image-index`
      ).style.opacity = 0;
      document.querySelector(
        `#${this.liteboxId} .litebox__gradient-bg`
      ).style.opacity = 0;
    }, 3 * 1000);
    // e.stopImmediatePropagation();
  }

  disabledArrow(opacity) {
    this.liteboxPrevBtn.style.borderColor = 'white';
    this.liteboxPrevBtn.style.cursor = 'pointer';
    this.liteboxNextBtn.style.borderColor = 'white';
    this.liteboxNextBtn.style.cursor = 'pointer';

    if (this.index === 0) {
      this.liteboxPrevBtn.style.borderColor = '#888';
      this.liteboxPrevBtn.style.cursor = 'not-allowed';
    }
    if (this.index === this.galleryLink.length - 1) {
      this.liteboxNextBtn.style.borderColor = '#888';
      this.liteboxNextBtn.style.cursor = 'not-allowed';
    }
  }

  showImageIndex() {
    this.liteboxImageIndex.innerText =
      this.index + 1 + ' / ' + this.galleryLink.length;
  }

  loader() {
    this.liteboxLoader.style.visibility = 'visible';
    this.liteboxLoader.style.opacity = 1;
    this.liteboxImage.addEventListener('load', () => {
      // The if-statement checks if user has closed litebox before it has fully loaded. If so, it runs the closeLitebox() function.
      if (!this.openState) {
        this.closeLitebox();
      } else {
        this.liteboxLoader.style.visibility = 'hidden';
        this.liteboxLoader.style.opacity = 0;
        setTimeout(() => {
          this.liteboxImage.style.visibility = 'visible';
          this.liteboxImage.style.opacity = '1';
          this.liteboxImage.style.transform = 'translate(-50%, -50%)  scale(1)';
        }, 200);
      }
    });
  }

  render() {
    this.litebox = this.body.appendChild(document.createElement('div'));
    this.litebox.classList.add(`litebox`, this.liteboxId);
    this.litebox.id = this.liteboxId;

    this.liteboxContainer = this.litebox.appendChild(
      document.createElement(`div`)
    );
    this.liteboxContainer.classList.add(`litebox__container`, this.liteboxId);

    this.liteboxGradientBG = this.litebox.appendChild(
      document.createElement(`div`)
    );
    this.liteboxGradientBG.classList.add(
      `litebox__gradient-bg`,
      this.liteboxId
    );

    this.liteboxCloseBtn = this.litebox.appendChild(
      document.createElement(`div`)
    );
    this.liteboxCloseBtn.classList.add(`litebox__close-btn`, this.liteboxId);
    this.liteboxCloseBtn.setAttribute('title', 'Close (Esc)');
    this.liteboxCloseBtn.innerHTML = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 384 384" style="enable-background:new 0 0 384 384;" xml:space="preserve">
 <style type="text/css">
   .st0{fill:#FFFFFF;}
 </style>
 <polygon class="st0" points="383.4,37.4 346.6,0.6 192,155.2 37.4,0.6 0.6,37.4 155.2,192 0.6,346.6 37.4,383.4 192,228.8 
   346.6,383.4 383.4,346.6 228.8,192 "/>
 </svg>
 `;

    this.liteboxFullscreenBtn = this.litebox.appendChild(
      document.createElement(`div`)
    );
    this.liteboxFullscreenBtn.classList.add(
      `litebox__fullscreen-btn`,
      this.liteboxId
    );
    this.liteboxFullscreenBtn.setAttribute('title', 'Fullscreen (F)');
    this.liteboxFullscreenBtn.innerHTML = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 384 384" style="enable-background:new 0 0 384 384;" xml:space="preserve">
 <style type="text/css">
   .st0{fill:#FFFFFF;}
 </style>
 <g>
   <g>
     <g>
       <polygon class="st0" points="110.3,243.5 49,305 0,256 0,384 128,384 79,335 140.5,273.7 			"/>
       <polygon class="st0" points="128,0 0,0 0,128 49,79 110.3,140.5 140.5,110.3 79,49 			"/>
       <polygon class="st0" points="256,0 305,49 243.5,110.3 273.7,140.5 335,79 384,128 384,0 			"/>
       <polygon class="st0" points="273.7,243.5 243.5,273.7 305,335 256,384 384,384 384,256 335,305 			"/>
     </g>
   </g>
 </g>
 </svg>`;

    this.liteboxLoader = this.litebox.appendChild(
      document.createElement(`div`)
    );
    this.liteboxLoader.classList.add(`litebox__loader`, this.liteboxId);

    this.liteboxPrevBtn = this.litebox.appendChild(
      document.createElement(`div`)
    );
    this.liteboxPrevBtn.classList.add(`litebox__prev-btn`, this.liteboxId);

    this.liteboxNextBtn = this.litebox.appendChild(
      document.createElement(`div`)
    );
    this.liteboxNextBtn.classList.add(`litebox__next-btn`, this.liteboxId);

    this.liteboxCaption = this.litebox.appendChild(
      document.createElement(`div`)
    );
    this.liteboxCaption.classList.add(`litebox__caption`, this.liteboxId);

    this.liteboxImageIndex = this.litebox.appendChild(
      document.createElement(`div`)
    );
    this.liteboxImageIndex.classList.add(
      `litebox__image-index`,
      this.liteboxId
    );
  }
}
