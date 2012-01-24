var socket = io.connect('http://192.168.10.123:8080');



$("#current_text").keypress(function(e){
	code= (e.keyCode ? e.keyCode : e.which);
	if (code == 13){
		socket.emit('chat',$("#current_text").val());
		$("#local_chat").prepend(escape($("#current_text").val())+'<br/>');
		$("#current_text").val('');
	}
});

$("#enter_button").click(function(){
	console.log($("#current_text").val());
	socket.emit('chat',$("#current_text").val());
	$("#local_chat").prepend(escape($("#current_text").val())+'<br/>');
	$("#current_text").val('');
});

socket.on('chat', function (data) {
	var sessionId = data.sessionId;
	var messageBuffer = data.buffer;
	
	console.log('session id is ' + sessionId);
	
	if(! $("div #"+sessionId).length > 0){
		$("<div id='"+sessionId+"' class='user_chat'></div>").appendTo("#previous_chat_section");
	}
	$.each(messageBuffer, function(index, value) { 
		$("div #"+sessionId).prepend(escape(value.message)+'<br/>');
	});
	
	/*if (data instanceof Array) {
		$.each(data, function(index, value) { 
		  $("#previous_chat_section").prepend(String(value.message)+'<br/>');
		});
	} else {
		$("#previous_chat_section").prepend(String(data.message)+'<br/>');
	}*/
});