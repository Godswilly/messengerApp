import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/home.css';

const Home = () => {
	const [room, setRoom] = useState('');

	const handleRoomChange = (event) => {
		setRoom(event.target.value);
	};

	return (
		<div className='home'>
			<input
				type='text'
				placeholder='Room'
				value={room}
				onChange={handleRoomChange}
				className='text-input-field'
			/>
			<Link to={`/${room}`} className='room-button'>
				Join room
			</Link>
		</div>
	);
};

export default Home;
