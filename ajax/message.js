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
	
	function data() {
		$.ajax({
			type: "POST",
			url: "php/data.php",
			dataType : 'json',
			success: function(someData){
				callback(someData);
			},
			error: function() {
				alert('Eror!');
			}
		});
	}
	var exists = [];
	data();
	function callback(respond) {	
		var timeNow = Date.now();
		for (var i = 0; i < respond.length; i++) {
			var data1 = respond[i];
			if (exists.indexOf(data1[0]) != -1) continue;

			var timeInMessage = data1[1] * 1000;
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
				$('.name', rowClone).html(data1[2]);
				$('.message', rowClone).html(smile(data1[3]));
				$('.scroller').scrollTop($('#messages').height());

				exists.push(data1[0]);
			}
		}
		setTimeout(function(){data();}, 3000);
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
				data();
				$('#text').val('');
			}
		});
		return	false;
	});
	
	$('.logout').click(function(){
		document.location = 'register.html';
	});
});