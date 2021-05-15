function sharedNumber () {
	var sum_twitter = 0;
	$.getJSON('http://api.sharedcount.com/?url=http://www.comovotar.com', function(data) {
		$.each(data, function(key, value) {
			if (key=="Facebook") {
				$.each(value, function(key, val) {
					if (key=="total_count") {
						$('#share_wrapper > #share_facebook > span').text(val);
					}
				});
			} else if (key=="GooglePlusOne") {
				$('#share_wrapper > #share_gplus > span').text(value);
			} else if (key=="Twitter") {
				sum_twitter += parseInt(value);
				$('#share_wrapper > #share_twitter > span').text(sum_twitter);
			}
		});
	});
	$.getJSON('http://api.sharedcount.com/?url=http://comovotar.com', function(data) {
		$.each(data, function(key, value) {
			if (key=="Twitter") {
				sum_twitter += parseInt(value);
				$('#share_wrapper > #share_twitter > span').text(sum_twitter);
			}
		});
	});
}
