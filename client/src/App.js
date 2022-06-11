import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './style/index.css';
import Home from './Components/Home';

function App() {
	return (
		<Router>
			<Routes>
				<Route exact path='/' element={<Home />} />
			</Routes>
		</Router>
	);
}

export default App;
