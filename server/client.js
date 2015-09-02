var io = require('socket.io');

var socket = io.connect('http://localhost:3000');
socket.on('connect', function(){
    socket.send('client connected');
});