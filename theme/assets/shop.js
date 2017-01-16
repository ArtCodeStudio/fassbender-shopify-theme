// redirects overwrites for 404 page
var redirects = {
  '/en': '/',
  '/de': '/',
  '/en/impressum': '/pages/impressum',
  '/de/impressum': '/pages/impressum',
  '/de/datenschutz': '/pages/it-recht-datenschutz',
  '/en/datenschutz': '/pages/it-recht-datenschutz',
  '/de/widerruf': '/pages/it-recht-widerruf',
  '/en/widerruf': '/pages/it-recht-widerruf',
  '/de/agb': '/pages/it-recht-agb',
  '/en/agb': '/pages/it-recht-agb',
  '/de/about': '/pages/about-us',
  '/en/about': '/pages/about-us',
};

/**
 * transformicons
 * 
 * @see http://www.transformicons.com/builder.html
 * 
 * @markup
  <button type="button" class="tcon tcon-menu--xcross" aria-label="toggle menu">
    <span class="tcon-menu__lines" aria-hidden="true"></span>
    <span class="tcon-visuallyhidden">toggle menu</span>
  </button>
  <button type="button" class="tcon tcon-plus tcon-plus--minus" aria-label="add item">
    <span class="tcon-visuallyhidden">add item</span>
  </button>
  <button type="button" class="tcon tcon-search--xcross" aria-label="toggle search">
    <span class="tcon-search__item" aria-hidden="true"></span>
    <span class="tcon-visuallyhidden">toggle search</span>
  </button>
 *
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD module
    define(factory);
  } else if (typeof exports === 'object') {
    // CommonJS-like environment (i.e. Node)
    module.exports = factory();
  } else {
    // Browser global
    root.transformicons = factory();
  }
}(this || window, function () {

  // ####################
  // MODULE TRANSFORMICON
  // ####################
  'use strict';

  var
    tcon = {}, // static class
    _transformClass = 'tcon-transform',

    // const
    DEFAULT_EVENTS = {
      transform : ['click'],
      revert : ['click']
    };

  // ##############
  // private methods
  // ##############

  /**
  * Normalize a selector string, a single DOM element or an array of elements into an array of DOM elements.
  * @private
  *
  * @param {(string|element|array)} elements - Selector, DOM element or Array of DOM elements
  * @returns {array} Array of DOM elements
  */
  var getElementList = function (elements) {
    if (typeof elements === 'string') {
      return Array.prototype.slice.call(document.querySelectorAll(elements));
    } else if (typeof elements === 'undefined' || elements instanceof Array) {
      return elements;
    } else {
      return [elements];
    }
  };

  /**
  * Normalize a string with eventnames separated by spaces or an array of eventnames into an array of eventnames.
  * @private
  *
  * @param {(string|array)} elements - String with eventnames separated by spaces or array of eventnames
  * @returns {array} Array of eventnames
  */
  var getEventList = function (events) {
    if (typeof events === 'string') {
      return events.toLowerCase().split(' ');
    } else {
      return events;
    }
  };

  /**
  * Attach or remove transformicon events to one or more elements.
  * @private
  *
  * @param {(string|element|array)} elements - Selector, DOM element or Array of DOM elements to be toggled
  * @param {object} [events] - An Object containing one or more special event definitions
  * @param {boolean} [remove=false] - Defines wether the listeners should be added (default) or removed.
  */
  var setListeners = function (elements, events, remove) {
    var
      method = (remove ? 'remove' : 'add') + 'EventListener',
      elementList = getElementList(elements),
      currentElement = elementList.length,
      eventLists = {};

    // get events or use defaults
    for (var prop in DEFAULT_EVENTS) {
      eventLists[prop] = (events && events[prop]) ? getEventList(events[prop]) : DEFAULT_EVENTS[prop];
    }
    
    // add or remove all events for all occasions to all elements
    while(currentElement--) {
      for (var occasion in eventLists) {
        var currentEvent = eventLists[occasion].length;
        while(currentEvent--) {
          elementList[currentElement][method](eventLists[occasion][currentEvent], handleEvent);
        }
      }
    }
  };

  /**
  * Event handler for transform events.
  * @private
  *
  * @param {object} event - event object
  */
  var handleEvent = function (event) {
    tcon.toggle(event.currentTarget);
  };

  // ##############
  // public methods
  // ##############

  /**
  * Add transformicon behavior to one or more elements.
  * @public
  *
  * @param {(string|element|array)} elements - Selector, DOM element or Array of DOM elements to be toggled
  * @param {object} [events] - An Object containing one or more special event definitions
  * @param {(string|array)} [events.transform] - One or more events that trigger the transform. Can be an Array or string with events seperated by space.
  * @param {(string|array)} [events.revert] - One or more events that trigger the reversion. Can be an Array or string with events seperated by space.
  * @returns {transformicon} transformicon instance for chaining
  */
  tcon.add = function (elements, events) {
    setListeners(elements, events);
    return tcon;
  };

  /**
  * Remove transformicon behavior from one or more elements.
  * @public
  *
  * @param {(string|element|array)} elements - Selector, DOM element or Array of DOM elements to be toggled
  * @param {object} [events] - An Object containing one or more special event definitions
  * @param {(string|array)} [events.transform] - One or more events that trigger the transform. Can be an Array or string with events seperated by space.
  * @param {(string|array)} [events.revert] - One or more events that trigger the reversion. Can be an Array or string with events seperated by space.
  * @returns {transformicon} transformicon instance for chaining
  */
  tcon.remove = function (elements, events) {
    setListeners(elements, events, true);
    return tcon;
  };

  /**
  * Put one or more elements in the transformed state.
  * @public
  *
  * @param {(string|element|array)} elements - Selector, DOM element or Array of DOM elements to be transformed
  * @returns {transformicon} transformicon instance for chaining
  */
  tcon.transform = function (elements) {
    getElementList(elements).forEach(function(element) {
      element.classList.add(_transformClass);
    });
    return tcon;
  };

  /**
  * Revert one or more elements to the original state.
  * @public
  *
  * @param {(string|element|array)} elements - Selector, DOM element or Array of DOM elements to be reverted
  * @returns {transformicon} transformicon instance for chaining
  */
  tcon.revert = function (elements) {
    getElementList(elements).forEach(function(element) {
      element.classList.remove(_transformClass);
    });
    return tcon;
  };
  
  /**
  * Toggles one or more elements between transformed and original state.
  * @public
  *
  * @param {(string|element|array)} elements - Selector, DOM element or Array of DOM elements to be toggled
  * @returns {transformicon} transformicon instance for chaining
  */
  tcon.toggle = function (elements) {
    getElementList(elements).forEach(function(element) {
      tcon[element.classList.contains(_transformClass) ? 'revert' : 'transform'](element);
    });
    return tcon;
  };

  return tcon;
}));

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

    $newsletterForm          : $('#newsletter-form'),

    $barbaWrapper            : $('#barba-wrapper'),
    
    // barba
    lastElementClicked       : null,
    // to scroll to last product
    lastProductDataset       : null
  };
};

