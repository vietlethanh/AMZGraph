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
