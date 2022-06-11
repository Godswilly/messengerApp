const http = require('http');
const server = http.createServer();
const io = require('socket.io')(server, {
	cors: {
		origin: '*',
	},
});

const PORT = 5000;

const CHAT_MESSAGE = 'chatMessage';

io.on('connection', (socket) => {
	console.log(`Client ${socket.id} connected`);

	// Start a conversation
	const { roomId } = socket.handshake.query;
	socket.join(roomId);

	// Listen for new messages
	socket.on(CHAT_MESSAGE, (data) => {
		io.in(roomId).emit(CHAT_MESSAGE, data);
	});

	// Leave the room if the user closes the socket
	socket.on('disconnect', () => {
		console.log(`Client ${socket.id} diconnected`);
		socket.leave(roomId);
	});
});

server.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
