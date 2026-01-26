
import img from "../../../assets/dungeon/tunnels/stairs.png"
import StandardPage from "../../StandardPage"
import Conversation from "../../Conversation"
import Button from "components/Button";
import { useNavigate } from "react-router-dom";

export const SkullDeeper = () => {
	const navigate = useNavigate()
	return (
		<StandardPage backgroundImage={img} title="The Skull">
			<Conversation width={20}>
				<p>As you descend the staircase, the air grows colder and more humid.</p>
				<p>
					Light from above fades away, and you find yourself enveloped in darkness.
					
				</p>
				<p>
					Your footsteps echo softly against the stone walls, and the sound of dripping water
					echoes around the staircase.
					
				</p>
				<p>
					At the end of the staircase is a faint light, you can just make
					out the shape of an arched doorway pulsate with an eerie yellow glow.
				</p>
				<p>
					The arc seems to sing, it attracts you-it pulls you in with extreme force.
				</p>
				<p>You grip to the floor as your waist is inside the doorway, but the damp
					slippery brick betrays you, and you are pulled through the archway.
				</p>
				<p>
					You find yourself in a gray void there is nothing but endless grayness.
				</p>
				<p>
					You have perished in the void.
					<span className="conversation-controls">
						<Button label="Restart" onClick={() => navigate("/")} />
					</span>
				</p>
			</Conversation>
		</StandardPage>
	)
}
