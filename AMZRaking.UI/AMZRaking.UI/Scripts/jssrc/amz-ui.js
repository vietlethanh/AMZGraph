// ui ------------------------------------------------------------------
/**
	amz.olc.ui
	@Description: UI Helper
**/
(function () {
    //wrapper 
    var amz = this.amz, olc = amz.olc;
    //export
    var uiPrototype = {
        getWindowDimensions: getWindowDimensions,
        showLoading: showLoading,
        hideLoading: hideLoading,
        loadContent: loadContent,
        removePhoneFormat: removePhoneFormat,
        addPageClass: addPageClass
    };
    olc.ui = uiPrototype;

    // implement code	

    function getWindowDimensions() {
        var wind = $(window);
        var docu = $(document);
        // fix a jQuery/Opera bug with determining the window height
        var h = $.browser.opera && $.browser.version > '9.5' && $.fn.jquery < '1.3' || $.browser.opera && $.browser.version < '9.5' && $.fn.jquery > '1.2.6' ? wind[0].innerHeight : wind.height();
        return {
            d: [docu.height(), docu.width()],
            w: [h, wind.width()]
        };
    }

    function showLoading(contaitner) {
        contaitner = contaitner ? contaitner : ($('.modal').length > 0 ? '.modal' : 'body');
        contaitner = $(contaitner);

        contaitner.addClass('loading');
    }

    function hideLoading(contaitner) {
        contaitner = contaitner || '.loading';
        contaitner = $(contaitner);
        contaitner.removeClass('loading');
    }

    function loadContent(url, params, replaceElement) {
        $.ajaxSetup({
            // Disable caching of AJAX responses
            cache: false
        });
        var defer = $.get(url, params)
		.done(function (data) {
		    if (!replaceElement) {
		        return;
		    }
		    replaceElement.html(data);
		})
		.always(function () {
		});
        return defer;
    }
    function showMessage(message) {
        jAlert(message, "Message");
    }
    function addPageClass(cls) {
        $('body').addClass(cls);
    }
    function removePhoneFormat(phoneFormat) {
        if (phoneFormat !== "" && typeof (phoneFormat) !== "undefined")
            return phoneFormat.replace(" ", "").replace("(", "").replace(")", "").replace("-", "");
        return "";
    }
}).call(this);