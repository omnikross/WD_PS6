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
	var exists = [];
	$.getJSON('data../messages.json', callback);

	function callback(respond) {
		var timeNow = Date.now();

		for (var i = 0; i < respond.length; i++) {
			var data = respond[i];

			if (exists.indexOf(data.id) != -1) continue;

			var timeInMessage = data.time * 1000;
			var diff_time = (timeNow - timeInMessage);

			if(diff_time <= 3600000) {
				var rowClone = $('.mess_hide').clone().removeClass('mess_hide');
				
				var newDate = new Date(timeInMessage);
				var dateArray = [newDate.getHours(), newDate.getMinutes(), newDate.getSeconds()]
				var res = dateArray.map(function (x) {
					return x < 10 ? "0" + x : x;
				}).join(":");

				$('#messages').append(rowClone);
				$('.time', rowClone).html(res);
				$('.name', rowClone).html(data.user);
				$('.message', rowClone).html(smile(data.message));
				$('.scroller').scrollTop($('#messages').height());

				exists.push(data.id);
			}
		}
		setTimeout(function() {$.getJSON('data../messages.json', callback);}, 1000);
	}
	$('#easyForm').submit(function(){
		var text = $('#text').val();
		$.ajax({
			type : 'POST',
			url  : 'php/chat_script.php',
			data : {
				message:text
			},
			success: function() {
				$.getJSON('data../messages.json', callback);
				$('#text').val('');
			}
		});
		return	false;
	});
	$('.logout').click(function(){
		document.location = 'register.html';
	});
});