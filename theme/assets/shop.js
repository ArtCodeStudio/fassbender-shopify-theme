// JumpLink object
window.jumplink = window.jumplink || {};

// debugging https://github.com/visionmedia/debug
window.jumplink.debug = window.jumplink.debug || {};
window.jumplink.debug.barba = debug('theme:barba');
window.jumplink.debug.events = debug('theme:events');
window.jumplink.debug.tracking = debug('theme:tracking');
window.jumplink.debug.raven = debug('theme:raven');
window.jumplink.debug.info = debug('theme:info');
window.jumplink.debug.error = debug('theme:error');
window.jumplink.debug.warn = debug('theme:warn');
// templates
window.jumplink.debug.product = debug('theme:product');
window.jumplink.debug.collection = debug('theme:collection');
window.jumplink.debug.page = debug('theme:page');
window.jumplink.debug.blog = debug('theme:blog');
window.jumplink.debug['404'] = debug('theme:404');
// partials
window.jumplink.debug.sidebar = debug('theme:sidebar');
window.jumplink.debug.navbar = debug('theme:navbar');
// apps
window.jumplink.debug.instashop = debug('theme:instashop');

window.jumplink.debug.info('window.settings', window.settings);
window.jumplink.debug.info('Shopify', Shopify);
window.jumplink.debug.info('window.shop', window.shop);

// TODO debug string in theme settings
if(window.settings.debug) {
  localStorage.setItem('debug', 'theme:*'); // ?preview_theme_id=185739271
} else {
  localStorage.removeItem('debug');
}

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

/**
 * 
 */
