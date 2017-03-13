// redirects overwrites for 404 page
var redirects = {
  '/en': '/',
  '/de': '/',
  '/impressum': '/pages/impressum',
  '/datenschutz': '/pages/it-recht-datenschutz',
  '/widerruf': '/pages/it-recht-widerruf',
  '/agb': '/pages/it-recht-agb',
  '/about': '/pages/about-us',
};

/**
 * Get selected element's outer HTML
 * @see http://stackoverflow.com/a/2419877
 */
jQuery.fn.outerHTML = function(s) {
  return s
    ? this.before(s).remove()
    : jQuery("<p>").append(this.eq(0).clone()).html();
};

// JumpLink functions
window.jumplink = window.jumplink || {};

/**
 * 
 */
jumplink.cacheSelectors = function () {
  jumplink.cache = {
    // General
    $html                    : $('html'),
    $body                    : $('body'),
    $htmlBody                : $('html, body'),
    $window                  : $(window),
    $document                : $(document),

    $mainNavbar              : $('#main-navbar'),
    $leftSidebar             : $('#left-sidebar'),
    $rightSidebar            : $('#right-sidebar'),
    $Sidebars                : $('#right-sidebar, #left-sidebar'),
    // $navTree                 : $('#nav-tree'),

    $footer                  : $('[data-toggle="footer"]'),

    $cartCountSelector       : $('.cart-count'),
    $cartButtonSelector      : $('.cart-button'),
    $cartCostSelector        : $('.cart-cost'),

    $barbaWrapper            : $('#barba-wrapper'),
    
    // barba
    lastElementClicked       : null,
    // to scroll to last product
    lastProductDataset       : null,
    lastCollectionDataset       : null
  };
};

/**
 * 
 */
jumplink.init = function () {
  jumplink.cacheSelectors();
};

/**
 * Freeze the position of an Element
 * @see jumplink.unfreezeElements
 */
jumplink.freezeElements = function ($oldContainer, $newContainer, overwriteStyles) {
  var $cloned = null;
  var $oldElements = $oldContainer.find('[data-barba="freeze"]');
  var $newElements = $newContainer.find('[data-barba="freeze"]');
  if(!$oldElements[0]) {
    console.error(new Error('No elements found to freeze!'));
    return;
  }

  $oldElements.each(function( index ) {
    $oldElement = $(this)
    var clientRect = this.getBoundingClientRect();
    var css = {
      bottom: clientRect.bottom,
      height: clientRect.height,
      left: clientRect.left,
      // right: clientRect.right,
      top: clientRect.top,
      width: clientRect.width,
      position: 'fixed'
    }    
    if(overwriteStyles['margin-left']) {
      css['margin-left'] = overwriteStyles['margin-left'];
    }
    
    //console.log('freezeElement', clientRect, css);

    $cloned = $oldElement.clone();
    $cloned.css(css);
    $cloned.attr( 'data-barba', 'cloned' );
    $cloned.clone().appendTo('#barba-wrapper');

    $oldElement.fadeTo(0, 0);
    $oldElement.attr( 'data-barba', 'old' );
  });

  $newElements.each(function( index ) {
    $newElement = $(this)
    $newElement.fadeTo(0, 0);
    $newElement.attr( 'data-barba', 'new' );
  });

  return $oldElements;
};

/**
 * Unfreeze the position of an Element, only possible if you have freezed it before
 * @see jumplink.freezeElements
 */
jumplink.unfreezeElements = function () {
  var result = {
    $cloned: $('[data-barba="cloned"]'),
    $old: $('[data-barba="old"]'),
    $new: $('[data-barba="new"]'),
  }

  result.$old.remove();
  result.$cloned.remove();

  result.$new.attr('data-barba', 'freeze')
  result.$new.fadeTo(0, 1);

  // console.log('unfreezeElements', result);

  return result;
};

/**
 * Init all custom data bindings
 */
jumplink.initDataAttributes = function (dataset) {
  jumplink.initSlickMethods();
  jumplink.initCustomModals();
  jumplink.initColorcard(dataset);
}

/**
 * Set each element of $elements to the height of the heightest element to have all elements with the same height 
 */
jumplink.sameHeightElements = function ($elements, defaultHeight) {
    if(!defaultHeight) {
      defaultHeight = 'auto';
    }
    var t = 0;
    var t_elem;
    // get heightest height
    $elements.each(function () {
        $this = $(this);
        // reset height
        $this.css('min-height', defaultHeight);
        if ( $this.outerHeight() > t ) {
            t_elem=this;
            t=$this.outerHeight();
        }
    });
    
    // set all smaller cards to the height of the heightest card
    $elements.each(function () {
        $this = $(this);
        if($this.outerHeight() != t) {
            $this.css('min-height', t);
        }
    });
}

/**
 * Data bindings to call show/hide colorcard
 */
jumplink.initColorcard = function (dataset) {
  var $toggleColorcard = $('[data-toggle="colorcard"]');

  $toggleColorcard.unbind( 'click' ).bind( 'click', function(event) {
    var $this = $(this);
    var data = $this.data();
    var $target = $(data.target);
    var html =  $this.html();

    // console.log('colocard klick', data, dataset.productImageLast);

    if(!$this.hasClass('toggled')) {
      $target.children().fadeTo( "fast", 0 );
      $target.css('background-image', 'url('+dataset.productImageLast+')');
      $this.addClass('toggled');
      html = html.replace('Show', 'Hide')
    } else {
      $target.css('background-image', 'none');
      $target.children().fadeTo( "fast", 1 );
      $this.removeClass('toggled');
      html = html.replace('Hide', 'Show')
    }
    $this.html(html);
    
  });
}

/**
 * Data bindings to call slick methods with target
 */
jumplink.initSlickMethods = function () {
 
  var $slickMethod = $('[data-slick-method]');
  $slickMethod.unbind( 'click' ).bind( 'click', function() {
    var $this = $(this);
    var data = $this.data();
    var $target = $(data.target);
    var method = data.slickMethod;
    console.log('initSlickMethods', $target, method);
    $target.slick(method);
  });

  var $slickArea = $('[data-area="slick"]');
  var mousePos = {};
  var offset = $slickArea.offset();
  var width = $slickArea.width();
  // $slickArea.mousemove(function(e){
  //   width = $slickArea.width();
  //   mousePos = {
  //       left: e.pageX - offset.left,
  //       top: e.pageY - offset.top,
  //   };
  //   // TODO custom image https://css-tricks.com/almanac/properties/c/cursor/
  //   console.log('mousePos', mousePos, width);
  // });
}

/**
 * Data bindings for custom modals
 */
jumplink.initCustomModals = function () {
  var $modalNoTouch = $('[data-toggle="modal-no-touch"]');

  $modalNoTouch.unbind( 'click' ).bind( 'click', function(event) {

    // do not open modal on touch devices
    if(jumplink.isTouchDevice()) {
      return;
    }

    var $this = $(this);
    var data = $this.data();
    var backdrop = data.backdrop;
    var target = data.target;
    $(target).modal({
      backdrop: backdrop
    });
  });
}


/**
 * Utilities / Helper functions
 */


/**
 * Detect if current device is a touch device
 * 
 * @see https://github.com/Modernizr/Modernizr/blob/master/feature-detects/touchevents.js
 */
jumplink.isTouchDevice = function () {
  if(platform.name === 'Epiphany') {
    return false;
  }
  return ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
}

/**
 * featureTest( 'position', 'sticky' )
 * @see https://github.com/filamentgroup/fixed-sticky/blob/master/fixedsticky.js
 */
