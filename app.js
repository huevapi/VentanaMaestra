
var express = require('express');
var app = express.createServer();

//app.get('/', function(req, res){
//    res.send('Hello World');
//});

app.configure('development', function(){
    app.use(express.static(__dirname + '/public'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.listen(3000);

var io = require('socket.io').listen(8080);

var buffer = [];
io.sockets.on('connection', function (socket) {
  socket.emit('chat', buffer);
  socket.broadcast.emit('chat',{ message: 'Nuevo usuario conectado.'});
  console.log("Nuevo usuario conectado");
  socket.on('chat',function (msg) {
    //socket.emit('chat',msg);
    socket.broadcast.emit('chat',{message: msg});
    console.log("mensaje: " +  msg);
    buffer.push({ message: msg});   
  });
});


/*
var buffer = [];
io.on('connection', function(client){
    client.send({ buffer: buffer });
    client.broadcast({ announcement: client.sessionId + ' connected' });

    client.on('message', function(message){
        var msg = { message: [client.sessionId, message] };
        buffer.push(msg);
        if (buffer.length > 15) buffer.shift();
        client.broadcast(msg);
    });

    client.on('disconnect', function(){
        client.broadcast({ announcement: client.sessionId + ' disconnected' });
    });
});*/

