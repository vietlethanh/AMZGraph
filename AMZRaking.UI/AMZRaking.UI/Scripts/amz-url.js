(function(){function e(e){return"undefined"!=typeof e}function n(e){return null!==e&&"object"==typeof e}function t(e){if(null===e||r(e))return!1;var n=e.length;return 1===e.nodeType&&n?!0:o(e)||y(e)||0===n||"number"==typeof n&&n>0&&n-1 in e}function r(e){return e&&e.document&&e.location&&e.alert&&e.setInterval}function o(e){return"string"==typeof e}function a(e,n,r){var o;if(e)if(w(e))for(o in e)"prototype"==o||"length"==o||"name"==o||e.hasOwnProperty&&!e.hasOwnProperty(o)||n.call(r,e[o],o);else if(y(e)||t(e))for(o=0;o<e.length;o++)n.call(r,e[o],o);else if(e.forEach&&e.forEach!==a)e.forEach(n,r);else for(o in e)e.hasOwnProperty(o)&&n.call(r,e[o],o);return e}function c(e,n){var t=e;return v&&(b.setAttribute("href",t),t=b.href),b.setAttribute("href",t),{href:b.href,protocol:b.protocol?b.protocol.replace(/:$/,""):"",host:b.host,search:b.search?b.search.replace(/^\?/,""):"",hash:b.hash?b.hash.replace(/^#/,""):"",hostname:b.hostname,port:b.port,pathname:"/"===b.pathname.charAt(0)?b.pathname:"/"+b.pathname}}function i(e){try{return decodeURIComponent(e)}catch(n){}}function h(n){var t,r,o={};return a((n||"").split("&"),function(n){if(n&&(t=n.replace(/\+/g,"%20").split("="),r=i(t[0]),e(r))){var a=e(t[1])?i(t[1]):!0;hasOwnProperty.call(o,r)?y(o[r])?o[r].push(a):o[r]=[o[r],a]:o[r]=a}}),o}function u(e){var n=[];return a(e,function(e,t){y(e)?a(e,function(e){n.push(l(t,!0)+(e===!0?"":"="+l(e,!0)))}):n.push(l(t,!0)+(e===!0?"":"="+l(e,!0)))}),n.length?n.join("&"):""}function l(e,n){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,n?"%20":"+")}function s(e){var n,t;n=window.location,t=n.href,"string"==typeof e?n.hash=e:"object"==typeof e&&(n.hash=$.param(e))}function f(){window.location.hash=""}function p(e){var t,r,o;return t=c(window.location.href,!0),r=t.hash,o=window.location,0===arguments.length?h(r):n(e)?(a(e,function(n,t){null==n&&delete e[t]}),o.hash=u(e),e):void 0}var d=this.amz,g=d.olc,m={addHash:s,removeHashes:f,search:p};g.url=m;var v,w=$.isFunction,y=$.isArray,A=function(e){return"string"==typeof e?e.toLowerCase():e};v=parseInt((/msie (\d+)/.exec(A(navigator.userAgent))||[])[1],10),isNaN(v)&&(v=parseInt((/trident\/.*; rv:(\d+)/.exec(A(navigator.userAgent))||[])[1],10));var b=document.createElement("a");c(window.location.href,!0)}).call(this);