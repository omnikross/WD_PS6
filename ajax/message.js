$(document).ready(function(){
	function smile(mess){
		var smile = ":)";
		var graficSmile = "<img src = './image/Smile.png' alt='Smile' align='middle'>";
		var string_with_replaced_smile =  mess.replace(smile, graficSmile);
		var sad = ":("
		var graficSad = "<img src = './image/Sad.png' alt='Smile' align='middle'>";
		var string_with_replaced_smile_and_sad = string_with_replaced_smile.replace(sad, graficSad);
		return string_with_replaced_smile_and_sad;
	}
	$.getJSON('data/messages.json', callback);
	var exists = [];
	function callback(respond) {
		setTimeout(function tick() {
			var timeNow = Date.now();
			for (var i = 0; i < respond.length; i++) {
				var data = respond[i];
				if (exists.indexOf(data.id) != -1) continue;
				var timeInMessage = data.time * 1000;
				var diff_time = (timeNow - timeInMessage);
				if(diff_time <= 3600000) {
					var newDate = new Date(timeInMessage);
					var res = [newDate.getHours(), newDate.getMinutes(), newDate.getSeconds()].map(function (x) {
						return x < 10 ? "0" + x : x;
					}).join(":");
					var rowClone = $('.mess_hide').clone().removeClass('mess_hide');
					$('#messages').append(rowClone);
					$('.time', rowClone).html(res);
					$('.name', rowClone).html(data.user);
					$('.message', rowClone).html(smile(data.message));
					$('.scroller').scrollTop($('#messages').height());
					exists.push(data.id);
					console.log(exists);
				}
			}
			setTimeout(tick, 5000);
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
				$('.mess_tmp>.message').html(smile(arr.message));
				$('.mess_tmp').removeClass('mess_tmp');
				$('.scroller').scrollTop($('#messages').height());
				$('#text').val('');
			}
		});
		return	false;
	});
	$('.logout').click(function(){
		document.location = 'register.html';
	});
});