jumplink.featureTest = function ( property, value, noPrefixes ) {
  // Thanks Modernizr! https://github.com/phistuck/Modernizr/commit/3fb7217f5f8274e2f11fe6cfeda7cfaf9948a1f5
  var prop = property + ':',
    el = document.createElement( 'test' ),
    mStyle = el.style;

  if( !noPrefixes ) {
    mStyle.cssText = prop + [ '-webkit-', '-moz-', '-ms-', '-o-', '' ].join( value + ';' + prop ) + value + ';';
  } else {
    mStyle.cssText = prop + value;
  }
  return mStyle[ property ].indexOf( value ) !== -1;
}

/**
 * Preloading images with jQuery with callback after image is loaded
 * 
 * @see http://stackoverflow.com/a/476681/1465919
 * @see https://perishablepress.com/3-ways-preload-images-css-javascript-ajax/
 */
jumplink.preloadImage = function ($element, src, srcOrignal, cb) {
  return $(new Image()).attr("src", src).load(function() {
    $image = $(this);
    $image.unbind('load');
    return cb($element, src, srcOrignal, $image);
  });
}

jumplink.preloadImages = function (arrayOfImages) {
  $(arrayOfImages).each(function() {
    jumplink.preloadImage(this);
  });
}

/**
 * 
 */
jumplink.replaceNoImage = function() {
  var $images = $('[src*="no-image-compact.gif"]');
  $images.each(function(index) {
    var $this = $(this);
    $this.attr('src', window.product.noImageSrc);
  });
}

/**
 * 
 */
jumplink.getHash = function () {
  return window.location.hash;
};

/**
 * 
 */
jumplink.updateHash = function (hash) {
  return window.location.hash = hash;
};

/**
 * 
 */
jumplink.removeHash = function () {
  return history.pushState("", document.title, window.location.pathname + window.location.search);
};

/**
 * get hostname an path of url
 * æsee http://stackoverflow.com/a/736970/1465919
 */
jumplink.getUrlLocation = function(href) {
  var l = document.createElement("a");
  l.href = href;
  return l;
};

/* =======================================================================
  Reading query parameters and storing them in a Shopify.queryParams object.
  Necessary for collection sorting and advanced collection filtering.
======================================================================= */

Shopify.queryParams = {};
if (location.search.length) {
  for (var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&'); i < aCouples.length; i++) {
    aKeyValue = aCouples[i].split('=');
    if (aKeyValue.length > 1) {
      Shopify.queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(aKeyValue[1]);
    }
  }
}

/**
 * TODO fix for slick
 */
jumplink.switchImage = function(newImageSrc, newImage, mainImageDomEl) {
  // newImageSrc is the path of the new image in the same size as originalImage is sized.
  // newImage is Shopify's object representation of the new image, with various attributes, such as scr, id, position.
  // mainImageDomEl is the passed domElement, which has not yet been manipulated. Let's manipulate it now.
  $(mainImageDomEl).parents('a').attr('href', newImageSrc.replace('_grande', '_1024x1024'));
  $(mainImageDomEl).attr('src', newImageSrc);  
};

(function(proxied) {
  window.alert = function() {
    // do something here
    return proxied.apply(this, arguments);
  };
})(console.log);

jumplink.goTo = function (href) {
  if(Barba) {
    Barba.Pjax.goTo(href);
  } else {
    window.location.href = href;
  }
}


jumplink.setBarbaContainerMinHeight = function (selector) {
  if(!selector) {
    selector = '.barba-container';
  }
  var top = jumplink.getNavHeight();
  var bottom = jumplink.cache.$footer.outerHeight();
  var height = jumplink.cache.$window.height() - top - bottom;
  $(selector).css( 'min-height', height+'px');
  return height;
}

/**
 * Change #search field with if active
 */
var initSearchField = function () {
  $('#search-field').focus(function() {
    var $this = $(this);

    var maxWidth = $this.closest('.container').width();

    $this.closest('form').animate({
      width: maxWidth
    }, 500, function() {
      // Animation complete.
    });
  }).focusout(function() {
    var $this = $(this);
    $this.closest('form').animate({
      width: '100px'
    }, 500, function() {
      // Animation complete.
    });
  });
}

/**
 * Cause back button to close Bootstrap modal windows
 * @see https://gist.github.com/thedamon/9276193
 */
var initModalHistoryBack = function () {
  $(".modal").on("shown.bs.modal", function()  { // any time a modal is shown
    var urlReplace = "#" + $(this).attr('id'); // make the hash the id of the modal shown
    history.pushState(null, null, urlReplace); // push state that hash into the url
  });

  // If a pushstate has previously happened and the back button is clicked, hide any modals.
  jumplink.cache.$window.on('popstate', function() { 
    $(".modal").modal('hide');
  });
}

jumplink.getShopifyAdminBarHeight = function () {
  return Number(jumplink.cache.$html.css('padding-top').replace("px", ""));
}

/**
 * 
 */
jumplink.getNavHeight = function () {
  return jumplink.cache.$mainNavbar.outerHeight(true);
}

// TODO
jumplink.toggleSidebar = function () {
  $( '.navbar-toggle' ).click();
}

/**
 * @see http://dcdeiv.github.io/simpler-sidebar/
 */
var initRightSidebar = function () {
  // init tree before sidebar to cache tree events in sidebar to close the sidebar
  var closingLinks = '.close-sidebar';
  var align = 'right';
  var trigger = '[data-toggle="sidebar"][data-target="#right-sidebar"]';
  var mask = true;

  var $rightSidebar = jumplink.cache.$rightSidebar.simplerSidebar({
    attr: "simplersidebar",
    init: "closed",
    top: 0,
    align: align, // sidebar.align
    gap: 64, // sidebar.gap
    animation: {
      duration: 500,
      easing: "swing"
    },
  selectors: {
      trigger: trigger, // opener
      quitter: closingLinks // sidebar.closingLinks
    },
    sidebar: {
      width: 300
    },
    mask: {
      display: mask,
      css: {
        backgroundColor: "black",
        opacity: 0.5,
        filter: "Alpha(opacity=50)",
        'z-index': 998,
      }
    },
    events: {
      on: {
        animation: {
          open: function() {
            // icon animation for open
            transformicons.transform($('.sidebar-toggler.tcon')[ 0 ]);
          },
          close: function() {
            // icon animation for close
            transformicons.revert($('.sidebar-toggler.tcon')[ 0 ]);
          },
          both: function() {

          },
        }
      },
      callbacks: {
        animation: {
          open: function() {

          },
          close: function() {

          },
          both: function() {
            
          },
          freezePage: true
        }
      }
    }
  });

  jumplink.cache.$window.resize(function() {
    jumplink.cache.$Sidebars.css( 'padding-top', jumplink.getNavHeight()+'px');
  });
  jumplink.cache.$Sidebars.css( 'padding-top', jumplink.getNavHeight()+'px');
}

/**
 * 
 */
var initNavbar = function () {
  
  initRightSidebar();

  jumplink.cache.$Sidebars.css( 'padding-top', jumplink.getNavHeight()+'px');

  var $dropdownElements= $('.designer-dropdown-col');

  jumplink.cache.$window.on('resize', function() {
    // Same height for designer dropdown columns, to make the borders equal
    jumplink.sameHeightElements($dropdownElements);
    // padding top for fixed navbar
    jumplink.cache.$html.css( 'padding-top', jumplink.getNavHeight()+'px');
  });
  jumplink.sameHeightElements($dropdownElements);
  jumplink.cache.$html.css( 'padding-top', jumplink.getNavHeight()+'px');

  // Simulate Dropdown hover effekt
  jumplink.cache.$mainNavbar.find('.dropdown').hover(function(event){
    var $this = $(this);
    
    if($this.hasClass('cart-button')) {
      // only show cart if it has content
      if($this.hasClass('has-content')) {
        $this.addClass('show');
      }
    } else {
      // $this.addClass('show');
    }
    // $('.dropdown-toggle', this).trigger('click'); 
  },
  function(event) {
      // $(this).removeClass('show');
  });
}

