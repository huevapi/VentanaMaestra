var socket = io.connect('http://192.168.10.123:8080');

socket.on('chat', function (data) {
	console.log(data);
	$("#previous_chat_section").append(data);
});