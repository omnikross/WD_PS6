$(document).ready(function(){
	$('#submit').click(function(){
		var name = $('#username').val();
		$.ajax({
			type : 'POST',
			url  : 'php/chat_script.php',
			data : {
				user:name
			},
			success: function(a) {
				alert(a);
			}
		});
		return	false;
	});
});