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