/**
 * Barba.js Slide and fade transition
 * Slide for product pages
 * fade for all others
 * 
 * @see http://barbajs.org/demo/nextprev/nextprev.js
 */
var MovePage = Barba.BaseTransition.extend({
  start: function() {
    /**
     * This function is automatically called as soon the Transition starts
     * this.newContainerLoading is a Promise for the loading of the new container
     * (Barba.js also comes with an handy Promise polyfill!)
     */
    this.$oldContainer = $(this.oldContainer);
    this.originalThumb = jumplink.cache.lastElementClicked; // for what is this?
    this.$lastElementClicked = $(jumplink.cache.lastElementClicked);
    this.url = this.$lastElementClicked.attr('href');

    // this.currentUrl = window.location.href;
    // this.currentUrlLocation = jumplink.getUrlLocation(this.currentUrl);
    
    // var collectionUrl = '/collections/' + dataset.collectionHandle;
    // var allProductsUrl = currentUrlLocation.origin+collectionUrl+'?page=all';

    // console.log("barba currentUrlLocation", this.currentUrlLocation);

    // As soon the loading is finished and the old page is faded out, let's fade the new page
    Promise
      .all([this.newContainerLoading, this.beforeMove()])
      .then(this.scrollTop())
      .then(this.afterMove.bind(this));

  },

  // logic before any effect applies
  beforeMove: function() {

    // if true use slide effect else use fade out effect
    if(this.$oldContainer.data().namespace === 'product' && (this.$lastElementClicked.hasClass('next') || this.$lastElementClicked.hasClass('prev')) ) {
      // slide effekt, in this step do nothing
      var deferred = Barba.Utils.deferred();
      deferred.resolve();
      return deferred.promise;
    } else {
      // fade out
      return this.fadeOut();
    }

  },

  afterMove: function() {
    this.$newContainer = $(this.newContainer);
    
    // var minHeight = jumplink.setBarbaContainerMinHeight(this.newContainer);
    
    if( this.$oldContainer.data().namespace === 'product' && this.$newContainer.data().namespace === 'product' && (!this.url || this.url.indexOf('src=recomatic') === -1) && !this.$lastElementClicked.hasClass('cart-link')) {
      // slide effekt
      return this.slidePages();
    } else {
      // fade out
      return this.fadeIn();
    }
  },

  // slide effect implementation
  slidePages: function() {
    var _this = this;
    var goingForward = true;

    if ( _this.$oldContainer.data().productUrl === _this.$newContainer.data().productNextUrl ) {
      goingForward = false;
    }

    var minHeight = jumplink.setBarbaContainerMinHeight(_this.$newContainer);
    var top = jumplink.getNavHeight();

    jumplink.cache.$html.css({'overflow': 'hidden'});
    jumplink.cache.$body.css({'overflow-x': 'hidden'});

    jumplink.freezeElements(_this.$oldContainer, _this.$newContainer, {
      // 'margin-left': '7.5px',
    });

    TweenLite.set(this.newContainer, {
      visibility: 'visible',
      xPercent: goingForward ? 100 : -100,
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      'padding-top': top,
      'min-height': minHeight,
    });

    TweenLite.to(_this.oldContainer, 0.6, { xPercent: goingForward ? -100 : 100 });
    TweenLite.to(_this.newContainer, 0.6, { xPercent: 0, onComplete: function() {

      TweenLite.set(_this.newContainer, {
        clearProps: 'all',
      });

      TweenLite.set(_this.newContainer, {
        'min-height': minHeight
      });

      jumplink.unfreezeElements();

      jumplink.cache.$html.css({'overflow': ''});
      jumplink.cache.$body.css({'overflow-x': ''});

      _this.done();
    }});

  },

  // fade out effect implementation
  fadeOut: function() {
    /**
     * this.oldContainer is the HTMLElement of the old Container
     */
    return this.$oldContainer.animate({ opacity: 0 }).promise();
  },

  // fade new content in effect
  fadeIn: function() {
    /**
     * this.newContainer is the HTMLElement of the new Container
     * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden-xs-up)
     * Please note, newContainer is available just after newContainerLoading is resolved!
     */
    var _this = this;

    this.$oldContainer.hide();

    // var minHeight = jumplink.setBarbaContainerMinHeight(this.$newContainer);

    this.$newContainer.css({
      visibility : 'visible',
      opacity : 0,
      // 'min-height': minHeight,
    });

    var offset = 0;
    var target = 0;
    var position = { y: window.pageYOffset };
    var $lastPosition = null;

    // scroll to old product in collection if last page was a product
    if( this.$oldContainer.data().namespace === 'product' && this.$newContainer.data().namespace === 'collection') {
      console.log('scroll to last product');
      $lastPosition = $('#'+jumplink.cache.lastProductDataset.handle);
      if($lastPosition.length >= 1) {
        target = $lastPosition.offset().top - offset;
      }
    }

    // scroll to old collection
    if( this.$oldContainer.data().namespace === 'collection' && this.$newContainer.data().namespace === 'list-collections') {
      console.log('scroll to last collection');
      $lastPosition = $('#'+jumplink.cache.lastCollectionDataset.handle);
      if($lastPosition.length >= 1) {
        target = $lastPosition.offset().top - offset;
      }
    }

    // scroll to old position or 0
    TweenLite.to(position, 0.4, {
      y: target,
      onUpdate: function() {
        if (position.y === 0) {

        }
        window.scroll(0, position.y);
      },
      onComplete: function() {

      }
    });

    this.$newContainer.animate({ opacity: 1 }, 400, function() {
      /**
       * Do not forget to call .done() as soon your transition is finished!
       * .done() will automatically remove from the DOM the old Container
       */
      _this.done();
    });
  },

  // scroll to top of the page
  scrollTop: function() {
    var deferred = Barba.Utils.deferred();
    var position = { y: window.pageYOffset };

    TweenLite.to(position, 0.4, {
      y: 0,
      onUpdate: function() {
        if (position.y === 0) {
          deferred.resolve();
        }

        window.scroll(0, position.y);
      },
      onComplete: function() {
        deferred.resolve();
      }
    });

    return deferred.promise;
  },

});


/**
 * Get Image of E-Mail by Gravawtar
 * @see https://stackoverflow.com/questions/705344/loading-gravatar-using-$
 */
jumplink.getGravatar = function (emailOrHash, classes, withHash, placeholder) {
  var src = null;

  if(typeof(emailOrHash) === 'undefined' || emailOrHash === null || !emailOrHash.length) {
    return console.error("Gravatar need an email or hash");
  }

  if(typeof(withHash) === 'undefined' || withHash !== true) {
    emailOrHash = md5(emailOrHash);
  }

  src = '//www.gravatar.com/avatar/' + emailOrHash;

  if(placeholder) {
    src += '?d=' + encodeURI('https:'+placeholder);
  }

  //console.log("getGravatar", emailOrHash, classes, withHash, placeholder, src);

  var $image = $('<img>').attr({src: src}).addClass(classes);
  return $image;
}

/**
 * 
 */
