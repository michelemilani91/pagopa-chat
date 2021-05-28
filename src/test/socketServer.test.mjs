import net from 'net';

const PORT = 10000;

function createClient(port) {
	const client = net.connect({ port }, function() {
		console.log('Client connected to server!');
	});
	client.on('end', function() {
		console.log('Client disconnected from server');
	});
	return client;
}

const client1 = createClient(PORT);
const client2 = createClient(PORT);

const message = 'This is a message from client';

client1.on('data', function(data) {
	const messageReceived = data.toString();
	console.log('Data from server: ' + messageReceived);
	if (messageReceived.includes(messageReceived))
		console.log("Message received successfully");
});

client2.write(message);

client1.end();
client2.end();