jumplink.cacheSelectors = function () {
  // console.log('cacheSelectors');
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
 * Init Tetris based on https://github.com/jakesgordon/javascript-tetris
 * Copyright (c) 2011, 2012, 2013, 2014, 2015, 2016 Jake Gordon and contributors
 */
jumplink.initTetris = function (dataset) {
  //-------------------------------------------------------------------------
  // base helper methods
  //-------------------------------------------------------------------------

  var get = function (id)        { return document.getElementById(id);  }

  var timestamp = function () { return new Date().getTime(); }
  var random = function (min, max) { return (min + (Math.random() * (max - min))); }
  var randomChoice = function (choices) { return choices[Math.round(random(0, choices.length-1))]; }

  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      window.oRequestAnimationFrame      ||
      window.msRequestAnimationFrame     ||
      function(callback, element) {
        window.setTimeout(callback, 1000 / 60);
      }
  }

  //-------------------------------------------------------------------------
  // game constants
  //-------------------------------------------------------------------------

  var KEY         = { ESC: 27, SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 },
      DIR         = { UP: 0, RIGHT: 1, DOWN: 2, LEFT: 3, MIN: 0, MAX: 3 },
      // canvas      = get('canvas'),
      $canvas     = $('#canvas'),
      $playBtn    = $('#start'),
      $rows       = $('#rows'),
      $score      = $('#score'),
      ctx         = $canvas.get(0).getContext('2d'),
      $ucanvas    = $('#upcoming'),
      $menu       = $('#menu').hide(),
      // ucanvas     = get('upcoming'),
      uctx        = $ucanvas.get(0).getContext('2d'),
      speed       = { start: 0.6, decrement: 0.005, min: 0.1 }, // how long before piece drops by 1 row (seconds)
      nu          = 5,  // width/height of upcoming preview (in blocks)
      vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0), // viewport width
      vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0), // viewport height
      aspectRatio = vh < vw ? [1,2] : [2,1]  // Spielfeld Seitenverhältnis [1,2]: 1:2 [2,1]: 2:1
      orientation = aspectRatio[0] < aspectRatio[1] ? 'landscape' : 'portrait';   
      nx          = aspectRatio[1] * 10, // width of tetris court (in blocks)
      ny          = aspectRatio[0] * 10, // height of tetris court (in blocks)
      lineWidthXl = 3;


  //-------------------------------------------------------------------------
  // game variables (initialized during reset)
  //-------------------------------------------------------------------------

  var dx, dy,         // pixel size of a single tetris block
      dnextx, dnexty, // pixel size of a single tetris block in upcoming preview
      blocks,         // 2 dimensional array (nx*ny) representing tetris court - either empty block or occupied by a 'piece'
      actions,        // queue of user actions (inputs)
      playing,        // true|false - game is in progress
      dt,             // time since starting this game
      current,        // the current piece
      next,           // the next piece
      score,          // the current score
      vscore,         // the currently displayed score (it catches up to score in small chunks - like a spinning slot machine)
      rows,           // number of completed rows in the current game
      step;           // how long before current piece drops by 1 row

  //-------------------------------------------------------------------------
  // tetris pieces
  //
  // blocks: each element represents a rotation of the piece (0, 90, 180, 270)
  //         each element is a 16 bit integer where the 16 bits represent
  //         a 4x4 set of blocks, e.g. j.blocks[0] = 0x44C0
  //
  //             0100 = 0x4 << 3 = 0x4000
  //             0100 = 0x4 << 2 = 0x0400
  //             1100 = 0xC << 1 = 0x00C0
  //             0000 = 0x0 << 0 = 0x0000
  //                               ------
  //                               0x44C0
  //
  //-------------------------------------------------------------------------

  var i = { name:'i', size: 4, blocks: [0x0F00, 0x2222, 0x00F0, 0x4444], color: '#0A9177' };
  var j = { name:'j', size: 3, blocks: [0x44C0, 0x8E00, 0x6440, 0x0E20], color: '#AB1A62' };
  var l = { name:'l', size: 3, blocks: [0x4460, 0x0E80, 0xC440, 0x2E00], color: '#050506' };
  var o = { name:'o', size: 2, blocks: [0xCC00, 0xCC00, 0xCC00, 0xCC00], color: '#0A9177' };
  var s = { name:'s', size: 3, blocks: [0x06C0, 0x8C40, 0x6C00, 0x4620], color: '#AB1A62' };
  var t = { name:'t', size: 3, blocks: [0x0E40, 0x4C40, 0x4E00, 0x4640], color: '#050506' };
  var z = { name:'z', size: 3, blocks: [0x0C60, 0x4C80, 0xC600, 0x2640], color: '#0A9177' };

  //------------------------------------------------
  // do the bit manipulation and iterate through each
  // occupied block (x,y) for a given piece
  //------------------------------------------------
  var eachblock = function (type, x, y, dir, fn) {
    var bit, result, row = 0, col = 0, blocks = type.blocks[dir];
    for(bit = 0x8000 ; bit > 0 ; bit = bit >> 1) {
      if (blocks & bit) {
        fn(x + col, y + row);
      }
      if (++col === 4) {
        col = 0;
        ++row;
      }
    }
  }

  //-----------------------------------------------------
  // check if a piece can fit into a position in the grid
  //-----------------------------------------------------
  var occupied = function (type, x, y, dir) {
    var result = false
    eachblock(type, x, y, dir, function(x, y) {
      if ((x < 0) || (x >= nx) || (y < 0) || (y >= ny) || getBlock(x,y))
        result = true;
    });
    return result;
  }

  var unoccupied = function (type, x, y, dir) {
    return !occupied(type, x, y, dir);
  }

  //-----------------------------------------
  // start with 4 instances of each piece and
  // pick randomly until the 'bag is empty'
  //-----------------------------------------
  var pieces = [];
  var randomPiece = function () {
    if (pieces.length == 0)
      pieces = [i,i,i,i,j,j,j,j,l,l,l,l,o,o,o,o,s,s,s,s,t,t,t,t,z,z,z,z];
    var type = pieces.splice(random(0, pieces.length-1), 1)[0];
    return { type: type, dir: DIR.UP, x: Math.round(random(0, nx - type.size)), y: 0 };
  }


  //-------------------------------------------------------------------------
  // GAME LOOP
  //-------------------------------------------------------------------------

  var run = function () {

    // showStats(); // initialize FPS counter
    addEvents(); // attach keydown and resize events

    var last = now = timestamp();
    var frame = function () {
      now = timestamp();
      update(Math.min(1, (now - last) / 1000.0)); // using requestAnimationFrame have to be able to handle large delta's caused when it 'hibernates' in a background or non-visible tab
      draw();
      // stats.update();
      last = now;
      requestAnimationFrame(frame, $canvas.get(0));
    }

    resize(); // setup all our sizing information
    reset();  // reset the per-game variables
    frame();  // start the first frame

  }

  var addEvents = function () {
    document.addEventListener('keydown', keydown, false);
    window.addEventListener('resize', resize, false);
    $canvas.on('singletap', tab);
    $canvas.on('swipe', swipe);
  }

  var resize = function (event) {
    vw          = Math.max(document.documentElement.clientWidth, window.innerWidth || 0); // viewport width
    vh          = Math.max(document.documentElement.clientHeight, window.innerHeight || 0); // viewport height
    aspectRatio = vh < vw ? [1,2] : [2,1]  // Spielfeld Seitenverhältnis [1,2]: 1:2 [2,1]: 2:1
    orientation = aspectRatio[0] < aspectRatio[1] ? 'landscape' : 'portrait'; 
    nx          = aspectRatio[1] * 10; // width of tetris court (in blocks)
    ny          = aspectRatio[0] * 10; // height of tetris court (in blocks)

    if(orientation === 'landscape') {
      console.log('height = '+$canvas.width() + ' / ' + aspectRatio[1]);
      $canvas.height($canvas.width() / aspectRatio[1]); // half height of width
    } else {
      console.log('height = '+$canvas.width() + ' * ' + aspectRatio[0]);
      $canvas.height($canvas.width() * aspectRatio[0]); // double height of width
    }
    
    $canvas.attr('width', $canvas.width());   // set canvas logical size equal to its physical size
    $canvas.attr('height', $canvas.height()); // (ditto)

    $ucanvas.attr('width', $ucanvas.width());
    $ucanvas.attr('height', $ucanvas.height());
    $ucanvas.height($ucanvas.width()) // 1:1

    dx = $canvas.width() / nx; // pixel size of a single tetris block
    dy = $canvas.height() / ny; // (ditto)

    dnextx = $ucanvas.width() / nu; // pixel size of a single tetris block for the upcomming preview
    dnexty = $ucanvas.height() / nu; // (ditto)
    

    invalidate();
    invalidateNext();
  }

  // keyboard events for playing on desktop
  var keydown = function (ev) {
    var handled = false;
    if (playing) {
      switch(ev.keyCode) {
        case KEY.LEFT:   actions.push(DIR.LEFT);  handled = true; break;
        case KEY.RIGHT:  actions.push(DIR.RIGHT); handled = true; break;
        case KEY.UP:     actions.push(DIR.UP);    handled = true; break;
        case KEY.DOWN:   actions.push(DIR.DOWN);  handled = true; break;
        case KEY.ESC:    lose();                  handled = true; break;
      }
    } else if (ev.keyCode == KEY.SPACE) {
      play();
      handled = true;
    }
    if (handled)
      ev.preventDefault(); // prevent arrow keys from scrolling the page (supported in IE9+ and all other browsers)
  }

  // swipe gestures for playing on touch devices
  var swipe = function (e, touch) {
    console.log('swipe', touch);
    if (playing) {
      switch(touch.direction) {
        case 'left':    actions.push(DIR.LEFT);   handled = true; break;
        case 'right':   actions.push(DIR.RIGHT);  handled = true; break;
        case 'up':      actions.push(DIR.UP);     handled = true; break;
        case 'down':    actions.push(DIR.DOWN);   handled = true; break;
      }
    }
  }

  // tab gestures for playing on touch devices
  var tab = function (e, touch) {
    console.log('tab', touch);
    if (playing) {
      actions.push(DIR.UP);
      handled = true;
    }
  }


  //-------------------------------------------------------------------------
  // GAME LOGIC
  //-------------------------------------------------------------------------

  var play = function(){
    console.log('play');
    $menu.show();
    // $playBtn.prop('disabled', true);
    $playBtn.text('Give Up');
    
    reset();
    playing = true;
  }

  var lose = function () {
    // $playBtn.prop('disabled', false);
    $playBtn.text('Play');
    // $menu.hide();
    setVisualScore();
    playing = false;
  }

  $playBtn.click(function() {
    if (playing) {
      lose();
    } else {
      play();
    }
  });

  var setVisualScore = function (n)      { vscore = n || score; invalidateScore(); }
  var setScore = function (n)            { score = n; setVisualScore(n);  }
  var addScore = function (n)            { score = score + n;   }
  var clearScore = function ()           { setScore(0); }
  var clearRows = function ()            { setRows(0); }
  var setRows = function (n)             { rows = n; step = Math.max(speed.min, speed.start - (speed.decrement*rows)); invalidateRows(); }
  var addRows = function (n)             { setRows(rows + n); }
  var getBlock = function (x,y)          { return (blocks && blocks[x] ? blocks[x][y] : null); }
  var setBlock = function (x,y,type)     { blocks[x] = blocks[x] || []; blocks[x][y] = type; invalidate(); }
  var clearBlocks = function ()          { blocks = []; invalidate(); }
  var clearActions = function ()         { actions = []; }
  var setCurrentPiece = function (piece) { current = piece || randomPiece(); invalidate();     }
  var setNextPiece = function (piece)    { next    = piece || randomPiece(); invalidateNext(); }

  var reset = function () {
    dt = 0;
    clearActions();
    clearBlocks();
    clearRows();
    clearScore();
    setCurrentPiece(next);
    setNextPiece();
  }

  var update = function (idt) {
    if (playing) {
      if (vscore < score)
        setVisualScore(vscore + 1);
      handle(actions.shift());
      dt = dt + idt;
      if (dt > step) {
        dt = dt - step;
        drop();
      }
    }
  }

  var handle = function (action) {
    switch(action) {
      case DIR.LEFT:  move(DIR.LEFT);  break;
      case DIR.RIGHT: move(DIR.RIGHT); break;
      case DIR.UP:    rotate();        break;
      case DIR.DOWN:  drop();          break;
    }
  }

  var move = function (dir) {
    var x = current.x, y = current.y;
    switch(dir) {
      case DIR.RIGHT: x = x + 1; break;
      case DIR.LEFT:  x = x - 1; break;
      case DIR.DOWN:  y = y + 1; break;
    }
    if (unoccupied(current.type, x, y, current.dir)) {
      current.x = x;
      current.y = y;
      invalidate();
      return true;
    }
    else {
      return false;
    }
  }

  var rotate = function () {
    var newdir = (current.dir == DIR.MAX ? DIR.MIN : current.dir + 1);
    if (unoccupied(current.type, current.x, current.y, newdir)) {
      current.dir = newdir;
      invalidate();
    }
  }

  var drop = function () {
    if (!move(DIR.DOWN)) {
      addScore(10);
      dropPiece();
      removeLines();
      setCurrentPiece(next);
      setNextPiece(randomPiece());
      clearActions();
      if (occupied(current.type, current.x, current.y, current.dir)) {
        lose();
      }
    }
  }

  var dropPiece = function () {
    eachblock(current.type, current.x, current.y, current.dir, function(x, y) {
      setBlock(x, y, current.type);
    });
  }

  var removeLines = function () {
    var x, y, complete, n = 0;
    for(y = ny ; y > 0 ; --y) {
      complete = true;
      for(x = 0 ; x < nx ; ++x) {
        if (!getBlock(x, y))
          complete = false;
      }
      if (complete) {
        removeLine(y);
        y = y + 1; // recheck same line
        n++;
      }
    }
    if (n > 0) {
      addRows(n);
      addScore(100*Math.pow(2,n-1)); // 1: 100, 2: 200, 3: 400, 4: 800
    }
  }

  var removeLine = function (n) {
    var x, y;
    for(y = n ; y >= 0 ; --y) {
      for(x = 0 ; x < nx ; ++x)
        setBlock(x, y, (y == 0) ? null : getBlock(x, y-1));
    }
  }

  //-------------------------------------------------------------------------
  // RENDERING
  //-------------------------------------------------------------------------

  var invalid = {};

  var invalidate = function ()         { invalid.court  = true; }
  var invalidateNext = function ()     { invalid.next   = true; }
  var invalidateScore = function ()    { invalid.score  = true; }
  var invalidateRows = function ()     { invalid.rows   = true; }

  var draw = function () {
    ctx.save();
    ctx.lineWidth = lineWidthXl;
    ctx.translate(lineWidthXl/2, lineWidthXl/2); // for crisp 1px black lines
    drawCourt();
    drawNext();
    drawScore();
    drawRows();
    ctx.restore();
  }

  // Spielfeld
  var drawCourt = function () {
    if (invalid.court) {
      ctx.clearRect(0, 0, $canvas.width(), $canvas.height());
      if (playing)
        drawPiece(ctx, current.type, current.x, current.y, current.dir, dx, dy);
      var x, y, block;
      for(y = 0 ; y < ny ; y++) {
        for (x = 0 ; x < nx ; x++) {
          if (block = getBlock(x,y))
            drawBlock(ctx, x, y, block.color, dx, dy);
        }
      }
      ctx.strokeStyle = 'black';
      ctx.lineWidth = lineWidthXl;
      ctx.strokeRect(0, 0, nx*dx - lineWidthXl, ny*dy - lineWidthXl); // court boundary / Spielfeldrand
      invalid.court = false;
    }
  }

  var drawNext = function () {
    if (invalid.next) {
      var padding = ((nu - next.type.size) / 2);
      // padding = 1; // WORKAROUND
      console.log('drawNext padding', padding, 'dnextx', dnextx, 'nu', nu, 'next', next);
      uctx.save();
      uctx.translate(lineWidthXl/2, lineWidthXl/2); 
      uctx.clearRect(0, 0, $ucanvas.width(), $ucanvas.height());
      drawPiece(uctx, next.type, padding, padding, next.dir, dnextx, dnexty);
      uctx.strokeStyle = 'black';
      ctx.lineWidth = lineWidthXl;
      uctx.strokeRect(0, 0, nu*dnextx - lineWidthXl, nu*dnexty - lineWidthXl);
      uctx.restore();
      invalid.next = false;
    }
  }

  var drawScore = function () {
    if (invalid.score) {
      // html('score', ("00000" + Math.floor(vscore)).slice(-5));
      $score.text(("00000" + Math.floor(vscore)).slice(-5));
      invalid.score = false;
    }
  }

  var drawRows = function () {
    if (invalid.rows) {
      //html('rows', rows);
      $rows.text(rows);
      invalid.rows = false;
    }
  }

  var drawPiece = function (ctx, type, x, y, dir, dx, dy) {
    eachblock(type, x, y, dir, function(x, y) {
      drawBlock(ctx, x, y, type.color, dx, dy);
    });
  }

  var drawBlock = function (ctx, x, y, color, dx, dy) {
    ctx.fillStyle = 'transparent';
    ctx.lineWidth = lineWidthXl;
    ctx.strokeStyle = color;
    ctx.fillRect(x*dx, y*dy, dx, dy);
    ctx.strokeRect(x*dx, y*dy, dx, dy)
  }

  //-------------------------------------------------------------------------
  // FINALLY, lets run the game
  //-------------------------------------------------------------------------

  run();
}

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
  jumplink.initDataApi();
  jumplink.initColorcard(dataset);
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
    var $label = $this.find('.label');
    var image = data.image;

    if($target.length <= 0) {
      $target = $('[data-product-handle="'+data.productHandle+'"] [data-colorcard]');
    }
    var html = $label.html();
    // console.log('colocard click', html, data, image);

    if(!$this.hasClass('toggled')) {
      html = html.replace('Show', 'Hide');
      $target.children().fadeTo( "fast", 0 , function() {
        $target.attr('data-colorcard', 'placed');
        $target.css('background-image', 'url('+image+')');
        $this.addClass('toggled');
      });
    } else {
      $target.css('background-image', 'none');
      $target.attr('data-colorcard', 'placeholder');
      html = html.replace('Hide', 'Show');
      $target.children().fadeTo( "fast", 1, function() {
        $this.removeClass('toggled');
      });
    }

    
    $label.text(html);
    
  });
}