var initGravatarElements = function (selector, classes) {
  if(!classes) {
    classes = "";
  }
  $articles = $(selector);
  $articles.find('gravatar').each(function(index, gravatar) {
    var $gravatar = $(gravatar);
    var emailOrHash = null;
    var withHash = false;
    var placeholder = null;
    var data = $gravatar.data();

    if(data.placeholders) {
      placeholder = data.placeholders[ProductJS.Utilities.rand(0, data.placeholders.length-1)];
    }

    //console.log("data", data);

    if( data.email ) {
      emailOrHash = $gravatar.data('email');
      withHash = false;
    }

    if( data.hash ) {
      emailOrHash = $gravatar.data('hash');
      withHash = true;
    }

    if(data.replace) {
      $image = jumplink.getGravatar(emailOrHash, classes+" "+$gravatar.attr('class'), withHash, placeholder);    
      $gravatar.replaceWith($image);
    } else {
      $image = jumplink.getGravatar(emailOrHash, classes, withHash, placeholder);    
      $gravatar.empty().append($image);
    }
    
    
  });
}

/**
 * 
 */
var initLogin = function(dataset) {
  var resetPassword = false;
  var $recoverPasswordLink     = $('.RecoverPassword, #RecoverPassword');
  var $hideRecoverPasswordLink = $('#HideRecoverPasswordLink');
  var $recoverPasswordForm     = $('#RecoverPasswordForm');
  var $customerLoginForm       = $('#CustomerLoginForm');
  var $passwordResetSuccess    = $('#ResetSuccess');
  var $NewShopMessage          = $('#NewShopMessage');
  var $formErrorsSelector      = $('.form-errors-selector');
  var $resetPasswordSuccessSelector = $( '#resetPasswordSuccessSelector' );
  var $formErrorMessages       = $('#formErrorMessages');

   $formErrorMessages.hide();
   $passwordResetSuccess.hide();
   

  // if #resetPasswordSuccessSelector exists
  if ( $resetPasswordSuccessSelector.length ) {
    resetPassword = true;
  }

  // if .form-errors-selector exists
  /**
   * All form error message are hidden-xs-up.
   * Go to each form error, get the html an place it in a seperate alert message over the form
   */
  if ( $formErrorsSelector.length ) {
    
    $formErrorsSelector.each(function(index, element) {
      $element = $(element);
      if($element.html()) {
        $formErrorMessages.append($element.html());
        // alertify.error($element.html());
        $formErrorMessages.show();
      }
      
    });
    
  }

  var showRecoverPasswordForm = function() {
    $recoverPasswordForm.show();
    $customerLoginForm.hide();
    jumplink.updateHash('#recover');
  }

  var hideRecoverPasswordForm = function() {
    $recoverPasswordForm.hide();
    $customerLoginForm.show();
  }

  $recoverPasswordLink.on('click', function(evt) {
    evt.preventDefault();
    showRecoverPasswordForm();
  });

  $hideRecoverPasswordLink.on('click', function(evt) {
    evt.preventDefault();
    hideRecoverPasswordForm();
    jumplink.removeHash();
  });

  // Allow deep linking to recover password form
  if (jumplink.getHash() == '#recover') {
    showRecoverPasswordForm();
  }

  if (resetPassword) {
    // console.log("reset passwort success");
    $NewShopMessage.hide();
    $passwordResetSuccess.show();
  }

}; 

/**
 * 
 */
var initPageCarousel = function (dataset) {

  // init featured articles on home
  initGravatarElements('#featured-articles', 'media-object img-circle center-block max-width-30');

  var $slick = $('#'+dataset.pageHandle+'_carousel');

  var slickSettings = {
    accessibility:      Boolean(window.settings[dataset.pageHandle+'_carousel_accessibility'] == 'true'),
    adaptiveHeight:     Boolean(window.settings[dataset.pageHandle+'_carousel_adaptiveHeight'] == 'true'),
    autoplay:           Boolean(window.settings[dataset.pageHandle+'_carousel_autoplay'] == 'true'),
    autoplaySpeed:      Number(window.settings[dataset.pageHandle+'_carousel_autoplaySpeed']),
    arrows:             Boolean(window.settings[dataset.pageHandle+'_carousel_arrows'] == 'true'),
    centerMode:         Boolean(window.settings[dataset.pageHandle+'_carousel_centerMode'] == 'true'),
    centerPadding:      String(window.settings[dataset.pageHandle+'_carousel_centerPadding']),
    cssEase:            String(window.settings[dataset.pageHandle+'_carousel_cssEase']),
    dots:               Boolean(window.settings[dataset.pageHandle+'_carousel_dots'] == 'true' || window.settings[dataset.pageHandle+'_carousel_dots'] == true),
    draggable:          Boolean(window.settings[dataset.pageHandle+'_carousel_draggable'] == 'true'),
    fade:               Boolean(window.settings[dataset.pageHandle+'_carousel_fade'] == 'true'),
    focusOnSelect:      Boolean(window.settings[dataset.pageHandle+'_carousel_focusOnSelect'] == 'true'),
    easing:             String(window.settings[dataset.pageHandle+'_carousel_easing']),
    edgeFriction:       parseFloat(window.settings[dataset.pageHandle+'_carousel_edgeFriction']),
    infinite:           Boolean(window.settings[dataset.pageHandle+'_carousel_infinite'] == 'true'),
    initialSlide:       Number(window.settings[dataset.pageHandle+'_carousel_initialSlide']),
    lazyLoad:           String(window.settings[dataset.pageHandle+'_carousel_lazyLoad']),
    mobileFirst:        Boolean(window.settings[dataset.pageHandle+'_carousel_mobileFirst'] == 'true'),
    pauseOnFocus:       Boolean(window.settings[dataset.pageHandle+'_carousel_pauseOnFocus'] == 'true'),
    pauseOnHover:       Boolean(window.settings[dataset.pageHandle+'_carousel_pauseOnHover'] == 'true'),
    pauseOnDotsHover:   Boolean(window.settings[dataset.pageHandle+'_carousel_pauseOnDotsHover'] == 'true'),
    rows:               Number(window.settings[dataset.pageHandle+'_carousel_rows']),
    slidesPerRow:       Number(window.settings[dataset.pageHandle+'_carousel_slidesPerRow']),
    slidesToShow:       Number(window.settings[dataset.pageHandle+'_carousel_slidesToShow']),
    slidesToScroll:     Number(window.settings[dataset.pageHandle+'_carousel_slidesToScroll']),
    speed:              Number(window.settings[dataset.pageHandle+'_carousel_speed']),
    swipe:              Boolean(window.settings[dataset.pageHandle+'_carousel_swipe'] == 'true'),
    swipeToSlide:       Boolean(window.settings[dataset.pageHandle+'_carousel_swipeToSlide'] == 'true'),
    touchMove:          Boolean(window.settings[dataset.pageHandle+'_carousel_touchMove'] == 'true'),
    touchThreshold:     Number(window.settings[dataset.pageHandle+'_carousel_touchThreshold']),
    useCSS:             Boolean(window.settings[dataset.pageHandle+'_carousel_useCSS'] == 'true'),
    useTransform:       Boolean(window.settings[dataset.pageHandle+'_carousel_useTransform'] == 'true'),
    variableWidth:      Boolean(window.settings[dataset.pageHandle+'_carousel_variableWidth'] == 'true'),
    vertical:           Boolean(window.settings[dataset.pageHandle+'_carousel_vertical'] == 'true'),
    verticalSwiping:    Boolean(window.settings[dataset.pageHandle+'_carousel_verticalSwiping'] == 'true'),
    rtl:                Boolean(window.settings[dataset.pageHandle+'_carousel_rtl'] == 'true'),
    waitForAnimate:     Boolean(window.settings[dataset.pageHandle+'_carousel_waitForAnimate'] == 'true'),
    responsive: [
    {
      breakpoint: rivets.formatters.justDigits(window.settings["bs4-grid-breakpoints-xl"]),
      settings: {
        arrows: true,
        dots: true,
      }
    },
    {
      breakpoint: rivets.formatters.justDigits(window.settings["bs4-grid-breakpoints-lg"]),
      settings: {
        arrows: true,
        dots: true,
      }
    },
    {
      breakpoint: rivets.formatters.justDigits(window.settings["bs4-grid-breakpoints-md"]),
      settings: {
        arrows: true,
        dots: true,
      }
    },
    {
      breakpoint: rivets.formatters.justDigits(window.settings["bs4-grid-breakpoints-sm"]),
      settings: {
        arrows: false,
        dots: false,
      }
    },
    {
      breakpoint: rivets.formatters.justDigits(window.settings["bs4-grid-breakpoints-xs"]),
      settings: {
        arrows: false,
        dots: false,
      }
    }]
  };

  // console.log('initPageCarousel', slickSettings);

  var setSlickControlColor = function (index) {
    var slideColor = 'black';
    if(typeof index !== 'undefined') {
      slideColor = $slick.find('[data-slick-index="'+index+'"]').data('color');
    } else {
      slideColor = $slick.find('.slick-current').data('color');
    }
    $slick.attr('data-color', slideColor);
  }

  // init product photo carousel
  $slick.slick(slickSettings);
  setSlickControlColor();

  $slick.on('beforeChange', function(event, slick, currentSlideIndex, nextSlideIndex){
    setSlickControlColor(nextSlideIndex);
  });
}

