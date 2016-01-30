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