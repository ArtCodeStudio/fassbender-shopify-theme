// JumpLink object
window.jumplink = window.jumplink || {};
window.jumplink.sections = {};

// debugging https://github.com/visionmedia/debug
window.jumplink.debug = window.jumplink.debug || {};
window.jumplink.debug.sections = debug('theme:sections');

/**
 * Search for shopify sections and init them if init function is defined
 * @see https://help.shopify.com/themes/development/theme-editor/sections
 */
window.jumplink.sections.init = function(dataset, data) {
  window.jumplink.debug.sections('init');
  var $sections = $('.shopify-section');
  $sections.each(function(index) {
    var $section = $(this);
    window.jumplink.debug.sections('$section', $section);
    var sectionID = $section.attr('class').replace('shopify-section', '').trim();
    
    if(ProductJS.Utilities.isFunction(window.jumplink.sections[sectionID])) {
      window.jumplink.debug.sections('init '+sectionID);
      window.jumplink.sections[sectionID]($sections, $section, dataset, data);
    } else {
      window.jumplink.debug.sections('no javascript for section id: "'+sectionID+'"');
    }
  });
};

/**
 * init sections/jumplink-carousel.liquid
 */
window.jumplink.sections['jumplink-carousel'] = function($sections, $section, dataset, data) {
  $section.each(function(index) {
    var $section = $(this);
    var $slick = $section.children();
    if($slick.length <= 0) {
      window.jumplink.debug.sections('carousel disabled');
      return;
    }
    var slickSettings = $slick.data().slickSettingsJsonString;
    slickSettings.responsive = [
      {
        breakpoint: rivets.formatters.justDigits(window.settings['bs4-grid-breakpoints-xl']),
        settings: {

        }
      },
      {
        breakpoint: rivets.formatters.justDigits(window.settings['bs4-grid-breakpoints-lg']),
        settings: {

        }
      },
      {
        breakpoint: rivets.formatters.justDigits(window.settings['bs4-grid-breakpoints-md']),
        settings: {

        }
      },
      {
        breakpoint: rivets.formatters.justDigits(window.settings['bs4-grid-breakpoints-sm']),
        settings: {
          arrows: false,
          dots: false,
        }
      },
      {
        breakpoint: rivets.formatters.justDigits(window.settings['bs4-grid-breakpoints-xs']),
        settings: {
          arrows: false,
          dots: false,
        }
      }
    ];

    window.jumplink.debug.sections('slickSettings', slickSettings);

    var setSlickControlColor = function (index) {
      var slideColor = 'black';
      if(typeof index !== 'undefined') {
        slideColor = $slick.find('[data-slick-index="'+index+'"]').data('color');
      } else {
        slideColor = $slick.find('.slick-current').data('color');
      }
      $slick.attr('data-color', slideColor);
    }

    // init carousel
    if(!$slick.hasClass('slick-initialized')) {
      $slick.slick(slickSettings);
      setSlickControlColor();

      $slick.unbind('beforeChange').on('beforeChange', function(event, slick, currentSlideIndex, nextSlideIndex){
        setSlickControlColor(nextSlideIndex);
      });
    }
  });
}

/**
 * init sections/jumplink-pages.liquid
 */
window.jumplink.sections['jumplink-pages'] = function($sections, $section, dataset, data) {
  // $section.each(function(index) {
  //   var $section = $(this);
  // });
}

/**
 * init sections/jumplink-instashop.liquid
 */
window.jumplink.sections['jumplink-instashop'] = function($sections, $section, dataset, data) {
  /**
   * Load script
   * 
   * @see https://apps.shopify.com/foursixty
   * @see https://foursixty.com/dashboard/
   */
  $.getScript( '//foursixty.com/media/scripts/fs.embed.v2.js')
  .done(function( script, textStatus ) {
    window.jumplink.debug.sections('instashop was performed.');
  })
  .fail(function( jqxhr, settings, error ) {
    console.error('instashop error', error);
  });
}

/**
 * init sections/jumplink-images-row.liquid
 */
window.jumplink.sections['jumplink-images-row'] = function($sections, $section, dataset, data) {
  // $section.each(function(index) {
  //   var $section = $(this);
  // });
}