/**
 * 
 */
var initArticle = function (dataset) {
  initGravatarElements('.article', 'img-circle center-block max-width-50');
  initGravatarElements('.comments');
  var $formData = $('.barba-form');
  var data = $formData.data();

  if(data) {
    if(formData.formErrors) {
      window.location.hash = '#add-comment-title';
      alertify.error(formData.formErrorsDefaultMessages);
    }

    if(formData.formPostedSuccessfully) {
      window.location.hash = '#comments';
      if(dataset.blogModerated == "true") {
        alertify.delay(500000).success("Ihr Kommentar wurder erfolgreich abgeschickt. Wir werden ihn in nach einem Review in kürze veröffentlichen.");
      } else {
        alertify.delay(500000).success("Ihr Kommentar wurder erfolgreich veröffentlicht. Vielen Dank!");
      }
    }
  }

}

/**
 * 
 */
var initBlog = function (dataset, data) {
  initGravatarElements('article', 'img-circle center-block max-width-50');

  var $sameHeightElements = $('[data-blog-handle="dates"] .article');

  jumplink.cache.$window.on('resize', function() {
    jumplink.sameHeightElements($sameHeightElements, 500);
  });
  jumplink.sameHeightElements($sameHeightElements, 500);
}

/**
 * TODO remove
 * Adding support for product options. See here for details:
 * @see http://docs.shopify.com/support/your-website/themes/can-i-make-my-theme-use-products-with-multiple-options
 * This function comes from template/product.liquid and need möglicherweise rewrite
 * 
 * @see https://github.com/Shopify/Timber/blob/master/templates/product.liquid#L162
 * TOTO use https://cartjs.org/
 */
var selectCallback = function(variant, selector, product) {
  console.log('selectCallback');

  // console.log('selectCallback', variant, selector, product);
  var productHandle = '#handle-'+product.handle;

  if (variant) {

    // Swap image. TODO switch to image variant in carousel
    if (variant.featured_image) {
      var newImage = variant.featured_image; // New image object.
      var mainImageDomEl = $(productHandle+' '+'.product-photo-container img')[0]; // DOM element of main image we need to swap.
      Shopify.Image.switchImage(newImage, mainImageDomEl, jumplink.switchImage); // Define switchImage (the callback) in your theme's JavaScript file.
    }
    
    // Selected a valid variant that is available.
    if (variant.available && window.settings.cart != "false") {

      // Enabling add to cart button.
      $(productHandle+' [name="add"]').removeClass('disabled hidden-xs-up').prop('disabled', false).val(window.translations.cart.general.add_to_cart);

      // Hide qty
      $(productHandle+' .group-quantity-actions').removeClass('hidden-xs-up');

      // Disable Notification BUtton
      $(productHandle+'_bsi').addClass('disabled').prop('disabled', true);
      $(productHandle+'_bsi-from').addClass('hidden-xs-up');
    
      // If item is backordered yet can still be ordered, we'll show special message.
      if (variant.inventory_management && variant.inventory_quantity <= 0) {
        if(variant.title === "Default Title") {
          $(productHandle+' .selected-variant').html(product.title);
        } else {
          $(productHandle+' .selected-variant').html(product.title + ' - ' + variant.title);
        }
        $(productHandle+' .availability').removeClass('InStock OutOfStock').addClass('BackOrder').find('.availability_text').html(window.translations.product.general.backordner_possible);
        
        $(productHandle + ' [name="add"]').val(window.translations.cart.general.pre_order);
        $(productHandle + '_backorder').removeClass('hidden-xs-up');
      } else {
        $(productHandle + ' .availability').removeClass('OutOfStock BackOrder').addClass('InStock').find('.availability_text').html(window.translations.product.general.available);
        $(productHandle + '_backorder').addClass('hidden-xs-up');
      }
      
    } else {
      // Variant is sold out.
      $(productHandle+' .availability').removeClass('InStock BackOrder').addClass('OutOfStock').find('.availability_text').html(window.translations.product.general.sold_out);
      $(productHandle+'_backorder').addClass('hidden-xs-up');
      $(productHandle+' [name="add"]').val(window.translations.product.general.sold_out).addClass('disabled').prop('disabled', true);

      // Show qty
      $(productHandle+' .group-quantity-actions').addClass('hidden-xs-up');

      // Enable Notification Button
      $(productHandle+'_bsi').removeClass('disabled').prop('disabled', false);
      $(productHandle+'_bsi-from').removeClass('hidden-xs-up');
    }
    
    // Whether the variant is in stock or not, we can update the price and compare at price.
    if ( variant.compare_at_price > variant.price ) {
      $(productHandle+' .product-price').replaceWith('<span class="product-price text-danger on-sale" itemprop="price">'+ Shopify.formatMoney(variant.price, window.shop.moneyFormat) +'&nbsp;<s class="product-compare-price text-default">'+'<span>'+Shopify.formatMoney(variant.compare_at_price, window.shop.moneyFormat)+ '</span>'+'</s>'+'</span>');
    } else {
      $(productHandle+' .product-price').replaceWith('<span class="product-price" itemprop="price">'+ Shopify.formatMoney(variant.price, window.shop.moneyFormat) + '</span>' );
    }

  } else {
    // variant doesn't exist.
    $(productHandle+' .product-price').empty();
    $(productHandle+'_backorder').addClass('hidden-xs-up');
    $(productHandle+'_add').val(window.translations.product.general.unavailable).addClass('disabled').prop('disabled', true);
  }

};

