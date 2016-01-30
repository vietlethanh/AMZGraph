// init holder
(function () {
	"use strict";
	this.amz = {
		olc: {
			config: Config,
			info: info,
			emptyFn: emptyFn
		}
	};
	//wrapper Golbal varibale
	var Config = this.Config;
	
	// implement code 
	var info = {
		manage: false
	};
	var emptyFn = function(){}; 
}).call(this);

(function () {
    "use strict";
    // wrapper
    var amz = this.amz,
		Config = this.Config;

    var request = {
        execute: function (url, data, fx, method, host, fxFail) {
            if (method === undefined) method = 'GET';
            if (host === undefined) host = Config.Request.Host;
            $.ajax({
                url: host + url,
                type: method,
                cache: false,
                data: data,
                crossDomain: true,
                success: function (data, textStatus, jqXHR) {
                    fx(data, { textStatus: textStatus, jqXHR: jqXHR });
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    if (fxFail) {
                        fxFail();
                    } else {
                        //console.log('fail connection');
                    }
                    olc.ui.hideLoading();
                }
            });
        },
        execute2: function (url, data, fx, method, host, fxFail) {
            if (method === undefined) method = 'GET';
            if (host === undefined) host = Config.Request.Host;
            $.ajax({
                url: host + url,
                type: method,

                cache: false,
                success: function (data, textStatus, jqXHR) {
                    var ct = jqXHR.getResponseHeader("content-type") || "";
                    fx(data, { textStatus: textStatus, jqXHR: jqXHR, contentType: ct });
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    olc.ui.hideLoading();
                }
            });
        },
        post: function (url, data, fx) {
            this.execute(url, data, fx, 'POST');
        },
        get: function (url, data, fx, fxFail) {
            this.execute(url, data, fx, 'GET', Config.Request.Host, fxFail);
        }
    };
    // exports
    amz.olc.request = request;
    return request;
}).call(this);
(function(){
	//wrapper 
	var amz = this.amz, olc = amz.olc;

	// exports
	olc.form = {
		getFormData: getFormData,
		addValidationRules: addValidationRules
	};

	// implement
	function getFormData($form){
		var a = $form.serializeArray(), o = {};
		console.log(a);
		$.each(a, function(){
			if (o[this.name] !== undefined) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	}
	
	function addValidationRules(){
		/* add the rule here */
		$.validator.addMethod("valueNotEquals", function(value, element, arg){
			return arg != value;
		}, "Value must not equal arg.");
		$.validator.addMethod("validateNumber", function(value, element, arg){
			return !/[-() _]$/.test(value) && value !== "";
		}, "The value must be numeric.");
		$.validator.addMethod("validatePassword", function(value, element, arg){
			if(value.search(/\d/) == -1 || value.search(/[a-zA-Z]/) == -1)
				return false;
			return true;
		}, "Password must include at least one letter and one number.");
	}
}).call(this);
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
(function() {
	//wrapper
	var amz = this.amz,
		olc = amz.olc,
		w = this;

	var PATH_MATCH = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/;

	// export;
	var urlPrototype = {
		addHash: addHash,
		removeHashes: removeHashes,
		search: search
	};
	olc.url = urlPrototype;

	/* coppy from angular */
	var isFunction = $.isFunction;
	var isArray =  $.isArray;
	var lowercase = function(string){return typeof(string) === 'string' ? string.toLowerCase() : string;};
	var msie;
	msie = parseInt((/msie (\d+)/.exec(lowercase(navigator.userAgent)) || [])[1], 10);
	if (isNaN(msie)) {
		msie = parseInt((/trident\/.*; rv:(\d+)/.exec(lowercase(navigator.userAgent)) || [])[1],10);
	}
	var urlParsingNode = document.createElement("a");
	var originUrl = urlResolve(window.location.href, true);

	function isDefined(value){return typeof value !== 'undefined';}

	function isObject(value){return value !== null && typeof value === 'object';}

	function isArrayLike(obj) {
		if (obj === null || isWindow(obj)) {
			return false;
		}

		var length = obj.length;

		if (obj.nodeType === 1 && length) {
			return true;
		}

		return isString(obj) || isArray(obj) || length === 0 ||
			typeof length === 'number' && length > 0 && (length - 1) in obj;
	}

	function isWindow(obj) {
		return obj && obj.document && obj.location && obj.alert && obj.setInterval;
	}

	function isString(value){return typeof value === 'string';}

	function forEach(obj, iterator, context) {
		var key;
		if (obj) {
			if (isFunction(obj)) {
				for (key in obj) {
					// Need to check if hasOwnProperty exists,
					// as on IE8 the result of querySelectorAll is an object without a hasOwnProperty function
					if (key != 'prototype' && key != 'length' && key != 'name' && (!obj.hasOwnProperty || obj.hasOwnProperty(key))) {
						iterator.call(context, obj[key], key);
					}
				}
			} else if (isArray(obj) || isArrayLike(obj)) {
				for (key = 0; key < obj.length; key++) {
					iterator.call(context, obj[key], key);
				}
			} else if (obj.forEach && obj.forEach !== forEach) {
				obj.forEach(iterator, context);
			} else {
				for (key in obj) {
					if (obj.hasOwnProperty(key)) {
						iterator.call(context, obj[key], key);
					}
				}
			}
		}
		return obj;
	}

	function urlResolve(url, base) {
		var href = url;

		if (msie) {
			// Normalize before parse.  Refer Implementation Notes on why this is
			// done in two steps on IE.
			urlParsingNode.setAttribute("href", href);
			href = urlParsingNode.href;
		}

		urlParsingNode.setAttribute('href', href);

		// urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
		return {
			href: urlParsingNode.href,
			protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
			host: urlParsingNode.host,
			search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
			hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
			hostname: urlParsingNode.hostname,
			port: urlParsingNode.port,
			pathname: (urlParsingNode.pathname.charAt(0) === '/') ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
		};
	}

	function tryDecodeURIComponent(value) {
		 try {
			 return decodeURIComponent(value);
		 } catch (e) {
			 // Ignore any invalid uri component
		 }
	}

	function parseKeyValue( /**string*/ keyValue) {
		var obj = {},
			key_value, key;
		forEach((keyValue || "").split('&'), function(keyValue) {
			if (keyValue) {
				key_value = keyValue.replace(/\+/g, '%20').split('=');
				key = tryDecodeURIComponent(key_value[0]);
				if (isDefined(key)) {
					var val = isDefined(key_value[1]) ? tryDecodeURIComponent(key_value[1]) : true;
					if (!hasOwnProperty.call(obj, key)) {
						obj[key] = val;
					} else if (isArray(obj[key])) {
						obj[key].push(val);
					} else {
						obj[key] = [obj[key], val];
					}
				}
			}
		});
		return obj;
	}



	function toKeyValue(obj) {
		var parts = [];
		forEach(obj, function(value, key) {
			if (isArray(value)) {
				forEach(value, function(arrayValue) {
					parts.push(encodeUriQuery(key, true) +
						(arrayValue === true ? '' : '=' + encodeUriQuery(arrayValue, true)));
				});
			} else {
				parts.push(encodeUriQuery(key, true) +
					(value === true ? '' : '=' + encodeUriQuery(value, true)));
			}
		});
		return parts.length ? parts.join('&') : '';
	}

	function encodeUriSegment(val) {
		return encodeUriQuery(val, true).
			replace(/%26/gi, '&').
			replace(/%3D/gi, '=').
			replace(/%2B/gi, '+');
	}

	function encodeUriQuery(val, pctEncodeSpaces) {
		return encodeURIComponent(val).
			replace(/%40/gi, '@').
			replace(/%3A/gi, ':').
			replace(/%24/g, '$').
			replace(/%2C/gi, ',').
			replace(/%20/g, (pctEncodeSpaces ? '%20' : '+'));
	}


	/* end copy from angular */

	function hash() {
		/*
		var location, url, match, hash, queryHash;
		location = window.location;
		url = location.href;
		match = PATH_MATCH.exec(url);
		hash = match[5] || '';
		return hash;
		*/
	}

	function addHash(obj) {
		var location, url, match, hash, queryHash;

		location = window.location;
		url = location.href;
		/*
		match = PATH_MATCH.exec(url);
		hash = match[5] || '';
		*/
		if (typeof(obj) === 'string') {
			location.hash = obj;
		} else if (typeof(obj) === 'object') {
			location.hash = $.param(obj);
		}

	}
	
	function removeHashes(){
		window.location.hash = '';
	}

	function search(searchP) {
		var url, h, location;  
		
		url = urlResolve(window.location.href, true);
		h = url.hash;
		location = window.location;

		if(arguments.length === 0){
			return parseKeyValue(h);
		}
		else if(isObject(searchP)){
			/* jshint ignore:start */
			forEach(searchP, function(value, key) {
				if (value == null) delete searchP[key];
			});
			location.hash = toKeyValue(searchP);
			/* jshint ignore:end */
			return searchP;
		}
	}

}).call(this);

// Module
(function(){
	'use strict';
	//wrapper
	var amz = window.amz, olc = amz.olc; 
	olc.util = {
		data: {}
	};

}).call(this);

// Utils Module :: --------------------------------------------------------------------------------------------------------
(function(){	
	var amz = this.amz,
		olc = amz.olc, 
		utilsModule = olc.util, 
		serverData = utilsModule.data;

	//exports
	utilsModule.utils = {
		roundNumber :  roundNumber,
		cutlast: cutlast,
		stripHTML: stripHTML,
		checkDateTime: checkDateTime
	};

	// implements
	function roundNumber(num, dec) {
        var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
        return result;
	}
	function cutlast(input, len) {
        if (input.length < len) {
            len = input.length;
        }
        return input.substring(0, input.length - len);
    }
    function stripHTML(input) {
        return input.replace(/(<([^>]+)>)/ig, "");
    }
	function checkDateTime(dateString){
		var dateTime = new Date(dateString);
		//dateString: MM/DD/YYYY
		var arr = dateString.split("/");
		var month = arr[0];
		var day = arr[1];
		var year = arr[2];
		if(!parseFloat(month) && !parseFloat(day) && !parseFloat(year))
			return true;
		var validDate = dateTime.getFullYear() == year && (dateTime.getMonth() + 1) == parseFloat(month) && dateTime.getDate() == parseFloat(day);
		return validDate;
	}
}).call(this);
// End Recipe Module :: dataService  --------------------------------------------------------------------------------------------------------