/**
 * 
 */
jumplink.init = function () {
  jumplink.cacheSelectors();
};

/**
 * Get selected product option of an html select
 */
jumplink.getSelectedOption = function ($select) {
  return $select.find('option:selected');
}

/**
 * Get product quantity of an html input
 */
jumplink.getQty = function ($input) {
  var qty = 1;
  if($input.length > 0) {
    qty = parseInt($input.val().replace(/\D/g, ''));
  }
  qty = jumplink.validateQty(qty);
  return qty;

}

/**
 * Custom function a replacement for Shopify.OptionSelectors
 * 
 * @param elementID
 * @param more.product
 * @param more.onVariantSelected
 * @param more.enableHistoryState
 * 
 * @dependency https://silviomoreto.github.io/bootstrap-select/
 */
jumplink.OptionSelectors = function (elementID, more) {
  if(typeof more.onVariantSelected !== 'function') {
    throw new Error('more.onVariantSelected must be a function!');
  }
  var $select = $('#'+elementID);
  var product = more.product;
  var title = null;

  // Add label if only one product option and it isn't 'Title'.
  if (product.options.length == 1 && product.options[0] != 'Title') {
    title = product.options[0];
  }
  
  $select.selectpicker({
    title: title,
  });
  $select.selectpicker('render');


  var selector = {};
  selector.variantIdField = '#'+elementID;
  
  selector.getSelectedOption = function () {
    return jumplink.getSelectedOption($select);
  }
  
  var getVariantID = function (event, clickedIndex) {
    return $(event.currentTarget).find('option').eq( clickedIndex ).val();
  }

  var getVariantByID = function (variantID, product, cb) {
    variantID = Number(variantID);
    product.variants.forEach(function(variant) {
      if(variant.id === variantID) {
        return cb(null, variant);
      }
    }, this);
  }

  var getOptionByVariantID = function (variantID) {
    return $select.find('option:selected').text();
  }

  selector.selectVariant = function (variantID) {
    if(typeof(variantID) !== 'undefined') {
      variantID = Number(variantID);
    } else {
      throw new Error('VariantID is '+variantID);
    }

    $select.selectpicker('val', variantID);
    onSelectChange(variantID);
  }

  var onSelectChange = function (variantID) {
    getVariantByID(variantID, product, function (error, variant) {
      return more.onVariantSelected(variant, selector);
    });
  }

  $select.on('changed.bs.select', function (event, clickedIndex, newValue, oldValue) {
    var variantID = getVariantID(event, clickedIndex);
    onSelectChange(variantID);
  });

  // initial callback
  var $initialSelectedOption = $(selector.getSelectedOption());
  var initialVariantID = $initialSelectedOption.val();
  onSelectChange(initialVariantID);

  return selector;
}

/**
 * Utilities / Helper functions
 */

/**
 * Set each card to the height of the heightest card to get all cards with the same height 
 */
jumplink.sameHeightElements = function ($elements) {
  var t = 0;
  var t_elem;
  // get heightest height
  $elements.each(function () {
    $this = $(this);
    // reset height
    $this.css('min-height', 'auto');
    if ( $this.outerHeight() > t ) {
      t_elem=this;
      t=$this.outerHeight();
    }
  });
  
  // set all smaller element to the height of the heightest card
  $elements.each(function () {
    $this = $(this);
    if($this.outerHeight() != t) {
      $this.css('min-height', t);
    }
  });
}

/**
 * Just get the digits of a string, useful to remove px from css value
 * 
 * @see http://stackoverflow.com/a/1100653/1465919
 */
jumplink.justDigits = function (str) {
  var num = str.replace(/[^-\d\.]/g, '');
  if(isNaN(num)) {
    return 0;
  } else {
    return Number(num);
  }
}

/**
 * Detect if current device is a touch device
 * 
 * @see https://github.com/Modernizr/Modernizr/blob/master/feature-detects/touchevents.js
 */
