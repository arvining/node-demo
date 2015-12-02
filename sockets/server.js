/*
    server.js
    main server script for the socket.io chat demo
*/

var net = require('net');

var server = net.createServer();
//all clients
var clients = [];

server.on('connection', function(socket) {
    var name;

    function broadcast(name, message) {
        clients.forEach(function(client) {
            if (client != socket) {
                client.write('[' + name + '] ' + message);
            }
        });
    }

    //hold on to new client
    clients.push(socket);

    console.log('new connection');

    socket.write('Hi! What is your name?\n');
    
    socket.on('data', function(data) {
        if (!name) {
            name = data.toString();
            socket.write('Hey there ' + name + '\n');
        }
        else {
            broadcast(name, data.toString());
        }
    });
    
    socket.on('close', function() {
        console.log('connection closed');
    )};

});

server.on('listening', function() {
    console.log('server listening...');
});

server.listen(3000);