var initProductModal = function (product, $slick) {

  // init product photo modal
  var $modal = $('#product-photo-modal-'+product.handle);
  $modal.$slick = $modal.find('.slick-slider');

  var onModalSlickChanges = function(event, slickModal, slickModalCurrentSlide) {
    var currentSlide = $slick.slick('slickCurrentSlide')
    if( currentSlide !== slickModalCurrentSlide) {
      $slick.slick('slickGoTo', slickModalCurrentSlide, true);
    }
    var newSlide = $slick.slick('slickCurrentSlide')
  };

  $modal.on('show.bs.modal', function (e) {
    $this = $(this);
    
    // init modal slick
    if(!$modal.$slick.hasClass('slick-initialized')) {
      // init slick
      $modal.$slick.slick({
        dots: false,
        // variableWidth: true,
        // centerMode: true,
        // centerPadding: 0,
        // appendArrows: $(productHandle+' .product-photo-carousel-arrows'),
        initialSlide: $slick.slick('slickCurrentSlide'),
      });
    } else {
      if( $slick.slick('slickCurrentSlide') !==  $modal.$slick.slick('slickCurrentSlide')) {
         $modal.$slick.slick('slickGoTo', $slick.slick('slickCurrentSlide'), true);
      }
    }

  });

  $modal.on('shown.bs.modal', function (e) {
     $modal.$slick.slick('setPosition');
  });

  // destory bindings on modal hides
  $modal.on('hide.bs.modal', function (e) {
     $modal.$slick.unbind('afterChange', onModalSlickChanges);

    if( $modal.$slick.hasClass('slick-initialized')) {
       $modal.$slick.slick('unslick'); // WORAROUND until gotoslide bug is fixed
    }
  });

  $modal.on('hiden.bs.modal', function (e) {

  });
}

/**
 * 
 */
var initProductCarousel = function (product) {
  // get product handle, load product json and use it for variants
  // var handle = dataset.productHandle;
  var productHandle = '#handle-'+product.handle;

  // init product photo carousel
  var $slick = $('#product-photo-carousel-'+product.handle);
  
  var $slickThums = $(productHandle+' .thumb');
  var slickOptions = {
    dots: false,
    arrows: false,
    // appendArrows: $(productHandle+' .product-photo-carousel-arrows'),
  }



  // init main slick
  if( !$slick.hasClass('slick-initialized') ) {
    // init slick
    $slick.slick(slickOptions);

    // set slick thumb click actions
    $slickThums.each(function(index, value) {
      $thumb = $(this);
      $thumb.click(function(){
        $thumb = $(this);
        $slick.slick('slickGoTo', $thumb.data().index);
      });
    });

  }

  initProductModal(product, $slick);
}

/**
 * 
 */
var initProduct = function (dataset, data) {

  if(!data.product) {
    throw new Error("data need to have an product object");
  }

  jumplink.cache.$document.on('product.bind.after', function(event) {
    jumplink.initDataAttributes(dataset);
    initProductCarousel(data.product);
  });

  jumplink.cache.lastProductDataset = data.product;

  ProductJS.loadProduct(data.product);

}

/**
 * 
 * @see https://help.shopify.com/themes/development/templates/customers-addresses
 */
var initCustomersAddresses = function (dataset) {
  var $AddressCountryNew = $('#AddressCountryNew');

  // Initialize observers on address selectors
  if(!$AddressCountryNew.hasClass('initialized')) {
    new Shopify.CountryProvinceSelector('AddressCountryNew', 'AddressProvinceNew', {
      hideElement: 'AddressProvinceContainerNew'
    });
    $AddressCountryNew.addClass('initialized');
  }

  // Setup province selector on each customer address
  for(i in window.customer.addresses) {
    var address = window.customer.addresses[i];
    var $currentAddressCountry = $('#AddressCountry_'+address.id);
    if(!$AddressCountryNew.hasClass('initialized')) {
      new Shopify.CountryProvinceSelector('AddressCountry_'+address.id, 'AddressProvince_'+address.id, {
        hideElement: 'AddressProvinceContainer_'+address.id}
      );
      $currentAddressCountry.addClass('initialized');
    }
  }

  // Modified contents of customer_area.js (global asset)
  Shopify.CustomerAddress = {
    toggleForm: function(id) {
      var editEl = document.getElementById('EditAddress_'+id);
      editEl.style.display = editEl.style.display == 'none' ? '' : 'none';
      return false;
    },

    toggleNewForm: function() {
      var el = document.getElementById('AddAddress');
      el.style.display = el.style.display == 'none' ? '' : 'none';
      return false;
    },

    destroy: function(id, confirm_msg) {
      if (confirm(confirm_msg || "Are you sure you wish to delete this address?")) {
        Shopify.postLink('/account/addresses/'+id, {'parameters': {'_method': 'delete'}});
      }
    }
  }
}

/**
 * init cart.js
 * 
 * @see https://cartjs.org/
 */
var initCart = function (dataset, data) {
  var $modal = $('#cart-modal');
  $modal.$slick = $modal.find('.slick-slider');

  $.getJSON('/cart.js', function(cart) {
    ProductJS.B2bCart.loadCart(cart);
  });

  $modal.on('show.bs.modal', function (event) {
    var data = $(event.target).data('bs.modal')._config;
    
    var handle = data.productHandle;
    ProductJS.Utilities.getProduct(handle, function (error, product) {
      console.log("show product modal", product);
    });

  });

  $modal.on('shown.bs.modal', function (e) {
    $this = $(this);
    $modal.$slick.slick('setPosition');
     
  });

  // init product photo carousel
  
  
  var slickOptions = {
    dots: false,
    arrows: false,
    // appendArrows: $(productHandle+' .product-photo-carousel-arrows'),
  }

  
  jumplink.cache.$document.on('b2bcart.bind.after', function(event) {
    if( !$modal.$slick.hasClass('slick-initialized') ) {
      $modal.$slick.slick(slickOptions);
    }

  });


  jumplink.cache.$document.on('cart.requestComplete', function(event, cart) {
    // console.log('cart.requestComplete', cart);
  });
}

/**
 * @see snippets/filter-menu-select
 * @see https://apps.shopify.com/power-tools-filter-menu
 */
var initCollectionSelectFilter = function (collectionHandle) {
  var collectionFilterName = "Designer";

  return true; // Currently not uses, so stop here!

  // console.log("initCollectionSelectFilter", collectionHandle);

  /* Product Tag Filters - Good for any number of filters on any type of collection pages */
  /* Brought to you by Caroline Schnapp and Shopify Power Tools */
  var $allFilters = $('.coll-filter-'+collectionHandle);
  $allFilters.selectpicker();
  $allFilters.selectpicker('render');

  // $allFilters.on('hidden-xs-up.bs.select', function (e) {
  //   console.log("bs select changed", e);
  // });

  var onChange = function () {
    //console.log("select changed", this);
    var newTags = [];
    var newCollectionHandle = null;
    $(this).closest('.filter-select, .filter-menu').find('.coll-filter').each(function() {
      var $this = $(this);
      var value = $this.val();

      // if filter has the name uses as main collection
      if( $this.data().filterName == collectionFilterName ) {
        if(!value) {
          newCollectionHandle = 'all';
        } else {
          newCollectionHandle = value;
        }
        
      } else if( value ) {
        newTags.push(value);
      }

    });

    if (newTags.length) {
      var query = newTags.join('+');
      if( newCollectionHandle ) {
        jumplink.goTo('/collections/'+newCollectionHandle+'/'+query);
      } else if( collectionHandle ) {
        jumplink.goTo('/collections/'+collectionHandle+'/'+query);
      } else {
        jumplink.goTo('/collections/all/'+query);
      }
    } else {  
      if(newCollectionHandle) {
        jumplink.goTo('/collections/'+newCollectionHandle);
      } else if( collectionHandle ) {
        jumplink.goTo('/collections/'+collectionHandle);
      } else {
        jumplink.goTo('/collections/all');
      }
    }
  }

  $allFilters.each(function(index, element) {
    $element = $(element);
    $element.change(onChange);
  });
}

/**
 * JavaScript Code for Collection Pages, executed from barba.js
 */
