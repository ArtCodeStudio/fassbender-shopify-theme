/**
 * AGB Box V1.6
 * Copyright by Pascal Garber <pascal@jumplink.eu>
 * 
 * Copy checkout.min.js this script in the Shopify backend under Google Analytics
 * 
 */
var start = function () {
    var cc = {};

    cc.handle = 'fassbender';

    cc.agbInStep = 'payment_method'; // payment_method | review

    cc.urls = {
        privacyPolicy: '/pages/it-recht-datenschutz',
        TermsOfService: '/pages/it-recht-agb',
        contact: '/pages/contact',
        serviceMail: 'customercare@myfassbender.com'
    };

    cc.texts = {};
    cc.texts.suppliers = {
        ups: 'United Parcel Service Deutschland Inc. & Co. OHG, Görlitzer Straße 1, 41460 Neuss',
        dhl: 'DHL Express Germany GmbH, Heinrich-Brüning-Str. 5, 53113, Bonn',
        other: 'weiterer Lieferanten'
    };
    cc.texts.dataTransfer = "Ich bin damit einverstanden, dass meine E-Mail-Adresse bzw. meine Telefonnummer an <em>" + cc.texts.suppliers.ups + ' und ' + cc.texts.suppliers.other + "</em> weitergegeben wird, damit der Paketdienstleister vor der Zustellung der Ware zum Zwecke der Abstimmung eines Liefertermins per E-Mail oder Telefon Kontakt mit mir aufnehmen bzw. Statusinformationen zur Sendungszustellung übermitteln kann. Meine diesbezüglich erteilte Einwilligung kann ich jederzeit widerrufen.",
        cc.texts.legals = 'Hiermit akzeptiere ich Ihre <a href="' + cc.urls.TermsOfService + '" target="_blank" title="AGB">AGB</a> sowie Ihre <a href="' + cc.urls.privacyPolicy + '" target="_blank" title="Datenschutzerklärung">Datenschutzerklärung</a>.';

    cc.errors = {};
    cc.errors.acceptLegals = 'Bitte akzeptieren Sie unsere <a href="' + cc.urls.TermsOfService + '" target="_blank" title="AGB">AGB</a> und <a href="' + cc.urls.privacyPolicy + '" target="_blank" title="Datenschutzerklärung">Datenschutzerklärung</a>.<br><br>Bei Fragen zu unseren Kaufbedingungen kontaktieren Sie bitte unseren <a href="' + cc.urls.contact + '" target="_blank" title="Kundenservice">Kundenservice</a>.';
    cc.errors.acceptDataTransfer = 'Bitte akzeptieren Sie unsere Nachrichtenübermittlung an den Paketdienstleister.<br><br>Bei Fragen zu unseren Kaufbedingungen kontaktieren Sie bitte unseren <a href="' + cc.urls.contact + '" target="_blank" title="Kundenservice">Kundenservice</a>.';

    cc.templates = {
        notes: '<div class="content-box">' +
            '<div class="content-box__row">' +
            '<div class="content-box__header">' +
            '<div class="content-box__header__title">' +
            '<h3>Kaufbedingungen</h3>' +
            '</div>' +
            '</div>' +
            '<p class="content-legals">' +

            '</p>' +
            '<div class="checkbox-wrapper">' +
            '<div class="checkbox__input">' +
            '<input class="input-checkbox" aria-expanded="false" type="checkbox" name="data transfer" id="checkout_legals">' +
            '</div>' +
            '<label class="checkbox__label" for="checkout_legals">' +
            cc.texts.legals +
            '<p class="field__message field__message--error" id="error-for-legals">' + cc.errors.acceptLegals + '</p>' +
            '</label>' +
            '</div>' +
            '<div class="checkbox-wrapper">' +
            '<div class="checkbox__input">' +
            '<input class="input-checkbox" aria-expanded="false" type="checkbox" name="data transfer" id="checkout_data_transfer_true">' +
            '</div>' +
            '<label class="checkbox__label" for="checkout_data_transfer_true">' +
            cc.texts.dataTransfer +
            '<p class="field__message field__message--error" id="error-for-data-transfer">' + cc.errors.acceptDataTransfer + '</p>' +
            '</label>' +
            '</div>' +
            '</div>' +
            '</div>'
    };
    cc.googleAnalyticsTrackingId = 'UA-126476233-1';
    cc.googleAnalyticsDisableStr = 'ga-disable-' + cc.googleAnalyticsTrackingId;
    cc.theTradeDeskDisableStr = 'TTDOptOut';
    cc.facebookPixelDisableStr = 'fb-pixel-is-disabled';

    cc.disableGoogleAnalytics = function () {
        window[cc.googleAnalyticsDisableStr] = true;
        // be sure that ga is disabled by overwrite the function
        window._ga = window.ga;
        window.ga = function() {
            console.warn('[checkout] ga is disabled, ignore');
        };
    };

    cc.disableFacebookPixel = function () {
        window[cc.facebookPixelDisableStr] = true;
        // be sure that ga is disabled by overwrite the function
        window._fbq = window.fbq;
        window.fbq = function() {
            console.warn('[checkout] fbq is disabled, ignore');
        };
    };

    cc.disableTheTradeDesk = function() {
        window[cc.theTradeDeskDisableStr] = true;
    };

    cc.cookieIsTrue = function(cookieStr) {
        if (document.cookie.indexOf(cookieStr + '=true') > -1) {
            return true;
        }
        return false;
    };

    cc.disableTrackingsIfCookieIsSet = function() {
        if (cc.cookieIsTrue(cc.theTradeDeskDisableStr)) {
            cc.disableTheTradeDesk();
        }
        if (cc.cookieIsTrue(cc.facebookPixelDisableStr)) {
            cc.disableFacebookPixel();
        }
        if (cc.cookieIsTrue(cc.facebookPixelDisableStr)) {
            cc.disableTheTradeDesk();
        }
    };

    cc.loadScript = function (url, cb) {
        var script_tag = document.createElement("script");
        script_tag.type = "text/javascript";
        script_tag.src = url;
        script_tag.onload = cb;
        script_tag.onerror = function (error) {
            console.error('[checkout] error on load script', url, error);
        };
        document.body.appendChild(script_tag);
    };

    cc.scrollDown = function () {
        window.scrollTo(0, document.body.scrollHeight);
    };

    cc.loadJquery = function (cb) {

        // console.log(window);

        if ($) {
            // console.log("[checkout] jQuery found", $);

            $(document).ready(function () {
                cb(null, $);
            });

        } else if (jQuery) {
            // console.log("[checkout] jQuery found", jQuery);

            jQuery(document).ready(function () {
                cb(null, jQuery);
            });

        } else {
            // load jQuery
            cc.loadScript("https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js", function () {
                window.jQuery(document).ready(function () {
                    cb(null, window.jQuery);
                });
            });
        }
    };

    /**
     * Inject custom style by url or style string
     * @param {*} isUrl If style should be injected by an url this must be true
     * @param {*} urlOrStyle Url to css file or the style string
     * @param {*} cb callback wich is called after the style was loaded
     */
    cc.loadCss = function (isUrl, urlOrStyle, cb) {
        var head = document.getElementsByTagName('head')[0];
        var style;
        if (isUrl) {
            style = document.createElement('link');
            style.href = urlOrStyle;
        } else {
            style = document.createElement('style');
            style.innerHTML = urlOrStyle;
        }
        style.rel = 'stylesheet';
        style.type = 'text/css';
        style.media = 'all';
        style.onload = function () {
            cb(null, style);
        };
        style.onerror = function (error) {
            console.error('[checkout] error on load css', urlOrStyle, error);
        };
        head.appendChild(style);
    };

    cc.timeout = function (duration, timer, cb) {
        setTimeout(function () {
            if (timer >= 0) {
                cb(timer--);
                cc.timeout(duration, timer, cb);
            }
        }, duration);
    };


    cc.loadCustomStyle = function (cb) {
        cc.loadCss(
            true,
            'https://cdn.shopify.com/s/files/1/0075/8903/6147/files/custom-checkout.css?16684598101524282847',
            cb
        );
    };

    cc.initTracking = function (cb) {
        if (cc.cookieIsTrue(cc.theTradeDeskDisableStr)) {
            console.log('[checkout] ttd tracking is disabled');
        } else {
            cc.loadScript('https://cdn.shopify.com/s/files/1/0075/8903/6147/files/up_loader.1.1.3.js?16684598101524282847', function () {
                ttd_dom_ready(function () {
                    if (typeof TTDUniversalPixelApi === 'function') {
                        var universalPixelApi = new TTDUniversalPixelApi();
                        universalPixelApi.init("1fqgs22", ["hqe0lr3"], "https://insight.adsrvr.org/track/up");
                        cb();
                    }
                });
            });
        }
    };

    cc.initAgbBox = function () {

        cc.loadJquery(function (error, $) {
            var appendOn = $('.step__sections:last');
            // console.log(appendOn);
            appendOn.append(cc.templates.notes);

            $('[data-trekkie-id="complete_order_button"]').on('click', function (event) {
                // console.log("[checkout] clicked");

                var error = false;

                if (!$('#checkout_legals').is(":checked")) {
                    event.preventDefault();
                    $('#error-for-legals').show();
                    error = true;
                } else {
                    $('#error-for-legals').hide();
                }

                if (!$('#checkout_data_transfer_true').is(":checked")) {
                    event.preventDefault();
                    $('#error-for-data-transfer').show();
                    error = true;
                } else {
                    $('#error-for-data-transfer').hide();
                }

                if ($('#checkout_legals').is(":checked") && $('#checkout_data_transfer_true').is(":checked")) {
                    error = false;
                    event.stopPropagation();
                }

                if (error) {
                    cc.scrollDown();
                }
            });
        });
    };


    cc.customContactInformation = function () {

    };

    cc.customShippingMethod = function () {

    };

    cc.customPaymentMethod = function () {

    };

    /**
     * Execute code on the thank you page,
     * please note that there is a better and official way to inject html to the thank you page:
     * Go to /admin/settings/checkout and add them to the textera under Additional scripts
     */
    cc.customThankYou = function () {

    };

    /**
     * Inject code to the review page, this page is only avaible if you 
     * have activate the `Require a confirmation step` checkbox
     * on admin/settings/checkout
     */
    cc.customReview = function () {

    };

    /**
     * Execute this on all steps in the checkout
     */
    cc.customAllSteps = function () {
        // Track any site on each step
        cc.loadCustomStyle(function () {

        });
        cc.disableTrackingsIfCookieIsSet();
    };

    /**
     * Execute this on any site of the checout and in your shop frontend
     */
    cc.customAll = function () {
        cc.initTracking(function () {
            console.log('[checkout] tracked!');
        });
    };

    // console.log("[checkout]", window.Shopify.Checkout);
    cc.step = '';
    if (window && window.Shopify && window.Shopify.Checkout && window.Shopify.Checkout.step) {
        cc.step = window.Shopify.Checkout.step;
    } else {
        var hasClass = document.querySelector('.os-order-number') !== null;
        if (hasClass === true) {
            cc.step = 'thank_you';
        }
    }

    if (cc.step) {
        console.log('[checkout] step', cc.step);
        switch (cc.step) {
            case 'contact_information':
                cc.customContactInformation();
                cc.customAllSteps();
                break;
            case 'shipping_method':
                cc.customShippingMethod();
                cc.customAllSteps();
                break;
            case 'payment_method':
                cc.customPaymentMethod();
                cc.customAllSteps();
                break;
            case 'thank_you':
                cc.customThankYou();
                cc.customAllSteps();
                break;
            case 'review':
                cc.customReview();
                cc.customAllSteps();
                break;
            default:
                console.log('[checkout] Unknown step!', cc.step);
                break;
        }
    }

    if (cc.agbInStep === cc.step) {
        cc.initAgbBox();
    }

    cc.customAll();
};

window.onload = function() {
    try {
        start();
    } catch (error) {
        console.error(error);
    }
};