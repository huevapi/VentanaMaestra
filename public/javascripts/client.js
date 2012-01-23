var socket = io.connect('http://192.168.10.123:8080');

$("#enter_button").click(function(){
	console.log($("#current_text").val());
	socket.emit('chat',$("#current_text").val());
	$("#previous_chat_section").append($("#current_text").val()+'<br/>');
	$("#current_text").val('');
});

socket.on('chat', function (data) {
	console.log(data);
	$("#previous_chat_section").append(data.message+'<br/>');
});