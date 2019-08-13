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

    this.loadImages();

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
        this.liteboxImage.addEventListener('click', e => {
          e.stopPropagation();
          console.log('liteboxImage propagation stopped');
        });
        this.liteboxCaption.addEventListener('click', e => {
          e.stopPropagation();
          console.log('caption propagation stopped');
        });
      });
    }

    this.events();
  }

  // Image preloader. Starts preload only after entire page has rendered.
  loadImages() {
    window.addEventListener('load', () => {
      for (let i = 0; i < this.galleryLink.length; i++) {
        fetch(this.galleryLink[i].getAttribute('href'));
      }
    });
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
      this.liteboxFullscreenBtn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0 0 192 192" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,192v-192h192v192z" fill="none"></path><g fill="#ffffff"><path d="M63.9,25.5125c-3.5297,0.05517 -6.34834,2.9577 -6.3,6.4875v25.6h-25.6c-2.30807,-0.03264 -4.45492,1.18 -5.61848,3.17359c-1.16356,1.99358 -1.16356,4.45924 0,6.45283c1.16356,1.99358 3.31041,3.20623 5.61848,3.17359h32c3.53448,-0.00035 6.39965,-2.86552 6.4,-6.4v-32c0.02369,-1.72992 -0.65393,-3.39575 -1.87846,-4.61793c-1.22453,-1.22218 -2.89166,-1.89659 -4.62154,-1.86957zM127.9,25.5125c-3.5297,0.05517 -6.34834,2.9577 -6.3,6.4875v32c0.00035,3.53448 2.86552,6.39965 6.4,6.4h32c2.30807,0.03264 4.45492,-1.18 5.61848,-3.17359c1.16356,-1.99358 1.16356,-4.45924 0,-6.45283c-1.16356,-1.99358 -3.31041,-3.20623 -5.61848,-3.17359h-25.6v-25.6c0.02369,-1.72992 -0.65393,-3.39575 -1.87846,-4.61793c-1.22453,-1.22218 -2.89166,-1.89659 -4.62154,-1.86957zM32,121.6c-2.30807,-0.03264 -4.45492,1.18 -5.61848,3.17359c-1.16356,1.99358 -1.16356,4.45924 0,6.45283c1.16356,1.99358 3.31041,3.20623 5.61848,3.17359h25.6v25.6c-0.03264,2.30807 1.18,4.45492 3.17359,5.61848c1.99358,1.16356 4.45924,1.16356 6.45283,0c1.99358,-1.16356 3.20623,-3.31041 3.17359,-5.61848v-32c-0.00035,-3.53448 -2.86552,-6.39965 -6.4,-6.4zM128,121.6c-3.53448,0.00035 -6.39965,2.86552 -6.4,6.4v32c-0.03264,2.30807 1.18,4.45492 3.17359,5.61848c1.99358,1.16356 4.45924,1.16356 6.45283,0c1.99358,-1.16356 3.20623,-3.31041 3.17359,-5.61848v-25.6h25.6c2.30807,0.03264 4.45492,-1.18 5.61848,-3.17359c1.16356,-1.99358 1.16356,-4.45924 0,-6.45283c-1.16356,-1.99358 -3.31041,-3.20623 -5.61848,-3.17359z"></path></g></g></svg>';
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
      this.liteboxFullscreenBtn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0 0 192 192" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,192v-192h192v192z" fill="none"></path><g fill="#ffffff"><path d="M38.4,25.6c-6.9956,0 -12.8,5.8044 -12.8,12.8v25.6c-0.03264,2.30807 1.18,4.45492 3.17359,5.61848c1.99358,1.16356 4.45924,1.16356 6.45283,0c1.99358,-1.16356 3.20623,-3.31041 3.17359,-5.61848v-25.6h25.6c2.30807,0.03264 4.45492,-1.18 5.61848,-3.17359c1.16356,-1.99358 1.16356,-4.45924 0,-6.45283c-1.16356,-1.99358 -3.31041,-3.20623 -5.61848,-3.17359zM128,25.6c-2.30807,-0.03264 -4.45492,1.18 -5.61848,3.17359c-1.16356,1.99358 -1.16356,4.45924 0,6.45283c1.16356,1.99358 3.31041,3.20623 5.61848,3.17359h25.6v25.6c-0.03264,2.30807 1.18,4.45492 3.17359,5.61848c1.99358,1.16356 4.45924,1.16356 6.45283,0c1.99358,-1.16356 3.20623,-3.31041 3.17359,-5.61848v-25.6c0,-6.9956 -5.8044,-12.8 -12.8,-12.8zM31.9,121.5125c-3.5297,0.05517 -6.34834,2.9577 -6.3,6.4875v25.6c0,6.9956 5.8044,12.8 12.8,12.8h25.6c2.30807,0.03264 4.45492,-1.18 5.61848,-3.17359c1.16356,-1.99358 1.16356,-4.45924 0,-6.45283c-1.16356,-1.99358 -3.31041,-3.20623 -5.61848,-3.17359h-25.6v-25.6c0.02369,-1.72992 -0.65393,-3.39575 -1.87846,-4.61793c-1.22453,-1.22218 -2.89166,-1.89659 -4.62154,-1.86957zM159.9,121.5125c-3.5297,0.05517 -6.34834,2.9577 -6.3,6.4875v25.6h-25.6c-2.30807,-0.03264 -4.45492,1.18 -5.61848,3.17359c-1.16356,1.99358 -1.16356,4.45924 0,6.45283c1.16356,1.99358 3.31041,3.20623 5.61848,3.17359h25.6c6.9956,0 12.8,-5.8044 12.8,-12.8v-25.6c0.02369,-1.72992 -0.65393,-3.39575 -1.87846,-4.61793c-1.22453,-1.22218 -2.89166,-1.89659 -4.62154,-1.86957z"></path></g></g></svg>';
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
    this.liteboxCloseBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="26" height="26" viewBox="0 0 192 192" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,192v-192h192v192z" fill="none"></path><g fill="#ffffff"><path d="M51.0625,38.275c-5.20634,0.00645 -9.89015,3.1654 -11.8469,7.99004c-1.95675,4.82464 -0.7966,10.35375 2.9344,13.98496l35.75,35.75l-35.75,35.75c-3.34383,3.21046 -4.6908,7.97781 -3.52143,12.46344c1.16937,4.48563 4.67237,7.98862 9.15799,9.15799c4.48563,1.16937 9.25297,-0.1776 12.46343,-3.52143l35.75,-35.75l35.75,35.75c3.21045,3.34388 7.97782,4.69089 12.46348,3.52152c4.48566,-1.16937 7.98867,-4.67238 9.15804,-9.15804c1.16937,-4.48566 -0.17764,-9.25302 -3.52152,-12.46348l-35.75,-35.75l35.75,-35.75c3.78573,-3.67989 4.92402,-9.30644 2.86636,-14.16848c-2.05765,-4.86204 -6.88913,-7.96214 -12.16636,-7.80652c-3.32542,0.09909 -6.48164,1.4889 -8.8,3.875l-35.75,35.75l-35.75,-35.75c-2.41289,-2.48033 -5.72714,-3.87818 -9.1875,-3.875z"></path></g></g></svg>`;

    this.liteboxFullscreenBtn = this.litebox.appendChild(
      document.createElement(`div`)
    );
    this.liteboxFullscreenBtn.classList.add(
      `litebox__fullscreen-btn`,
      this.liteboxId
    );
    this.liteboxFullscreenBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0 0 192 192" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,192v-192h192v192z" fill="none"></path><g fill="#ffffff"><path d="M38.4,25.6c-6.9956,0 -12.8,5.8044 -12.8,12.8v25.6c-0.03264,2.30807 1.18,4.45492 3.17359,5.61848c1.99358,1.16356 4.45924,1.16356 6.45283,0c1.99358,-1.16356 3.20623,-3.31041 3.17359,-5.61848v-25.6h25.6c2.30807,0.03264 4.45492,-1.18 5.61848,-3.17359c1.16356,-1.99358 1.16356,-4.45924 0,-6.45283c-1.16356,-1.99358 -3.31041,-3.20623 -5.61848,-3.17359zM128,25.6c-2.30807,-0.03264 -4.45492,1.18 -5.61848,3.17359c-1.16356,1.99358 -1.16356,4.45924 0,6.45283c1.16356,1.99358 3.31041,3.20623 5.61848,3.17359h25.6v25.6c-0.03264,2.30807 1.18,4.45492 3.17359,5.61848c1.99358,1.16356 4.45924,1.16356 6.45283,0c1.99358,-1.16356 3.20623,-3.31041 3.17359,-5.61848v-25.6c0,-6.9956 -5.8044,-12.8 -12.8,-12.8zM31.9,121.5125c-3.5297,0.05517 -6.34834,2.9577 -6.3,6.4875v25.6c0,6.9956 5.8044,12.8 12.8,12.8h25.6c2.30807,0.03264 4.45492,-1.18 5.61848,-3.17359c1.16356,-1.99358 1.16356,-4.45924 0,-6.45283c-1.16356,-1.99358 -3.31041,-3.20623 -5.61848,-3.17359h-25.6v-25.6c0.02369,-1.72992 -0.65393,-3.39575 -1.87846,-4.61793c-1.22453,-1.22218 -2.89166,-1.89659 -4.62154,-1.86957zM159.9,121.5125c-3.5297,0.05517 -6.34834,2.9577 -6.3,6.4875v25.6h-25.6c-2.30807,-0.03264 -4.45492,1.18 -5.61848,3.17359c-1.16356,1.99358 -1.16356,4.45924 0,6.45283c1.16356,1.99358 3.31041,3.20623 5.61848,3.17359h25.6c6.9956,0 12.8,-5.8044 12.8,-12.8v-25.6c0.02369,-1.72992 -0.65393,-3.39575 -1.87846,-4.61793c-1.22453,-1.22218 -2.89166,-1.89659 -4.62154,-1.86957z"></path></g></g></svg>`;

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
