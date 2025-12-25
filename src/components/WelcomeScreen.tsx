import React from "react"

import { useNavigate } from "react-router-dom"
import dungeonEntrance from "../assets/dungeon/entrance.png"
import "./WelcomeScreen.css"

const WelcomeScreen: React.FC = () => {
	const navigate = useNavigate()
	const handleStartGame = () => {
		navigate("/dungeon/")
	}

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
				<button onClick={handleStartGame}>Start game</button>
				<button>Create character</button>
				<button>Load character</button>
			</div>
		</div>
	)
}

export default WelcomeScreen
