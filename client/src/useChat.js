import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';

const CHAT_MESSAGE = 'chatMessage';
const SERVER_URL = 'http://localhost:5000';

const useChat = (roomId) => {
	const [messages, setMessages] = useState([]);
	const socketRef = useRef();

	useEffect(() => {
		socketRef.current = socketIOClient(SERVER_URL, {
			query: { roomId },
		});

		socketRef.current.on(CHAT_MESSAGE, (message) => {
			const incomingMessage = {
				...message,
				ownedByCurrentUser: message.senderId === socketRef.current.id,
			};
			setMessages((messages) => [...messages, incomingMessage]);
		});

		return () => {
			socketRef.current.disconnect();
		};
	}, [roomId]);

	const sendMessage = (messageBody) => {
		socketRef.current.emit(CHAT_MESSAGE, {
			body: messageBody,
			senderId: socketRef.current.id,
		});
	};

	return { messages, sendMessage };
};

export default useChat;