/**
 * Utilities / Helper functions
 */


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
jumplink.toggleRightSidebar = function () {
  console.log('toggleRightSidebar');
  $( '.sidebar-toggler[data-target="#right-sidebar"]' ).click();
}

jumplink.initInstafeed = function (id) {
  if(!id) {
    id = 'instafeed';
  }
  // https://github.com/stevenschobert/instafeed.js
  var instafeed = new Instafeed({
    target: id,
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

/**
 * @see http://dcdeiv.github.io/simpler-sidebar/
 */
var initRightSidebar = function () {
  // init tree before sidebar to cache tree events in sidebar to close the sidebar
  var $rightSidebar = jumplink.cache.$rightSidebar;
  var closingLinks = '.close-sidebar';
  var align = 'right';
  var trigger = '[data-toggle="sidebar"][data-target="#right-sidebar"]';
  var mask = true;
  var $closeText = $('.sidebar-toggler .open');
  var $openText = $('.sidebar-toggler .closed');
  var init = 'closed';
  var openTextInAnimationClass = 'rotateInDownRight';
  var openTextOutAnimationClass = 'rotateOutUpRight';
  var closeTextInAnimationClass = 'rotateInUpRight';
  var closeTextOutAnimationClass = 'rotateOutDownRight';


  // events

  // event: animation done
  $openText.on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
    // $(this).removeClass(openTextInAnimationClass + ' ' + openTextOutAnimationClass);
    console.log('openText Animation Done');
  });

  // event: animation done
  $closeText.on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
    // $(this).removeClass(closeTextInAnimationClass + ' ' + closeTextOutAnimationClass);
    console.log('closeText Animation Done');
  });

  if(init === 'closed') {
    $closeText.addClass('invisible');
  }

  var openAnimation = function () {
    $openText.removeClass('invisible ' + openTextInAnimationClass).addClass(openTextOutAnimationClass);
    $closeText.removeClass('invisible ' + closeTextOutAnimationClass).addClass(closeTextInAnimationClass);
  }

  var closeAnimation = function () {
    $closeText.removeClass('invisible ' + closeTextInAnimationClass).addClass(closeTextOutAnimationClass);
    $openText.removeClass('invisible ' + openTextOutAnimationClass).addClass(openTextInAnimationClass);
  }

  // https://github.com/benmajor/jQuery-Touch-Events
  $rightSidebar.on('swipe', function(e, touch) {
    console.log( 'swipe', e, touch);
  });

  $rightSidebar.on('swiperight', function(e, touch) {
    console.log( 'swiperight', e, touch);
    jumplink.toggleRightSidebar();
  });

  // $rightSidebar.on('tapmove', function(e, touch) {
  //   console.log( 'tapmove', e, touch);
  // });

  $rightSidebar.simplerSidebar({
    attr: "simplersidebar",
    init: init,
    top: 0,
    align: align, // sidebar.align
    gap: 64, // sidebar.gap
    animation: {
      duration: 1000,
      easing: "easeOutQuint" // swing
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
          open: openAnimation,
          close: closeAnimation,
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
          freezePage: false
        }
      }
    }
  });

  if(jumplink.cache && jumplink.cache.$window && jumplink.cache.$Sidebars) {
    jumplink.cache.$window.resize(function() {
      jumplink.cache.$Sidebars.css( 'padding-top', jumplink.getNavHeight()+'px');
    });
    jumplink.cache.$Sidebars.css( 'padding-top', jumplink.getNavHeight()+'px');
  } else {
    console.error(new Error('jumplink.cache is undefined'));
  }

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
var initBarbaTransition = function() {
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
        // console.log('scroll to last product');
        $lastPosition = $('#'+jumplink.cache.lastProductDataset.handle);
        if($lastPosition.length >= 1) {
          target = $lastPosition.offset().top - offset;
        }
      }

      // scroll to old collection
      if( this.$oldContainer.data().namespace === 'collection' && this.$newContainer.data().namespace === 'list-collections') {
        // console.log('scroll to last collection');
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
  return MovePage;
}

