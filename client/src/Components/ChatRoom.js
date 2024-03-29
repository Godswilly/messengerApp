import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useChat from '../useChat';
import '../style/chat.css';

const ChatRoom = () => {
	const { roomId } = useParams();
	const { messages, sendMessage } = useChat(roomId);
	const [newMessage, setNewMessage] = useState('');

	const handleNewMessageChange = (event) => {
		setNewMessage(event.target.value);
	};

	const handleSendMessage = () => {
		sendMessage(newMessage);
		setNewMessage('');
	};

	return (
		<div className='chat-room'>
			<h1 className='room-name'>Room: {roomId}</h1>
			<div className='messages'>
				<ol className='message-list'>
					{messages.map((message, i) => (
						<li
							key={i}
							className={`message-item ${
								message.ownedByCurrentUser ? 'my-message' : 'received-message'
							}`}
						>
							{message.body}
						</li>
					))}
				</ol>
			</div>
			<textarea
				value={newMessage}
				onChange={handleNewMessageChange}
				placeholder='Write message...'
				className='new-message-input-field'
			/>
			<button onClick={handleSendMessage} className='send-message-button'>
				Send
			</button>
		</div>
	);
};

export default ChatRoom;
