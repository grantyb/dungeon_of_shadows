import React from "react";


import './WelcomeScreen.css';
import dungeonEntrance from '../assets/dungeon/entrance.png';


interface WelcomeScreenProps {
	onStartGame?: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartGame }) => {
	return (
		<div className="welcome-screen-bg">
			<img
				src={dungeonEntrance}
				alt="Dungeon Entrance"
				className="welcome-screen-img"
			/>
			<div className="welcome-screen-title">
				<h1>Dungeon of Shadows</h1>
			</div>
			<div className="welcome-screen-buttons">
				<button onClick={onStartGame}>Start game</button>
				<button>Create character</button>
				<button>Load character</button>
			</div>
		</div>
	);
};

export default WelcomeScreen;
