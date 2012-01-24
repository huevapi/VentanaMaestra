var socket = io.connect('http://192.168.10.123:8080');



$("#current_text").keypress(function(e){
	code= (e.keyCode ? e.keyCode : e.which);
	if (code == 13){
		socket.emit('chat',$("#current_text").val());
		$("#previous_chat_section").append(String($("#current_text").val())+'<br/>');
		$("#previous_chat_section").animate({ scrollTop: $(document).height() }, 500);
		$("#current_text").val('');
	}
});

$("#enter_button").click(function(){
	console.log($("#current_text").val());
	socket.emit('chat',$("#current_text").val());
	$("#previous_chat_section").append(String($("#current_text").val())+'<br/>');
	$("#previous_chat_section").animate({ scrollTop: $(document).height() }, 500);
	$("#current_text").val('');
});

socket.on('chat', function (data) {
	console.log(data);
	
	if (data instanceof Array) {
		$.each(data, function(index, value) { 
		  $("#previous_chat_section").append(String(value.message)+'<br/>');
		$("#previous_chat_section").animate({ scrollTop: $(document).height() }, 500);
		});
	} else {
		$("#previous_chat_section").append(String(data.message)+'<br/>');
		$("#previous_chat_section").animate({ scrollTop: $(document).height() }, 500);
	}
});