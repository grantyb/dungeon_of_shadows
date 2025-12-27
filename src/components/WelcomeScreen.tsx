import React from "react"

import { useNavigate } from "react-router-dom"
import dungeonEntrance from "../assets/dungeon/entrance.png"
import Conversation from "./Conversation"

const WelcomeScreen: React.FC = () => {
	const navigate = useNavigate()

	const [showIntroduction, setShowIntroduction] = React.useState(false)

	const handleStartGame = () => {
		setShowIntroduction(true)
	}

	return (
		<div
			className="background-image"
			style={{ backgroundImage: `url(${dungeonEntrance})` }}
		>
			<div className="main-title">
				<h1>The Dungeon of Shadows</h1>
			</div>
			{!showIntroduction && (
				<div className="home-screen-buttons">
					<button onClick={handleStartGame}>Start game</button>
					<button>Create character</button>
					<button>Load character</button>
				</div>
			)}
			{showIntroduction && (
				<Conversation width={30}>
					<p>
						You stand before the ominous entrance of the Dungeon of
						Shadows, a place whispered about in legends and feared
						by many.
					</p>
					<p>
						The air is thick with anticipation as you clutch your
						gear, ready to face whatever challenges lie within. With
						a deep breath, you prepare to step forward into the dank
						and foreboding darkness.
						<div className="conversation-controls">
							<button onClick={() => navigate("/dungeon/")}>
								Enter the dungeon
							</button>
						</div>
					</p>
				</Conversation>
			)}
		</div>
	)
}

export default WelcomeScreen