var initCollection = function (dataset, data) {

  // 
  console.log('initCollection', dataset, data);
  jumplink.cache.lastCollectionDataset = {
    handle: dataset.collectionHandle
  }
  
  var $loadAll = $('[data-onclick-load-all]');
  var currentUrl = window.location.href; // Barba.Pjax.getCurrentUrl();
  var currentUrlLocation = jumplink.getUrlLocation(currentUrl);
  var collectionUrl = '/collections/' + dataset.collectionHandle;
  var allProductsUrl = currentUrlLocation.origin+collectionUrl+'?page=all';

  /**
   * Get html for page, e.g. collection/foobar?page=3
   */
  var loadProductsOfPage = function (url, currentPageIndex, pageIndex, $currentContainer, callback) {

    // get url from barba.js cache
    var xhr = Barba.BaseCache.get(url);

    // if no cache for url
    if (!xhr) {
      xhr = Barba.Utils.xhr(url);
      Barba.BaseCache.set(url, xhr);
    }

    console.warn("TODO use ProductJS.Utilities.getPage");
    // https://github.com/luruke/barba.js/blob/master/src/Pjax/Pjax.js#L327
    xhr.then(function(data) {
      // var currentContainer = Barba.Pjax.Dom.getContainer(document.body);
      // var $currentContainer = $(currentContainer);
      var newContainer = Barba.Pjax.Dom.parseResponse(data);
      var $newContainer = $(newContainer);
      var dataset = newContainer.dataset;
      var currentStatus = Barba.Pjax.History.currentStatus();
      currentStatus.namespace = Barba.Pjax.Dom.getNamespace(newContainer);

      var $products = $newContainer.find('[data-product="column"]');

      $products.css({
        visibility : 'visible',
        opacity : 0
      });

      // remove pagination from current page
      $currentContainer.find('[data-pagination-wrapper]').remove();

      // append products to current page
      $currentContainer.find('[data-product="row"]').append($products);

      $products.animate({
        opacity: 1
      }, 400).promise().done(function(){
        return callback(null, {
          index: pageIndex,
          $products: $products,
        });
      });



    });
  }

  /**
   * Get html for all pages of a collection
   */
  var loadAllProducts = function (dataset, currentUrl, cb) {
    var pagesLength = Number(dataset.paginatePagesLength);
    var currentPageIndex = Number(dataset.paginatePagesCurrentIndex);
    var collectionHandle = dataset.collectionHandle;
    var currentContainer = Barba.Pjax.Dom.getContainer(document.body);
    var $currentContainer = $('#barba-wrapper .barba-container');
    
    console.log("loadAllProducts");

    if(isNaN(pagesLength)) {
      pagesLength = 1;
    }

    if($('[data-pagination-wrapper]').length === 0) {
      // console.warn("no pagination, stop loading all products because it is already done", $currentContainer.find('[data-pagination-wrapper]'));
      return cb();
    }

    async.times(pagesLength, function(n, next) {
      var index = n+1;
      var url = currentUrlLocation.origin + collectionUrl + '?page='+index;
      if(index === currentPageIndex) {
        // console.warn('Current Page '+index+' is current index');
        return next(null, null);
      } else {
        // console.log("callback", index);
        return loadProductsOfPage(url, currentPageIndex, index, $currentContainer, next);
      }
    }, function(err, pageObjects) {

      if(err) {
        console.error(err);
        return cb(err);
      }

      var currentContainer = Barba.Pjax.Dom.getContainer(document.body);
      var $currentContainer = $(currentContainer);
      var deferred = Barba.Utils.deferred();
      deferred.resolve($currentContainer.outerHTML());
      
      Barba.BaseCache.set(currentUrl, deferred.promise);
      
      if(currentUrl === allProductsUrl) {
        return cb(null, pageObjects);
      }

      // save url in history
      window.history.pushState(null, null, allProductsUrl);
      Barba.Pjax.History.add(allProductsUrl);

      return cb(null, pageObjects);
    });
  }

  // init load all button click
  var initLoadAll = function (dataset, currentUrl) {
    $loadAll.click(function() {
      loadAllProducts(dataset, currentUrl, function() {
        initCollectionImages();
      });

      return false; // Do not open link
    });
  }

  // init collections images hover effect
  var initCollectionImages = function () {
    if(window.settings.products_hover_image !== "true" && window.settings.products_hover_image !== true) {
      return false;
    }
    var $images = $('[data-image-hover-src]');
    $images.each(function(index, element) {
      $element = $(element);
      var hoverSrc = $element.attr('data-image-hover-src');
      var featuredSrc = $element.attr('data-image-featured-src');
      // preload hover images
      jumplink.preloadImage($element, hoverSrc, featuredSrc, function ($element, hoverSrc, featuredSrc, $image) {
        // unbind old hover bindings
        $element.unbind('mouseenter mouseleave');
        $element.hover(function() {
          $(this).css("background-image", 'url('+hoverSrc+')');
        }, function() {
          $(this).css("background-image", 'url('+featuredSrc+')');
        });
      });

    });
  }

  initCollectionSelectFilter(dataset.collectionHandle);

  // if url is ?page=all or /collections/all load all products
  if(currentUrl === allProductsUrl || currentUrl === '/collections/all') {
    loadAllProducts(dataset, currentUrl, function() {
      initCollectionImages();
    });

  } else {
    initLoadAll(dataset, currentUrl);
    initCollectionImages();
  }
}

/**
 * JavaScript Code for Page Template, executed from barba.js
 */
var initPage = function (dataset) {
  // console.log("initPage", dataset);
  switch(dataset.pageHandle) {
    case 'about-us':
      initPageCarousel(dataset)
    break;
    case 'instashop':
      /**
       * WORAROUND
       * 
       * @see https://apps.shopify.com/foursixty
       * @see https://foursixty.com/dashboard/
       */
      $.getScript( '//foursixty.com/media/scripts/fs.embed.v2.js', function( data, textStatus, jqxhr ) {
        // console.log( data ); // Data returned
        // console.log( textStatus ); // Success
        // console.log( jqxhr.status ); // 200
        // console.log( "Load was performed." );
      });
    break;
    default:
    break;
  }
}

/**
 * 
 */
var initCustomersAccount = function (dataset) {
  if(window.settings.apps_bold_loyalty_points == "true") {
    // init customer bold loyalty point view
    $.getScript( '//loy.boldapps.net/front_end/customer_account_js', function( data, textStatus, jqxhr ) {

    });
  }
}

/**
 * Set all navs and subnavs on navbar to "not active"
 */
var resetNav = function () {
  jumplink.cache.$mainNavbar.find('ul.nav.navbar-nav li').removeClass('active');

  jumplink.cache.$mainNavbar.find('ul.nav.navbar-nav li ul.list-group li.list-group-item').removeClass('active');
}

/**
 * Set nav with selector to active 
 */
var setNav = function (selector) {
   jumplink.cache.$mainNavbar.find('ul.nav.navbar-nav li'+selector).addClass('active');
}

/**
 * Find a active child with collectionHandle and set it and his parent nav to active 
 */
var setParentNav = function (collectionHandle) {
  jumplink.cache.$mainNavbar.find('ul.nav.navbar-nav li ul.list-group li.list-group-item.'+collectionHandle).each(function(index, value) {
    var $this = $(this);
    $this.addClass('active');
    $this.closest('.level-1').addClass('active');
  });
}

/**
 * Find active navs and set them to active
 */
var setNavActive = function(dataset, data) {
  resetNav();
  switch(dataset.namespace) {
    case 'customers-login':
      setNav('.'+dataset.namespace);
    break;
    case 'customers-register':
      setNav('.'+dataset.namespace);
    break;
    case '404':
      setNav('.'+dataset.namespace);
    break;
    case 'article':
      setNav('.blog');
    break;
    case 'blog':
      setNav('.'+dataset.namespace);
    break;
    case 'cart':
      setNav('.cart-button');
    break;
    case 'collection':
      setNav('.'+dataset.collectionHandle);
      setParentNav(dataset.collectionHandle);
    break;
    case 'index':
      setNav('.'+dataset.namespace);
    break;
    case 'list-collections':
    break;
    case 'page':
      setNav('.'+dataset.pageHandle);
    break;
    case 'product':
      setParentNav(dataset.collectionHandle);
    break;
    case 'search':
    break;
    default:
      setNav('.'+dataset.namespace);
    break;
  }
}

