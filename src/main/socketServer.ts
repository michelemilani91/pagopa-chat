import net from 'net';
import { SocketClient } from './data';

const PORT = 10000;

// creates the server
const server = net.createServer(function(socket) {
	socket.write('Connected to the server\r\n');
	socket.pipe(socket);
});

// emitted when server closes (not emitted until all connections closes)
server.on('close',function() {
	console.log('Server closed!');
});

// emits when any error occurs -> calls closed event immediately after this.
server.on('error',function(error) {
	console.log('Error: ' + error);
});

const clients: SocketClient[] = [];

// emitted when new client connects
server.on('connection',function(socket) {

	console.log('--> New client connected! <--');
	console.log(' - Port: ' + socket.remotePort);
	console.log(' - IP: ' + socket.remoteAddress);
	console.log(' - IP version: ' + socket.remoteFamily);
	console.log('\n');

	const socketClient: SocketClient = {
		socket,
		id: clients.length
	};

	clients.push(socketClient);

	server.getConnections(function(error,count) {
		console.log('Connections to the server: ' + count);
	});

	socket.setEncoding('utf8');

	socket.setTimeout(800000, function() {
		console.log('Socket timed out');
	});

	socket.on('data',function(data) {
		console.log('Data received: ' + data);
		// echo data to other clients
		for (const client of clients) {
			if (client.id === socketClient.id)
				continue;
			console.log('Notifying client with id ' + client.id);
			const isKernelBufferFull = client.socket.write(`Client ${client.id} says: ${data}`);
			if (isKernelBufferFull) {
				console.log('Data was flushed successfully from kernel buffer i.e written successfully!');
			} else {
				socket.pause();
			}
		}
	});

	socket.on('timeout',function() {
		socket.end('Timed out!');
	});

	socket.on('drain',function() {
		socket.resume();
	});

	socket.on('error',function(error) {
		console.log('Error: ' + error);
	});

	socket.on('end',function(data) {
		if (data)
			console.log('End data: ' + data);
	});

	socket.on('close',function(error) {
		if (error)
			console.log('Socket closed due to an error');
		else
			console.log('Socket ' + socketClient.id + ' closed!');
	});

	setTimeout(function() {
		socket.destroy();
	},1200000);

});

server.listen(PORT, '127.0.0.1', function () {
	console.log('Listening...');
	const address = server.address();
	if (typeof address !== "string") {
		console.log(' - Port: ' + address.port);
		console.log(' - IP: ' + address.address);
		console.log(' - IP version: ' + address.family);
		console.log('\n');
	}
});