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