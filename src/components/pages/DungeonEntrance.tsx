import { useNavigate } from "react-router-dom";
import Conversation from "components/Conversation"
import StandardPage from "components/StandardPage"
import img from "assets/dungeon/wizard.png"
import Button from "components/Button"

export const DungeonEntrance = () => {
	
	const navigate = useNavigate();

	return (
		<StandardPage backgroundImage={img} title="Dungeon Entrance">
			<Conversation width={45}>
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
					middle of the room, cloaked in tattered and damp robes; his
					gnarled staff clearly identifies him as a wizard. Lost in
					thought, he studies a crumbling, ancient scroll. With a
					start, he looks up.
				</p>
				<p>
					As you step closer, the man slowly rises from his chair,
					revealing a face marked by deep lines of sorrow and eyes
					that hold a glimmer of hope amidst the despair.
					<div className="conversation-controls">
						<Button
							label="Greet the wizard"
							onClick={() => navigate("/greet-wizard/")}
						/>
						<Button
							label="Attack"
							onClick={() => navigate("/attack-wizard/")}
						/>
					</div>
				</p>
			</Conversation>
		</StandardPage>
	)
}
