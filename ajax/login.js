$(document).ready(function(){  
	$('#submit').click(function(){
		var name = $('#username').val();
		var password = $('#password').val();
		$.ajax({
			type : 'POST',
			url  : 'php/login_script.php',
			data : {
				user:name, 
				pass:password
			},
			success: function() {
				document.location = 'chat.html';
			},
			error: function() {
				alert('Invalid name or password');
			}
		});	
	});	 
});