jumplink.isTouchDevice = function () {
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
 * Generate random number between two numbers
 */
jumplink.rand = function (min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
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
jumplink.validateQty = function (qty) {
  if((parseFloat(qty) == parseInt(qty)) && !isNaN(qty)) {
    // We have a valid number!
  } else {
    // Not a number. Default to 1.
    qty = 1;
  }
  return qty;
};

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

/**
 * Update Cart icon
 * TODO use cartJS Data API to change icon
 */
jumplink.updateCartIcon = function (cart) {
  // update count
  if (jumplink.cache.$cartCountSelector) {
    jumplink.cache.$cartCountSelector.each(function( index ) {
      $( this ).html(cart.item_count).removeClass('hidden-count');
      if (cart.item_count === 0) {
        $( this ).addClass('hidden-count');
      }
    });
  }

  // update cart icon
  if (jumplink.cache.$cartButtonSelector) {
    jumplink.cache.$cartButtonSelector.each(function( index ) {
      $( this ).removeClass('has-content');
      if (cart.item_count > 0) {
        $( this ).addClass('has-content');
      }
    });
  }

  // update price
  if (jumplink.cache.$cartCostSelector) {
    jumplink.cache.$cartCostSelector.each(function( index ) {
      $( this ).html(Shopify.formatMoney(cart.total_price, settings.moneyFormat));
    });
  }
}


/**
 * Update Cart
 * 
 * @param cart (optional): the cart object if you have
 * @param force (optional): Force reloading the cart
 * @param cb (optional): Callback function(err, cart)
 */
jumplink.updateCart = function (cart, force, cb) {
  if(force === true) {
    jumplink.reloadCartJS(cart, function(err, cart) {
      jumplink.updateCartIcon(cart);
      // CartJS.getCart();
      if(typeof(cb) === 'function') {
        cb(err, cart);
      }
    });
  }
  if( typeof(cart) === 'undefined' || cart === null) {
    $.getJSON('/cart.js', function(cart) {
      jumplink.updateCartIcon(cart);
      // CartJS.getCart();
      if(typeof(cb) === 'function') {
        cb(null, cart);
      }
    });
  } else {
    jumplink.updateCartIcon(cart);
    // CartJS.getCart();
    if(typeof(cb) === 'function') {
      cb(null, cart);
    }
  }
}

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

/**
 * Change #search field with if active
 */
var initSearchField = function () {
  $('#search-field').focus(function() {
    var $this = $(this);

    var maxWidth = $this.closest('.container-fluid').width();

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

/**
 * 
 */
var getMainNavHeight = function () {
  return jumplink.cache.$mainNavbar.outerHeight(true);
}

/**
 * 
 */
var getAllNavsHeight = function () {
  return getMainNavHeight();
}

jumplink.goTo = function (href) {
  if(Barba) {
    Barba.Pjax.goTo(href);
  } else {
    window.location.href = href;
  }
}

/**
 * Appmate Wishlist King
 * Custom product select callback for appmate wishlist
 * @see https://apps.shopify.com/wishlist-king
 */
var appmateSelectCallback = function(variant, selector) {
  var shop = Appmate.wk.globals.shop;
  var product = Appmate.wk.getProduct(variant.product_id);
  var itemId = $(selector.variantIdField).parents('[data-wk-item]').attr('data-wk-item');
  var container = $('#wk-item-' + itemId);

  if (variant) {
    // console.log("updateItem", variant);
    Appmate.wk.updateItem(itemId, {selected_variant_id: variant.id});
  }

  var imageUrl = '';

  if (variant && variant.image) {
    imageUrl = Appmate.wk.filters.img_url(variant, 'large');
  } else if (product) {
    imageUrl = Appmate.wk.filters.img_url(product, 'large');
  }

  if (imageUrl) {
    container.find('.wk-variant-image').attr('src', imageUrl);
  } else {

  }
  var formatMoney = Appmate.wk.filters.money;
  if(product.metafields && product.metafields.global && (product.metafields.global.Saleable === "nein" || product.metafields.global.Saleable === false || product.metafields.global.Saleable === 0 )) {
    container.find('.wk-add-to-cart').addClass('disabled').attr('disabled', 'disabled').attr('value', window.translations.cart.general.can_not_add_to_cart);
  } else if (variant && (variant.available || variant.inventory_policy === 'continue')) {
    container.find('.wk-add-to-cart').removeAttr('disabled').removeClass('disabled').attr('value', window.translations.cart.general.add_to_cart);
    if(variant.price < variant.compare_at_price){
      container.find('.wk-price-preview').html("<span class='saleprice text-success'>" + formatMoney(variant.price) + "</span>" + " <small><del>" + formatMoney(variant.compare_at_price) + "</del></small>");
    } else {
      container.find('.wk-price-preview').html(formatMoney(variant.price));
    }
  } else {
    container.find('.wk-add-to-cart').addClass('disabled').attr('disabled', 'disabled').attr('value', window.translations.product.general.sold_out);
    var message = variant ? window.translations.product.general.sold_out: window.translations.product.general.unavailable;
    container.find('.wk-price-preview').text(message);
  }
};

/**
 * Appmate Wishlist King
 * handle option selection
 * @see https://apps.shopify.com/wishlist-king
 */
function appmateOptionSelect(el){
  if (!Shopify || !Shopify.OptionSelectors) {
    throw new Error('Missing option_selection.js! Please check templates/page.wishlist.liquid');
  }

  var $el = $(el);
  var id = el.getAttribute('id');
  var itemId = $(el).parents('[data-wk-item]').attr('data-wk-item');
  var container = $('#wk-item-' + itemId);

  Appmate.wk.getItem(itemId).then(function(product){
    // Original
    // var selector = new Shopify.OptionSelectors(id, {
    //     product: product,
    //     onVariantSelected: appmateSelectCallback,
    //     enableHistoryState: false
    // });

    // Own Implementation
    var selector = jumplink.OptionSelectors(id, {
        product: product,
        onVariantSelected: appmateSelectCallback,
        enableHistoryState: false
    });

    if (product.selected_variant_id) {
        selector.selectVariant(product.selected_variant_id);
    }

  });
}

/**
 * Appmate Wishlist King
 * init wishlist
 * @see https://apps.shopify.com/wishlist-king
 */
var initAppmateWishlist = function () {
  if (typeof Appmate === 'undefined') {
    return console.warn("Appmate not installed");
  }

  //console.log("Appmate loaded");

  var fadeOrNot = function($elem, callback) {

    if($elem.hasClass('wk-fadeout')) {
      $elem.fadeOut(callback);
    } else {
      if ($elem.parents('.wk-fadeout').length) {
        $elem.parents('.wk-fadeout').fadeOut(callback);
      } else {
        callback();
      }
    }
  }

  Appmate.wk.on({
    'click [data-wk-add-product]': function(event){
      var $this = $(this);
      var product = this.getAttribute('data-wk-add-product');
      var variant = $this.parents('form').find('select[name="id"]').val();
      var productData = $this.parents('.barba-container').data();

      if(productData.productTitle) {
        var productTitle = productData.productTitle;
      } else {
        var productTitle = $this.closest('.wk-item-column').find('.wk-product-sub-title').text();
      }

      Appmate.wk.addProduct(product, variant);
      alertify.success(window.translations.wishlist.general.added.replace('[title]', productTitle));

      if(typeof(fbq) === 'function') {
        fbq('track', 'AddToWishlist');
      }

    },
    'click [data-wk-remove-product]': function(event){
      var $this = $(this);
      var product = this.getAttribute('data-wk-remove-product');
      var productData = $this.parents('.barba-container').data();

      if(productData.productTitle) {
        var productTitle = productData.productTitle;
      } else {
        var productTitle = $this.closest('.wk-item-column').find('.wk-product-sub-title').text();
      }

      Appmate.wk.removeProduct(product);
      alertify.success(window.translations.wishlist.general.removed.replace('[title]', productTitle));
    },
    'click [data-wk-remove-item]': function(event){
      var $this = $(this);
      var item = this.getAttribute('data-wk-remove-item');
      var productTitle = $this.closest('.wk-item-column').find('.wk-product-sub-title').text();

      fadeOrNot($this.parents('.wk-item-column'), function() {
        Appmate.wk.removeItem(item);
        alertify.success(window.translations.wishlist.general.removed.replace('[title]', productTitle));
      });
    },
    'click [data-wk-clear-wishlist]': function(event){
      var wishlist = this.getAttribute('data-wk-clear-wishlist');
      Appmate.wk.clear(wishlist);
      alertify.success(window.translations.wishlist.general.emptied);
    },
    'click [data-wk-share]': function(){
      var wishlist = this.getAttribute('data-wk-share');
      var service = this.getAttribute('data-wk-share-service');
      //console.log("wishlist", wishlist);
      //console.log("service", service);
      var shareUrl = Appmate.wk.createShareUrl(wishlist, service);
      window.open(
        shareUrl,
        'wishlist_share',
        'height=590, width=770, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, directories=no, status=no'
      );
      event.preventDefault();
      event.stopPropagation();
    },
    'click .wk-add-to-cart': function(event){
      var $elem = $(this);
      var $form = $elem.closest('form');
      $elem.prop("disabled", true);

      var item = this.getAttribute('data-wk-item');
      var formData = $form.serialize();
      var title = $elem.closest('.wk-item').find('.wk-product-title .wk-product-sub-title').text();
      var $select = $form.find('select');
      var variantID = jumplink.getSelectedOption($select).val();

      fadeOrNot($elem.parents('.wk-item-column'), function(){

        // Version A: Stay in wishlist when done
        // Appmate.wk
        // .moveToCart(item, formData)
        // .then(function(){
        //     jumplink.updateCart(null, true, function(err, cart) {
        //         alertify.success(window.translations.cart.general.added.replace('[title]', title));
        //     });
        // });

        // Version B: Navigate to basket when done
        // Appmate.wk
        // .removeItem(item)
        // .then(function(){
        //   $form.submit();
        // });

        // Version C: remove from wishlist and add with cartJS
        Appmate.wk
        .removeItem(item)
        .then(function(){
            CartJS.addItem(variantID, 1, {
                "added_by": "wishlist"
            }, {
                "success": function(data, textStatus, jqXHR) {
                    alertify.success(window.translations.cart.general.added.replace('[title]', data.product_title));
                },
                "error": function(jqXHR, textStatus, errorThrown) {
                    alertify.error('Error: ' + errorThrown + '!');
                }
            });
        });
      });

      event.preventDefault();
    },
    'render .wk-option-select': function(elem){
      appmateOptionSelect(elem);
    }
  });
};

var toggleSidebar = function () {
  $( '.navbar-toggle' ).click();
}

/**
 * 
 */
var initNavTree = function () {
  
  var $navTree = jumplink.cache.$navTree;

  /**
   * Generates the Navigation Tree with the same logic like in navbar.liguid
   */
  var linklists = window.settings.linklists;
  var mainMenu = linklists['main-menu'];
  for(i in mainMenu.links) {
    var link = mainMenu.links[i];    
    var child_list_handle = link.handle;
    if(linklists[child_list_handle] && linklists[child_list_handle].links.length > 0) {
      link.nodes = linklists[child_list_handle].links;
      link.selectable = false;
      for(k in link.nodes) {
        var node = link.nodes[k];
        node.selectable = true;
      }
    }
  }

  // init Tree
  $navTree.treeview({
    data: window.settings.linklists['main-menu'].links,
    enableLinks: false,
    checkedIcon: 'fa fa-check',
    collapseIcon: 'fa fa-minus',
    emptyIcon: 'fa fa-circle-thin transparent', // 'fa fa-circle-thin',
    expandIcon: 'fa fa-plus',
    backColor: '#fff',
    onhoverColor: '#fff',
    selectedBackColor: '#fff',
    selectedColor: '#000',
  });

  $navTree.treeview('collapseAll', { silent: true });

  $navTree.on('nodeSelected', function(event, data) {
    // Your logic goes here
    if(data && typeof(data.href) === 'string' && data.href.length > 0) {
      jumplink.goTo(data.href);
      toggleSidebar();
    }
  });
}

/**
 * @see http://dcdeiv.github.io/simpler-sidebar/
 */
var initRightSidebar = function () {
  // init tree before sidebar to cache tree events in sidebar to close the sidebar
  //initNavTree();

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
    jumplink.cache.$Sidebars.css( 'padding-top', getAllNavsHeight()+'px');
  });
  jumplink.cache.$Sidebars.css( 'padding-top', getAllNavsHeight()+'px');
}

/**
 * 
 */
var initNavbar = function () {
  
  initRightSidebar();

  jumplink.cache.$Sidebars.css( 'padding-top', getMainNavHeight()+'px');

  var $dropdownElements= $('.designer-dropdown-col');

  jumplink.cache.$window.on('resize', function() {
    // Same height for designer dropdown columns, to make the borders equal
    jumplink.sameHeightElements($dropdownElements);
    // padding top for fixed navbar
    jumplink.cache.$barbaWrapper.css( 'padding-top', getAllNavsHeight()+'px');
  });
  jumplink.sameHeightElements($dropdownElements);
  jumplink.cache.$barbaWrapper.css( 'padding-top', getAllNavsHeight()+'px');

  // Simulate Dropdown hover effekt
  jumplink.cache.$mainNavbar.find('ul.nav.navbar-nav li.dropdown').hover(function(event){
    var $this = $(this);
    
    if($this.hasClass('cart-button')) {
      // only open cart if it has content
      if($this.hasClass('has-content')) {
        $this.addClass('open');
      }
    } else {
      $this.addClass('open');
    }
    // $('.dropdown-toggle', this).trigger('click'); 
  },
  function(event) {
      $(this).removeClass('open');
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
    if(this.$oldContainer.data().namespace === 'product' && (this.$lastElementClicked.hasClass('slick-next') || this.$lastElementClicked.hasClass('slick-prev')) ) {
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

    if ( this.$oldContainer.data().productUrl === this.$newContainer.data().productNextUrl ) {
      goingForward = false;
    }

    TweenLite.set(this.newContainer, {
      visibility: 'visible',
      xPercent: goingForward ? 100 : -100,
      position: 'absolute',
      left: 0,
      //top: getAllNavsHeight(),
      top: 0,
      right: 0
    });

    TweenLite.to(this.oldContainer, 0.6, { xPercent: goingForward ? -100 : 100 });
    TweenLite.to(this.newContainer, 0.6, { xPercent: 0, onComplete: function() {
      TweenLite.set(_this.newContainer, { clearProps: 'all' });
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
     * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
     * Please note, newContainer is available just after newContainerLoading is resolved!
     */
    var _this = this;

    this.$oldContainer.hide();

    this.$newContainer.css({
      visibility : 'visible',
      opacity : 0
    });

    // scroll to old product if last page was a product
    if( this.$oldContainer.data().namespace === 'product' && this.$newContainer.data().namespace === 'collection') {
      var position = { y: window.pageYOffset };
      var $lastProduct = $('#'+jumplink.cache.lastProductDataset.handle);
      if($lastProduct.length >= 1) {
        console.log('scroll to last object', jumplink.cache.lastProductDataset, $lastProduct)
        var offset = getMainNavHeight();
        var target = $lastProduct.offset().top - offset;
        

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
      }

    }

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
    var topNavsHeight = getAllNavsHeight();

    if(topNavsHeight < position.y) {
      TweenLite.to(position, 0.4, {
        y: topNavsHeight,
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
    } else {
      deferred.resolve();
    }

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
      placeholder = data.placeholders[jumplink.rand(0, data.placeholders.length-1)];
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
   * All form error message are hidden.
   * Go to each form error, get the html an place it in a seperate alert message over the form
   */
  if ( $formErrorsSelector.length ) {
    
    $formErrorsSelector.each(function(index, element) {
      $element = $(element);
      if($element.html()) {
        $formErrorMessages.append($element.html());
        alertify.success($element.html());
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

  /**
   * Set each element of $elements to the height of the heightest element to have all elements with the same height 
   */
  var sameHeightCards = function ($elements) {
      var t = 0;
      var t_elem;
      // get heightest height
      $elements.each(function () {
          $this = $(this);
          // reset height
          $this.css('min-height', 'auto');
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
  
  // set .login and .register to the same height
  jumplink.cache.$window.on('resize', function() {
    sameHeightCards($('.register, .login'));
  });
  sameHeightCards($('.register, .login'));
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
      breakpoint: jumplink.justDigits(window.settings["bs4-grid-breakpoints-xl"]),
      settings: {
        arrows: true,
        dots: true,
      }
    },
    {
      breakpoint: jumplink.justDigits(window.settings["bs4-grid-breakpoints-lg"]),
      settings: {
        arrows: true,
        dots: true,
      }
    },
    {
      breakpoint: jumplink.justDigits(window.settings["bs4-grid-breakpoints-md"]),
      settings: {
        arrows: true,
        dots: true,
      }
    },
    {
      breakpoint: jumplink.justDigits(window.settings["bs4-grid-breakpoints-sm"]),
      settings: {
        arrows: false,
        dots: false,
      }
    },
    {
      breakpoint: jumplink.justDigits(window.settings["bs4-grid-breakpoints-xs"]),
      settings: {
        arrows: false,
        dots: false,
      }
    }]
  };

  console.log('initPageCarousel', slickSettings);

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
  formData = $('.barba-form').data();

  //console.log("initArticle", formData, dataset);

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

/**
 * 
 */
var initBlog = function (dataset) {
  initGravatarElements('article', 'img-circle center-block max-width-50');
}

/**
 * Loyalty Points by Bold
 * @see https://apps.shopify.com/loyalty-points-by-bold
 * @see /snippets/bold-loyalties-callout-assets.liquid
 */
var initBoldLoyaltiesProductModal = function (product) {

  // WORKAROUND
  $('#lean_overlay').remove();

  // modal
  $('#checkout_shipping_address_country').change(function () {
    var country = $(this).val();
    if(window.Countries && window.Countries[country]) {
      var country = window.Countries[country];
    }
    

    var provinceDropdown = $('.address_info.province');
    provinceDropdown.empty();

    if(!country || !country.provinces || country.provinces.length === 0) {
      provinceDropdown.parent().hide();
      return;
    } else {
      provinceDropdown.parent().show();
    }

    $.each(country.provinces, function (index, province) {
      var selected = '';

      if (province === '{{customer.default_address.province}}') {
        selected = " selected";
      }

      provinceDropdown.append("<option" + selected + ">" + province + "</option>");
    });
  });

  // set default to germany
  $('#checkout_shipping_address_country').val('Germany');

/*    {% if customer.default_address.country %}
    $('#checkout_shipping_address_country').val('{{customer.default_address.country}}');
  {% endif %}*/

  $('#checkout_shipping_address_country').trigger('change');
}

/**
 * Loyalty Points by Bold
 * @see https://apps.shopify.com/loyalty-points-by-bold
 * @see /snippets/bold-loyalties-callout-assets.liquid
 */
var initBoldLoyaltiesProduct = function (product) {

  initBoldLoyaltiesProductModal(product);

  BoldApps.Loyalties.product = jQuery.extend({}, product); // clone workaround

  if( product.metafields && product.metafields.bold_loyalties ) {
    BoldApps.Loyalties.product_has_special_rewards = product.metafields.bold_loyalties.has_special_rewards == 1 ? true : false;
    BoldApps.Loyalties.product.metafields = product.metafields.bold_loyalties;
  }

  if(product.metafields && product.metafields.bold_loyalties) {
    
  }

  
  if( window.settings.app_bold_apps !== false && window.settings.app_bold_apps !== "false") {
    $.getScript( '//loy.boldapps.net/front_end/product_js', function( data, textStatus, jqxhr ) {
      // console.log( "initBoldLoyaltiesProduct", data ); // Data returned
      // console.log( "initBoldLoyaltiesProduct", textStatus ); // Success
      // console.log( "initBoldLoyaltiesProduct", jqxhr.status ); // 200
      // console.log( "initBoldLoyaltiesProduct", "Load was performed." );
    });
  }

  // initBoldProduct($, product);
}

/**
 * 
 */
var initProduct = function (dataset, data) {

  if(!data.product) {
    throw new Error("data need to have an product object");
  }

  if(data.product) {
    jumplink.cache.lastProductDataset = data.product;
  }
  

  console.log('jumplink.cache.lastProductDataset', jumplink.cache.lastProductDataset);

  initBoldLoyaltiesProduct(data.product);


  // get product handle, load product json and use it for variants
  // var handle = dataset.productHandle;
  var productHandle = '#handle-'+data.product.handle;

  // init product photo carousel
  var $slick = $('#product-photo-carousel-'+data.product.handle);
  var $slickThums = $('#product-photo-carousel-thumbs-'+data.product.handle+' .product-photo-carousel-thumb');
  var $modal = $('#product-photo-modal-'+data.product.handle);
  var $slickModal = $modal.find('#product-photo-carousel-modal-'+data.product.handle);
  var $slickModalThums = $('#product-photo-carousel-modal-thumbs-'+data.product.handle+' .product-photo-carousel-thumb');

  var $select = $(productHandle+'_product-select');
  var $add = $(productHandle+'_add');
  var $qtySelector = $(productHandle+' .js-qty__num');

  var selector = null;
  
  // CartJS
  $add.click(function() {
    event.preventDefault();
    var variantID = jumplink.getSelectedOption($select).val();
    var qty = jumplink.getQty($qtySelector);
    CartJS.addItem(variantID, qty, {}, {
      "success": function(data, textStatus, jqXHR) {
        alertify.success(window.translations.cart.general.added.replace('[title]', data.product_title));
      },
      "error": function(jqXHR, textStatus, errorThrown) {
        console.error(jqXHR, textStatus, errorThrown);
        alertify.error(jqXHR.responseJSON.description);
      }
    });
    return false;
  });

  // Setup listeners to add/subtract from the input
  $(productHandle+' .js-qty__adjust').on('click', function() {
    var $el = $(this);
    
    if(!$qtySelector.val()) {
      $qtySelector = $el.parent().siblings('.js-qty__num');
    }
    
    // var id = $el.data('id');
    var qty = jumplink.getQty($qtySelector);

    // Add or subtract from the current quantity
    if ($el.hasClass('js-qty__adjust--plus')) {
      qty += 1;
    } else {
      qty -= 1;
      if (qty <= 1) qty = 1;
    }

    // Update the input's number
    $qtySelector.val(qty);
  });

  // init main slick
  if( !$slick.hasClass('slick-initialized') ) {
    // init slick
    $slick.slick({
      dots: false
    });
    // set slick thumb click actions
    $slickThums.each(function(index, value) {
      $thumb = $(this);
      $thumb.click(function(){
        $thumb = $(this);
        $slick.slick('slickGoTo', $thumb.data().index);
      });
    });
  }

  // move background image in slick modal on mousemove
  var mousemoveOverModal = function (e) {
    $this = $(this);

    var invert = false;
    var pageX = (e.clientX / jumplink.cache.$window.width()) * 100;
    var pageY = (e.clientY / jumplink.cache.$window.height()) * 100;

    if(pageX > 100) {
      pageX = 100;
    } else if(pageX < 0) {
      pageX = 0;
    }

    if(pageY > 100) {
      pageY = 100;
    } else if(pageY < 0) {
      pageY = 0;
    }

    if(!invert) {
      pageX = 100 - pageX;
      pageY = 100 - pageY;
    }

    $this.find('.background-box.full-viewport-height').css("background-position", pageX+"% "+pageY+"%");
  }

  var onModalSlickChanges = function(event, slickModal, slickModalCurrentSlide){
    var currentSlide = $slick.slick('slickCurrentSlide')
    if( currentSlide !== slickModalCurrentSlide) {
      $slick.slick('slickGoTo', slickModalCurrentSlide, true);
    }
    var newSlide = $slick.slick('slickCurrentSlide')
  };

  $modal.on('show.bs.modal', function (e) {

    // do not open modal on touch devices
    if(jumplink.isTouchDevice()) {
      return e.preventDefault();
    }
    
    $this = $(this);
    $modal.removeClass('shown');
    $modal.removeClass('hiden');
    $modal.removeClass('hide');

    $modal.bind('mousemove', mousemoveOverModal);
    
    // init modal slick
    if( !$slickModal.hasClass('slick-initialized') ) {
      // init slick
      $slickModal.slick({
        dots: false,
        initialSlide: $slick.slick('slickCurrentSlide'),
      });

      $slickModalThums.each(function(index, value) {
        $thumb = $(this);
        $thumb.click(function(){
          $thumb = $(this);
          $slickModal.slick('slickGoTo', $thumb.data().index);
        });
      });
    } else {
      if( $slick.slick('slickCurrentSlide') !== $slickModal.slick('slickCurrentSlide')) {
        $slickModal.slick('slickGoTo', $slick.slick('slickCurrentSlide'), true);
      }
    }

  });

  $modal.on('shown.bs.modal', function (e) {
    $modal.removeClass('hide');
    $modal.removeClass('hiden');
    $modal.removeClass('show');
    $modal.addClass('shown');

    $slickModal.slick('setPosition');
  });

  // destory bindings on modal hides
  $modal.on('hide.bs.modal', function (e) {
    $modal.removeClass('shown');
    $modal.removeClass('hiden');
    $modal.removeClass('show');

    $modal.unbind('mousemove', mousemoveOverModal);
    $slickModal.unbind('afterChange', onModalSlickChanges);

    if($slickModal.hasClass('slick-initialized')) {
      $slickModal.slick('unslick'); // WORAROUND until gotoslide bug is fixed
    }
  });

  $modal.on('hiden.bs.modal', function (e) {
    $modal.removeClass('shown');
    $modal.removeClass('hide');
    $modal.removeClass('show');
  });

  /**
   * Adding support for product options. See here for details:
   * @see http://docs.shopify.com/support/your-website/themes/can-i-make-my-theme-use-products-with-multiple-options
   * This function comes from template/product.liquid and need möglicherweise rewrite
   * 
   * @see https://github.com/Shopify/Timber/blob/master/templates/product.liquid#L162
   * TOTO use https://cartjs.org/
   */
  var selectCallback = function(variant, selector, product) {

    initBoldLoyaltiesProduct(product);

    if (variant) {      

      // Swap image. TODO switch to image variant in carousel
      if (variant.featured_image) {
        var newImage = variant.featured_image; // New image object.
        var mainImageDomEl = $(productHandle+' '+'.product-photo-container img')[0]; // DOM element of main image we need to swap.
        Shopify.Image.switchImage(newImage, mainImageDomEl, jumplink.switchImage); // Define switchImage (the callback) in your theme's JavaScript file.
      }
      
      // Selected a valid variant that is available.
      if (variant.available) {

        // Enabling add to cart button.
        $(productHandle+'_add').removeClass('disabled hidden').prop('disabled', false).val(window.translations.cart.general.add_to_cart);
        $(productHandle+'_add-or-not-from').removeClass('hidden');

        // Hide qty
        $(productHandle+'_qty-form-group').removeClass('hidden');

        // Disable Notification BUtton
        $(productHandle+'_bsi').addClass('disabled').prop('disabled', true);
        $(productHandle+'_bsi-from').addClass('hidden');
      
        // If item is backordered yet can still be ordered, we'll show special message.
        if (variant.inventory_management && variant.inventory_quantity <= 0) {
          if(variant.title === "Default Title") {
            $(productHandle+' .selected-variant').html(product.title);
          } else {
            $(productHandle+' .selected-variant').html(product.title + ' - ' + variant.title);
          }
          $(productHandle+'_availability').removeClass('InStock OutOfStock').addClass('BackOrder').find('.availability_text').html(window.translations.product.general.backordner_possible);
          
          $(productHandle+'_add').val(window.translations.cart.general.pre_order);
          $(productHandle+'_backorder').removeClass("hidden");
        } else {
          $(productHandle+'_availability').removeClass('OutOfStock BackOrder').addClass('InStock').find('.availability_text').html(window.translations.product.general.available);
          $(productHandle+'_backorder').addClass("hidden");
        }
        
      } else {
        // Variant is sold out.
        $(productHandle+'_availability').removeClass('InStock BackOrder').addClass('OutOfStock').find('.availability_text').html(window.translations.product.general.sold_out);
        $(productHandle+'_backorder').addClass('hidden');
        $(productHandle+'_add').val(window.translations.product.general.sold_out).addClass('disabled').prop('disabled', true);
        $(productHandle+'_add-or-not-from').addClass('hidden');

        // Show qty
        $(productHandle+'_qty-form-group').addClass('hidden');

        // Enable Notification Button
        $(productHandle+'_bsi').removeClass('disabled').prop('disabled', false);
        $(productHandle+'_bsi-from').removeClass('hidden');
      }
      
      // Whether the variant is in stock or not, we can update the price and compare at price.
      if ( variant.compare_at_price > variant.price ) {
        $(productHandle+' .product-price').replaceWith('<span class="product-price text-danger on-sale">'+ Shopify.formatMoney(variant.price, window.shop.moneyFormat) +'&nbsp;<s class="product-compare-price text-default">'+'<span>'+Shopify.formatMoney(variant.compare_at_price, window.shop.moneyFormat)+ '</span>'+'</s>'+'</span>');
      } else {
        $(productHandle+' .product-price').replaceWith('<span class="product-price">'+ Shopify.formatMoney(variant.price, window.shop.moneyFormat) + '</span>' );
      }        

    } else {
      // variant doesn't exist.
      $(productHandle+' .product-price').empty();
      $(productHandle+'_backorder').addClass('hidden');
      $(productHandle+'_add').val(window.translations.product.general.unavailable).addClass('disabled').prop('disabled', true);
    }

  };
  
  selector = jumplink.OptionSelectors('handle-'+data.product.handle+'_product-select', {
    product: data.product,
    onVariantSelected: function(variant, selector) {
      selectCallback(variant, selector, data.product);
    }, enableHistoryState: true });

  
  // Add label if only one product option and it isn't 'Title'.
  if( data.product.options.size == 1 && data.product.options.first != 'Title' ) {
    $('.selector-wrapper:eq(0)').prepend('<label>{{ product.options.first }}</label>');
  }
  
  /*
   * Recomatic Related Products
   * @see https://apps.shopify.com/recomatic
   */
  if(window.recomatic_substitute_product_code) {
    window.recomatic_substitute_product_code();
  }

  // https://getbootstrap.com/javascript/#tabs
  $('#product-info-tab a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
  });
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
 * 
 */
var initCartTemplate = function (dataset) { 
  /*
    * Recomatic Related Products
    * @see https://apps.shopify.com/recomatic
    */
  if(window.recomatic_substitute_cart_code) {
    window.recomatic_substitute_cart_code();
    // TODO
  }

  /**
   * WORAROUND for Store Pickup + Delivery 
   * 
   * @see https://apps.shopify.com/click-and-collect
   */
   if(window.settings.app_store_pickup_and_delivery == "true") {
     if(typeof initStorePuckup === 'function') {
       initStorePuckup();
     } else {
        console.error('initStorePuckup not defined, please add this function around of the code in storepickup.js!');
        console.error('var initStorePuckup = function() {');
        console.error('\t[original storepickup.js code]');
        console.error('}');
        console.error('Otherwise, the app does not work!');
     }
    // console.log(window.StorePickUpApp.script);
    // $.getScript(window.StorePickUpApp.script, function( data, textStatus, jqxhr ) {
    //   console.log( data ); // Data returned
    //   console.log( textStatus ); // Success
    //   console.log( jqxhr.status ); // 200
    //   console.log( "StorePickUpApp Script Load was performed." );
    // });
   }
  



  /*
   * WORKAROUND
   * @see https://github.com/discolabs/cartjs/issues/97
   */
  var renderNewCartJSView = function () {
    $('[data-cart-barba]').each(function() {
      var view = rivets.bind($(this), CartJS.Rivets.model);
      CartJS.Rivets.boundViews.push(view);
    });
  }

  $(document).on('cart.ready', function(event, cart) {
    renderNewCartJSView();
  });

  if(CartJS.Rivets.model !== null) {
    renderNewCartJSView();
  }
}

/**
 * @see snippets/filter-menu-select
 * @see https://apps.shopify.com/power-tools-filter-menu
 */
var initCollectionSelectFilter = function (collectionHandle) {
  var collectionFilterName = "Designer";

  // console.log("initCollectionSelectFilter", collectionHandle);

  /* Product Tag Filters - Good for any number of filters on any type of collection pages */
  /* Brought to you by Caroline Schnapp and Shopify Power Tools */
  var $allFilters = $('.coll-filter-'+collectionHandle);
  $allFilters.selectpicker();
  $allFilters.selectpicker('render');

  // $allFilters.on('hidden.bs.select', function (e) {
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
var initCollection = function (dataset) {
  
  var $loadAll = $('[data-onclick-load-all]');
  var currentUrl = window.location.href; // Barba.Pjax.getCurrentUrl();
  var currentUrlLocation = jumplink.getUrlLocation(currentUrl);
  var collectionUrl = '/collections/' + dataset.collectionHandle;
  var allProductsUrl = currentUrlLocation.origin+collectionUrl+'?page=all';

  /**
   * Get html for page, e.g. collection/foobar?page=3
   */
  var loadProductsOfPage = function (url, currentPageIndex, pageIndex, $currentContainer, cb) {

    // get url from barba.js cache
    var xhr = Barba.BaseCache.get(url);  

    // if no cache for url
    if (!xhr) {
      xhr = Barba.Utils.xhr(url);
      Barba.BaseCache.set(url, xhr);
    }

    // https://github.com/luruke/barba.js/blob/master/src/Pjax/Pjax.js#L327
    xhr.then(function(data) {
      
      var $currentContainer = $(Barba.Pjax.Dom.getContainer(document.body));
      var newContainer = Barba.Pjax.Dom.parseResponse(data);
      var $newContainer = $(newContainer);
      var newDateset = newContainer.dataset;
      var currentStatus = Barba.Pjax.History.currentStatus();
      currentStatus.namespace = Barba.Pjax.Dom.getNamespace(newContainer);

      var $products = $newContainer.children().css({
        visibility : 'visible',
        opacity : 0
      });

      // remove collection description from products page
      $products.find('[data-collection-description]').remove();

      // remove pagination from products page
      $products.find('[data-pagination-wrapper]').remove();

      // remove filter from products page
      $products.find('[data-collection-filter]').text('');

      // remove filter from current page
      $currentContainer.find('[data-pagination-wrapper]').remove();

      // append products to current page
      $currentContainer.append($products);

      $products.animate({ opacity: 1 }, 400, function() {
        cb(null, {
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
    var $currentContainer = $(Barba.Pjax.Dom.getContainer(document.body));

    if($('[data-pagination-wrapper]').length === 0) {
      // console.warn("no pagination, stop loading all products because it is already done", $currentContainer.find('[data-pagination-wrapper]'));
      return cb();
    }

    async.timesSeries(pagesLength, function(n, next) {
      var index = n+1;
      var url = currentUrlLocation.origin + collectionUrl + '?page='+index;
      if(index === currentPageIndex) {
        next(null, null);
      } else {
        loadProductsOfPage(url, currentPageIndex, index, $currentContainer, function(err, pageObject) {
          next(err, pageObject);
        });
      }
    }, function(err, pageObjects) {

        if(err) {
          console.error(err);
          return cb(err);
        }

        var currentContainer = Barba.Pjax.Dom.getContainer(document.body);
        var $currentContainer = $(Barba.Pjax.Dom.getContainer(document.body));
        var deferred = Barba.Utils.deferred();
        deferred.resolve($currentContainer.outerHTML());
        
        Barba.BaseCache.set(currentUrl, deferred.promise);

        // console.log("all products loaded");
        
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
      console.log("load all", dataset );
      loadAllProducts(dataset, currentUrl, function() {
        initCollectionImages();
      });

      return false; // Do not open link
    });
  }

  // init collections images hover effect
  var initCollectionImages = function () {
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
          // console.log("hoverSrc", hoverSrc);
          $(this).css("background-image", 'url('+hoverSrc+')');
        }, function() {
          // console.log("featuredSrc", featuredSrc);
          $(this).css("background-image", 'url('+featuredSrc+')');
        });
      });

    });
  }

  initCollectionSelectFilter(dataset.collectionHandle);

  if(currentUrl === allProductsUrl) {
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
  // init customer bold loyalty point view
  $.getScript( '//loy.boldapps.net/front_end/customer_account_js', function( data, textStatus, jqxhr ) {

  });
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

function UrlExists(url, cb){
    jQuery.ajax({
        url:      url,
        dataType: 'text',
        type:     'GET',
        complete:  function(xhr){
            if(typeof cb === 'function')
               cb.apply(this, [xhr.status, url]);
        }
    });
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
  '404': function(dataset, data) {
    var parser = document.createElement('a');
    parser.href = Barba.Utils.getCurrentUrl();
    var currentPathname = parser.pathname;
    var lastPath = currentPathname.substr(currentPathname.lastIndexOf('/') + 1);

    lastPath = lastPath.replace(".html","");

    //console.log("lastPath", lastPath);

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
        UrlExists(url, function(status, url) {
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

  },
  'article': initArticle,
  'blog': initBlog,
  'cart': initCartTemplate,
  'collection': initCollection,
  // 'index': initIndex,
  'list-collections': function(dataset, data) {},
  'page': initPage,
  'product': initProduct,
  'search': function(dataset, data) {   
    // if there is just one result, go to them
    if(dataset.searchResultsCount === "1") {
      Barba.Pjax.goTo(dataset.searchResultUrl);
    }
  },
  
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
 * 
 */
jumplink.reloadCartJS = function (cart, cb) {
  if( typeof(cart) === 'undefined' || cart === null) {
    CartJS.getCart();
  } else {
    CartJS.update(cart);
    if(typeof(cb) === 'function') {
      cb(null, cart);
    }
  }
}

/**
 * init cart.js
 * 
 * @see https://cartjs.org/
 */
var initCartJS = function () {

  $.getJSON('/cart.js', function(cart) {
    jumplink.updateCart(cart);
    /*
     * TODO get location and wirte custom widget using cart.js
     * make this app (de)activateable in theme settings
     * 
     * @@ee E-Mails with Andrew Cargill (Zapiet LTD)
     * @see http://docs.zapiet.apiary.io/#reference/locations/get-pickup-locations/get-pickup-locations
     */
    if(window.settings.app_store_pickup_and_delivery == "true") {
      $.getJSON('https://api.storepickup.io/v2.0/settings?shop='+window.shop.permanent_domain+'&language='+window.shop.locale, function(storePickup) {
        CartJS.init(cart, {
            'dataAPI': true,
            'requestBodyClass': 'loading',
            'moneyFormat': window.shop.moneyFormat,
            'moneyWithCurrencyFormat': window.shop.moneyWithCurrencyFormat, // needed?
            'rivetsModels': {
              'storePickup': storePickup
            }
        });
      });
    } else {
      CartJS.init(cart, {
          'dataAPI': true,
          'requestBodyClass': 'loading',
          'moneyFormat': window.shop.moneyFormat,
          'moneyWithCurrencyFormat': window.shop.moneyWithCurrencyFormat, // needed?
      });
    }
  });

  $(document).on('cart.requestComplete', function(event, cart) {
    jumplink.updateCart(cart);
  });

  window.onFoursixtyCartAdded = function (item) {
    // console.log("onFoursixtyCartAdded", item);
  }

  window.onFoursixtyCartUpdated = function (cart) {
    // console.log("onFoursixtyCartUpdated", cart);
    CartJS.getCart();
  }
}

/**
 * Init shopify recomatic app
 * 
 * @see https://apps.shopify.com/recomatic
 */
var initRecomaticApp = function () {
  $(document).on("recomaticready", function () {
    jumplink.replaceNoImage();
  });
}

/**
 * Parse jsonstrings in datasets of the .barba-container
 * 
 * @see theme.liquid for .barba-container  
 */
var parseDatasetJsonStrings = function (dataset) {
  var data = {};
  if(dataset.productJsonString) {
    data.product = JSON.parse(dataset.productJsonString);
    // metafields needed to be set manually, its not allawed in shopify to get all as json
    data.product.metafields = {
      bold_loyalties: JSON.parse(dataset.productMetafieldsBold_loyaltiesJsonString),
      global: JSON.parse(dataset.productMetafieldsGlobalJsonString),
    }
  }
  return data;
}

/**
 * Show / hide newsletter form in footer on some pages
 */
var showHideNewsletterForm = function (dataset) {
  
  switch(dataset.namespace) {
    case 'customers-login':
      jumplink.cache.$newsletterForm.hide();
    break;
    case 'customers-register':
      jumplink.cache.$newsletterForm.hide();
    break;
    case 'cart':
      jumplink.cache.$newsletterForm.hide();
    break;
    default:
      jumplink.cache.$newsletterForm.show();
    break;
  }
}

var getShopifyAdminBarHeight = function () {
  return Number(jumplink.cache.$html.css('padding-top').replace("px", ""));
}

var setBarbaContainerMinHeight = function () {
  var top = getAllNavsHeight() + getShopifyAdminBarHeight();
  var bottom = jumplink.cache.$footer.outerHeight();
  var height = jumplink.cache.$window.height() - top - bottom;
  console.log('setBarbaContainerMinHeight', 'top', top, 'bottom', bottom, 'height', height);
  $('.barba-container').css( 'min-height', height+'px');
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

    if(container.dataset.newHash !== "false") {
      jumplink.updateHash(container.dataset.newHash);
    }

    jumplink.replaceNoImage();

    setBarbaContainerMinHeight();
    jumplink.cache.$window.on('resize', function() {
      setBarbaContainerMinHeight();
    });

    if(typeof(videojs) !== 'undefined') {
      $('.video-js').each(function () {
        console.log('init video.js');
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
      console.warn("video.js not loaded");
    }

    if(typeof(Hyphenator) !== 'undefined') {
      Hyphenator.run();
    }

    var data = parseDatasetJsonStrings(container.dataset);

    showHideNewsletterForm(container.dataset, data);

    setNavActive(container.dataset, data);

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
          setBarbaContainerMinHeight();
        });
      });
    }
  })
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

  initRecomaticApp();

  initAlert();

  initAppmateWishlist();

  initCartJS();

  initBarba();
  
}

// run init as soon as jQuery is ready
$(init);
