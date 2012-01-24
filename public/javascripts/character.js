

$("#current_text").keyup(function(){
	var current_text = $("#current_text").val();
	var text = current_text.substring(current_text,current_text.length-1);
	var msg = {id:21,character:text}
	socket.emit('character',text);
});

socket.on('character', function (data) {
	console.log(data);
	$("#previous_chat_section").append(data.character);
});