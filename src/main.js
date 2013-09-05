$(document).ready(function () {
	$(document).keyup(function (event) {
		if (event.which == 40) {
			//TODO check if at the end of content
			//evaluate input content

			var field = $(event.target);
			try {
				var value = field.val();
				var result;
				if (isNaN(value)) {
					//evaluate
					result = Parser.evaluate(value);
				} else {
					//try to convert to fraction
					result = Ratio.parse(parseFloat(value)).simplify().toString();
				}
				field.val(result);
			} catch (error) {
				var errorDiv = $("#errorNotification");
				if (!errorDiv[0]) {
					$("body").append("<div id='errorNotification'></div>");
					errorDiv = $("#errorNotification");
				}
				errorDiv.html(error.message);
				errorDiv.css({
					"top": field.position().top + field.height() / 2 - errorDiv.height() / 2,
					"left": field.position().left + field.width() + 10
				});
				errorDiv.show();
				errorDiv.stop().delay(5000).fadeOut();
				errorDiv.click(function () {
					$(this).stop().fadeOut();
				});
			}
		}
	});
});