var initIndex = function (dataset, data) {
  // https://github.com/stevenschobert/instafeed.js

  var instafeed = new Instafeed({
    clientId: window.settings['home_instafeed_clientId'],
    accessToken: window.settings['home_instafeed_accessToken'],
    template: ProductJS.templates.instafeedItem,
    get: window.settings['home_instafeed_get'],
    tagName: window.settings['home_instafeed_tagName'],
    locationId: window.settings['home_instafeed_locationId'],
    userId: window.settings['home_instafeed_userId'], //JumpLink: '1752935354' Caroline Pezzetta @studiopezzetta: '1046245675'
    sortBy: window.settings['home_instafeed_sortBy'],
    limit: window.settings['home_instafeed_limit'],
    resolution: window.settings['home_instafeed_resolution'],
  });
  instafeed.run();

}

var init404 = function (dataset, data) {
  var parser = document.createElement('a');
  parser.href = Barba.Utils.getCurrentUrl();
  var currentPathname = parser.pathname;
  var lastPath = currentPathname.substr(currentPathname.lastIndexOf('/') + 1);

  lastPath = lastPath.replace(".html","");

  if(redirects[currentPathname]) {
    Barba.Pjax.goTo(redirects[currentPathname]);
  } else {

    var searchIn = [
      'products',
      'collections',
      'pages'
    ]

    for (var i = 0; i < searchIn.length; i++) {
      var url = '/'+searchIn[i] + '/' + lastPath;
      ProductJS.Utilities.urlExists(url, function(status, url) {
        if(status === 200){
          // file was found
          //console.log("exists", url);
          Barba.Pjax.goTo(url);
        }
        else if(status === 404){
          // 404 not found
          console.error("not exists 404", url);
        }
      });
    }

    // use search
    Barba.Pjax.goTo('/search?q='+lastPath.replace(/-/g," "));

  }
}

var initSearch = function(dataset, data) {   
  // if there is just one result, go to them
  if(dataset.searchResultsCount === "1") {
    Barba.Pjax.goTo(dataset.searchResultUrl);
  }
}

var initListCollections = function(dataset, data) {
  console.log('initListCollections', dataset, data);
}

/**
 * Run JavaScript for for special template
 * E.g. templates/product.liquid
 */
var initTemplate = {
  'customers-login': initLogin,
  'customers-register': initLogin,
  'customers-account': initCustomersAccount,
  'customers-addresses': initCustomersAddresses,
  '404': init404,
  'article': initArticle,
  'blog': initBlog,
  'cart': initCart,
  'collection': initCollection,
  'index': initIndex,
  'list-collections': initListCollections,
  'page': initPage,
  'product': initProduct,
  'search': initSearch,
}

/**
 * init Alertify.js
 * 
 * @see https://alertifyjs.org/
 */
var initAlert = function () {
  alertify.parent(document.body);
  alertify.logPosition(window.settings.alertify_position);
  window.alertify = alertify;
}

/**
 * Init Javascripts insite of barba.js
 * 
 * @note see init() for inits outsite of barba.js 
 */
var initTemplates = function () {

  Barba.Dispatcher.on('linkClicked', function(el) {
    jumplink.cache.lastElementClicked = el;
  });

  Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container) {

    var data = ProductJS.Utilities.parseDatasetJsonStrings(container.dataset);

    if(container.dataset.newHash !== "false") {
      jumplink.updateHash(container.dataset.newHash);
    }

    jumplink.replaceNoImage();

    jumplink.initDataAttributes(container.dataset);

    jumplink.setBarbaContainerMinHeight();

    setNavActive(container.dataset, data);

    jumplink.cache.$window.on('resize', function() {
      jumplink.setBarbaContainerMinHeight();
    });

    if(typeof(videojs) !== 'undefined') {
      $('.video-js').each(function () {
        // console.log('init video.js');
        //$this = $(this);
        videojs(this, {
          controlBar: {
            FullscreenToggle: false,
            VolumeControl: false,
            MuteToggle: false,
          }
        }, function(){
          // Player (this) is initialized and ready.
        });
      });
    } else {
      // console.warn("video.js not loaded");
    }

    if(typeof(Hyphenator) !== 'undefined') {
      Hyphenator.run();
    }

    if(typeof(initTemplate[currentStatus.namespace]) === 'function' ) {
      initTemplate[currentStatus.namespace](container.dataset, data);

    } else {
      console.error("Template not defined: "+currentStatus.namespace);
    }

    
  });
}

/**
 * Init barba itself
 */
var initBarba = function () {

  /*
   * Update Google Google Analytics if page is changed with barba
   * 
   * æsee https://developers.google.com/analytics/devguides/collection/analyticsjs/events
   */
  Barba.Dispatcher.on('initStateChange', function(currentStatus) {
    if(window.ga) {
      ga('set', 'location', currentStatus.url);
      ga('send', 'pageview');
    }

    if(typeof(fbq) === 'function') {
      fbq('track', 'ViewContent');
      //console.log("fbq('track', 'ViewContent');");
    }
    	
  });

  /**
   * Next step, you have to tell Barba to use the new Transition
   */
  Barba.Pjax.getTransition = function() {
    /**
     * Here you can use your own logic!
     * For example you can use different Transition based on the current page or link...
     */
    return MovePage;
  };
  
  // activate precache
  Barba.Prefetch.init();
  initTemplates();
  Barba.Pjax.start();
}

var initFooter = function () {
  var $footer = jumplink.cache.$footer;
  var data = $footer.data();
  var $target = $(data.target);
  var $margin = $(data.margin);
  var $htmlBody = jumplink.cache.$htmlBody;
  var $document = jumplink.cache.$document;
  var $window = jumplink.cache.$window;

  var $icon = $('.imprint .iconset.arrow');

  $footer.click(function(event) {
    // open
    if($target.hasClass('hidden-xs-up')) {
      $icon.transition({ 'rotate': '270deg' });
      $target.removeClass('hidden-xs-up');
      var scrollTop = $document.height() - $window.height() + 11; // 'margin-top': '15px' - 'margin-top': '4px'
      $margin.transition({ 'margin-top': '15px' });
      $htmlBody.animate({ scrollTop: scrollTop }, 1000, function () {
        
      });
    // close  
    } else {
      $icon.transition({ 'rotate': '90deg' });
      $margin.transition({ 'margin-top': '4px' }, function () {
        var scrollTop = $target.offset().top - $window.height() - 4;
        $htmlBody.animate({ scrollTop: scrollTop }, 1000, function () {
          $target.addClass('hidden-xs-up');
          jumplink.setBarbaContainerMinHeight();
        });
      });
    }
  });
}

/*
 * Init Javascripts outsite of barba.js
 * 
 * @note see initTemplates() for inits insite of barba.js 
 */
var init = function ($) {

  jumplink.init();

  initFooter();

  initSearchField();
  
  initModalHistoryBack();

  initNavbar();

  initAlert();

  ProductJS.init({
    moneyFormat: window.shop.moneyFormat,
    moneyWithCurrencyFormat: window.shop.moneyWithCurrencyFormat,
    quantity: 10,
  });

  initBarba();
  
}

// run init as soon as jQuery is ready
$(init);
