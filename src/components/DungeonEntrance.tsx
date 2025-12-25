import React from "react"
import { useNavigate } from "react-router-dom"
import entranceImg from "../assets/dungeon/wizard.png"
import Conversation from "./Conversation"

const DungeonEntrance: React.FC = () => {
	const navigate = useNavigate()
	return (
		<div className="background-image">
			<img src={entranceImg} alt="Dungeon Entrance" />
			<div className="main-title">
				<h1>Dungeon Entrance</h1>
			</div>
			<Conversation left={5} width={45} top={15}>
				<p>
					The foul smell of damp stone, death and decay wafts out from
					the dark corridors.
				</p>
				<p>
					A flickering light dances on the walls, casting eerie
					shadows that seem to move of their own accord.
				</p>
				<p>
					You emerge from the winding tunnels of the dungeon entrance
					into a dimly lit chamber. The faint sound of dripping water
					echoes through the space.
				</p>
				<p>
					A forlorn figure sits astride a creaking wooden chair in the
					middle of the room, cloaked in tattered and damp robes. Lost
					in thought, they study a crumbling, ancient scroll. With a
					start, they look up.
				</p>
				<p>
					As you step closer, the man - a wizard - slowly rises from
					his chair, revealing a face marked by deep lines of sorrow
					and eyes that hold a glimmer of hope amidst the despair.
					<div className="conversation-controls">
						<button onClick={() => navigate("/greet-wizard/")}>
							Greet the wizard
						</button>
						<button onClick={() => navigate("/attack-wizard/")}>
							Attack
						</button>
					</div>
				</p>
			</Conversation>
		</div>
	)
}

export default DungeonEntrance