/**
 * init Alertify.js
 * 
 * @see https://alertifyjs.org/
 */
jumplink.initAlert = function () {
  alertify.parent(document.body);
  alertify.logPosition(window.settings.alertify_position);
  window.alertify = alertify;
}

/**
 * Close all opend bootstrap modals
 * @see http://v4-alpha.getbootstrap.com/components/modal/
 */
jumplink.closeAllModals = function () {
  jumplink.cache.$body.removeClass('modal-open').removeAttr('style');
}

  /**
   * Handles the Shopify Admin Bar
   * Fires window resize event if admin bar changes
   * Fires gobal adminbar.show event if admin bar shows
   * Fires gobal adminbar.close event if admin bar closes
   */ 
jumplink.initShopifyAdminBar = function () {

  // handle and fire events
  var $shopifyAdminBarIframe = $('#admin_bar_iframe');
  $shopifyAdminBarIframe.on('load', function () {
    jumplink.cache.$window.trigger('resize');
    var $shopifyAdminBar = $shopifyAdminBarIframe.contents();
    var $shopifyAdminBarClose = $shopifyAdminBar.find('#close-admin-bar');
    var $shopifyAdminBarShow = $shopifyAdminBar.find('#show-admin-bar');
    $shopifyAdminBarClose.on('click', function (event) {
      // event name conversation from https://v4-alpha.getbootstrap.com/components/modal/#events
      jumplink.cache.$document.trigger('show.shopify.adminbar', event);
      setTimeout(function() {
        jumplink.cache.$window.trigger('resize', event);
        jumplink.cache.$document.trigger('shown.shopify.adminbar', event);
      }, 10);

    });
    $shopifyAdminBarShow.on('click', function (event) {
      jumplink.cache.$document.trigger('hide.shopify.adminbar', event);
      setTimeout(function() {
        jumplink.cache.$window.trigger('resize', event);
        jumplink.cache.$document.trigger('hidden.shopify.adminbar', event);
      }, 10);
    });
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

/**
 * 
 */
var initLogin = function(dataset) {
  var resetPassword = false;
  var $recoverPasswordLink          = $('.RecoverPassword, #RecoverPassword');
  var $hideRecoverPasswordLink      = $('#HideRecoverPasswordLink');
  var $recoverPasswordForm          = $('#RecoverPasswordForm');
  var $customerLoginForm            = $('#CustomerLoginForm');
  var $passwordResetSuccess         = $('#ResetSuccess');
  var $NewShopMessage               = $('#NewShopMessage');
  var $formErrorsSelector           = $('.form-errors-selector');
  var $resetPasswordSuccessSelector = $('#resetPasswordSuccessSelector');
  var $formErrorMessages            = $('#formErrorMessages');

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

  jumplink.initInstafeed('instafeed-'+dataset.pageHandle);

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
  // jumplink.initGravatarElements('.article', 'img-circle center-block max-width-50');
  // jumplink.initGravatarElements('.comments');
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
  // jumplink.initGravatarElements('article', 'img-circle center-block max-width-50');

  jumplink.initInstafeed('instafeed-'+dataset.blogHandle);

  var $sameHeightElements = $('[data-blog-handle="dates"] .article');

  jumplink.cache.$window.on('resize', function() {
    jumplink.sameHeightElements($sameHeightElements, 500);
  });
  jumplink.sameHeightElements($sameHeightElements, 500);
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
  var self = this;
 
  self.modalOptions = {
    backdrop: false,
    show: false,
    focus: false,
  }

  self.slickOptions = {
    dots: false,
    arrows: false,
    infinite: false, // infinite makes problems with rivets.js
    swipe: false, // do not swipe products because it has product images to swipe
    // appendArrows: $(productHandle+' .product-photo-carousel-arrows'),
  }

  /**
   * Remove all event handlers from all paragraphs and hide hide all modals
   * 
   * @see http://api.jquery.com/off/
   */
  self.destory = function () {
    // console.log("destory cart template");
    if(self.$modal) {
      self.$modal.off('show.bs.modal shown.bs.modal');
      self.$modal.modal('hide');
    }
    
    // self.$modalTogglers.off();
    // jumplink.cache.$document.off('b2bcart.bind.after cart.requestComplete');
    
  }

  self.init = function () {
    // console.log("init cart");
    $.getJSON('/cart.js', function(cart) {
      ProductJS.B2bCart.loadCart(cart);
    });

    // stuff to init after rivents dom binding stuff is done
    jumplink.cache.$document.on('b2bcart.bind.after', function(event) {

      jumplink.initColorcard(dataset);

      // init modal
      self.$modal = $('#cart-modal');
      self.$modal.modal(self.modalOptions);
      // console.log('#cart-modal slick', self.$modal.$slick);
      self.$modal.on('shown.bs.modal', function (e) {
        self.$modal.$slick.slick('setPosition');
      });
      self.$modalTogglers = $('[data-toggle="product-modal"]');
      self.$modalTogglers.each(function( index ) {
        var $this = $(this);
        $this.click(function() {
          var $this = $(this);
          var productIndex = $this.data('productIndex');
          // slide to clicked product
          self.$modal.$slick.slick('slickGoTo', productIndex);
          self.$modal.modal('show');
        });
      });

      /**
       * init product slick carousel, all products in this modal are in a slick carousel 
       */
      self.$modal.$slick = self.$modal.find('.slick-slider');
      if( !self.$modal.$slick.hasClass('slick-initialized') ) {
        // console.log("shop.js init slick in modal");
        self.$modal.$slick.slick(self.slickOptions);
      }

    });


    jumplink.cache.$document.on('cart.requestComplete', function(event, cart) {
      // console.log('cart.requestComplete', cart);
    });
  }

  self.init();
  return self;
}

/**
 * JavaScript Code for Collection Pages, executed from barba.js
 */
var initCollection = function (dataset, data) {

  // console.log('initCollection', dataset, data);
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
    
    // console.log("loadAllProducts");

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
    case 'networking':
      console.log('init networking page');
      jumplink.initTetris(dataset);
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

var initIndex = function (dataset, data) {
  jumplink.initInstafeed('instafeed-'+dataset.namespace);
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
  // console.log('initListCollections', dataset, data);
  jumplink.initInstafeed('instafeed-'+dataset.namespace);
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
 * Init Javascripts insite of barba.js
 * 
 * @note see init() for inits outsite of barba.js 
 */
jumplink.initTemplates = function () {

  Barba.Dispatcher.on('linkClicked', function(el) {
    jumplink.cache.lastElementClicked = el;
  });

  Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container) {
    // console.log('newPageReady');

    var data = ProductJS.Utilities.parseDatasetJsonStrings(container.dataset);

    if(container.dataset.newHash !== "false") {
      jumplink.updateHash(container.dataset.newHash);
    }

    jumplink.initShopifyAdminBar();

    jumplink.closeAllModals();

    jumplink.replaceNoImage();

    jumplink.initDataAttributes(container.dataset);

    setNavActive(container.dataset, data);

    jumplink.setBarbaContainerMinHeight();

    if(window.jumplink.sections) {
      window.jumplink.sections.init(container.dataset, data);
    }

    jumplink.cache.$window.on('resize load onorientationchange', function() {
      // console.log('window resize load or onorientationchange event fired');
      // WORKAROUND why is this event sometimes fired before jumplink.setBarbaContainerMinHeight is defined?
      if(ProductJS.Utilities.isFunction(jumplink.setBarbaContainerMinHeight)) {
        jumplink.setBarbaContainerMinHeight();
      } else {
        console.error(new Error('jumplink.setBarbaContainerMinHeight is not a function'));
      }
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
      var template = initTemplate[currentStatus.namespace](container.dataset, data);
      if(typeof(template) !== 'undefined' && ProductJS.Utilities.isFunction(template.destory)) {
        Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container) {
          template.destory();
          Barba.Dispatcher.off( 'newPageReady', this );
        });
      } else {
        console.warn("template "+currentStatus.namespace+" needs a destroy function!");
      }

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
    var MovePage = initBarbaTransition();
    return MovePage;
  };
  
  // activate precache
  if(window.settings.barba && window.settings.barba_prefetch) {
    window.jumplink.debug.barba('enable prefetch');
    Barba.Prefetch.init();
  }
  
  window.jumplink.initTemplates();
  Barba.Pjax.start();

  /**
   * disable barba.js if disabled in theme settings or the user is in theme theme editor
   * @see https://help.shopify.com/themes/development/theme-editor/other-theme-files#detecting-the-theme-editor-with-javascript
   */
  if(!window.settings.barba ||(Shopify && Shopify.designMode === true)) {
    window.jumplink.debug.barba('disable barba.js');
    Barba.Pjax.preventCheck = function() {
      return false;
    };
  }

  /**
   * msg – The message associated with the error, e.g. “Uncaught ReferenceError: foo is not defined”
   * url – The URL of the script or document associated with the error, e.g. “/dist/app.js”
   * lineNo – The line number (if available)
   * columnNo – The column number (if available)
   * error – The Error object associated with this error (if available)
   */
  window.onerror = function(message, url, lineNumber, columnNumber, error) {
    if(message === 'Script error.') {
      throw new Error(message);
    } else if(message === 'Uncaught Error: Collapse is transitioning') {
      // ignore
    } else if(error === null) {
      // ignore
      console.error(new Error('unknown error '+message));
    } else {
      if(window.settings.app_sentry) {
        // Raven.showReportDialog();
      }
      console.error("Error! Disable Pajax!");
      console.error('message', message, 'url', url, 'lineNumber', lineNumber, 'columnNumber', columnNumber, 'error', error);
      // Go into fallback mode by isable barba links
      Barba.Pjax.preventCheck = function() {
        return false;
      };
    }
    return true;
  };

}

var initFooter = function () {
  var $footer = jumplink.cache.$footer;
  var data = $footer.data();
  if(typeof(data) === 'undefined') {
    return console.warn('footer not found');
  }
  var $target = $(data.target);
  var $htmlBody = jumplink.cache.$htmlBody;
  var $document = jumplink.cache.$document;
  var $window = jumplink.cache.$window;

  var $icon = $('.imprint .iconset.arrow');

  $footer.click(function(event) {
    // open
    if($target.hasClass('hidden-xs-up')) {
      // event name inspired by https://v4-alpha.getbootstrap.com/components/modal/#events
      jumplink.cache.$document.trigger('show.jl.footer');
      $icon.transition({ 'rotate': '270deg' });
      $target.removeClass('hidden-xs-up');
      var scrollTop = $document.height() - $window.height();
      $htmlBody.animate({ scrollTop: scrollTop }, 1000, function () {
        jumplink.cache.$document.trigger('shown.jl.footer');
      });
    // close  
    } else {
      jumplink.cache.$document.trigger('hide.jl.footer');
      $icon.transition({ 'rotate': '90deg' });
      var scrollTop = $target.offset().top - $window.height() - 4;
      $htmlBody.animate({ scrollTop: scrollTop }, 1000, function () {
        $target.addClass('hidden-xs-up');
        jumplink.setBarbaContainerMinHeight();
        jumplink.cache.$document.trigger('hidden.jl.footer');
      });
    }
  });
}

/*
 * Init Javascripts outsite of barba.js
 * run init as soon as jQuery is ready
 * 
 * @note see jumplink.initTemplates() for inits insite of barba.js 
 */
$(function() {
  jumplink.init();

  initFooter();

  initSearchField();
  
  window.jumplink.initModalHistoryBack();

  initNavbar();

  jumplink.initAlert();

  ProductJS.init({
    moneyFormat: window.shop.moneyFormat,
    moneyWithCurrencyFormat: window.shop.moneyWithCurrencyFormat,
    quantity: 1,
  });

  initBarba();
});