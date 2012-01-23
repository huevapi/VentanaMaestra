var socket = io.connect('http://192.168.10.23:8080');

socket.on('initial', function (data) {
	console.log(data);
});