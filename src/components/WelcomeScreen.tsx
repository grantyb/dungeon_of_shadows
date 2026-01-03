import React from "react"

import { useNavigate } from "react-router-dom"
import dungeonEntrance from "assets/dungeon/entrance.png"
import Conversation from "components/Conversation"
import Button from "components/Button"

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
					<Button onClick={handleStartGame} label="Start game" />
					<Button
						onClick={() => navigate("/create-character")}
						label="Create character"
					/>
					<Button
						label="Load character"
						onClick={() =>
							alert("Load character feature coming soon!")
						}
					/>
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
							<Button
								onClick={() => navigate("/dungeon/")}
								label="Enter the dungeon"
							/>
						</div>
					</p>
				</Conversation>
			)}
		</div>
	)
}

export default WelcomeScreen
