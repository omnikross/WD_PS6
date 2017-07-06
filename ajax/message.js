$(document).ready(function(){
	$.getJSON('data/messages.json', callback);
	function callback(respond) {
		setTimeout(function tick() {
			for (var i = 0; i < respond.length; i++) {
				var data = respond[i];
				var now  = Date.now();
				var diff_time = Math.floor(now - ((data.time) * 1000));
				if(diff_time <= 3600000) {
					var new_date = new Date(diff_time);
					var res = [new_date.getHours(), new_date.getMinutes(), new_date.getSeconds()].map(function (x) {
						return x < 10 ? "0" + x : x;
					}).join(":");
					var rowClone = $('.mess_hide').clone().removeClass('mess_hide');
					$('#messages').append(rowClone);
					$('.time', rowClone).html(res);
					$('.name', rowClone).html(data.user);
					$('.message', rowClone).html(data.message);
					$('.scroller').scrollTop($('#messages').height()); 
				}
			}		
		setTimeout(tick, 3600000);
	}, 1);
	}
	$('#easyForm').submit(function(){
		var text = $('#text').val();
		$.ajax({
			type : 'POST',
			url  : 'php/chat_script.php',
			data : {
				message:text
			},
			success: function(arr) {
				arr = $.parseJSON(arr);
				var time = (arr.time);
				var date = new Date(+time * 1000);
				var d = new Date(date);
				var res = [d.getHours(), d.getMinutes(), d.getSeconds()].map(function (x) {
					return x < 10 ? "0" + x : x;
				}).join(":");
				$('#messages').append($('.mess_hide').clone().addClass('mess_tmp').removeClass('mess_hide'));
				$('.mess_tmp>.time').html(res);
				$('.mess_tmp>.name').html(arr.user);
				$('.mess_tmp>.message').html(arr.message);
				$('.mess_tmp').removeClass('mess_tmp');
				$('.scroller').scrollTop($('#messages').height());
				$('#text').val('');
			}
		});
		return	false;
	});
});