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

	
	const { roomId } = socket.handshake.query;
	socket.join(roomId);


	socket.on(CHAT_MESSAGE, (data) => {
		io.in(roomId).emit(CHAT_MESSAGE, data);
	});


	socket.on('disconnect', () => {
		console.log(`Client ${socket.id} diconnected`);
		socket.leave(roomId);
	});
});

server.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
