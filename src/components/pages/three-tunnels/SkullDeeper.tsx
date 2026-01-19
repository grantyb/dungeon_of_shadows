
import img from "../../../assets/dungeon/tunnels/wave-symbol.png"
import StandardPage from "../../StandardPage"
import Conversation from "../../Conversation"
import Button from "components/Button";
import { useNavigate } from "react-router-dom";

export const SkullDeeper = () => {
	const navigate = useNavigate()
	return (
		<StandardPage backgroundImage={img} title="The Skull">
			<Conversation width={20}>
				<p>as you descend the staircase, the air grows colder and more humid.</p>
				<p>
					light from above fades away, and you find yourself enveloped in darkness.
					
				</p>
				<p>
					your footsteps echo softly against the stone walls, and the sound of dripping water
					echoes around the staircase.
					
				</p>
				<p>
					at the end of the staircase is a faint light, you can just make
					out the shape of an arched doorway pulsate with an eerie yellow glow.
				</p>
				<p>
					the arc seems to sing, it attracts you-it pulls you in with extreme force.
				</p>
				<p>you grip to the floor as your waist is inside the doorway, but the damp
					slippery brick betrays you, and you are pulled through the archway.
				</p>
				<p>
					you find yourself in a gray void there is nothing but endless grayness.
				</p>
					you have perished in the void.
				

				<span className="conversation-controls">
					<Button label="restart" onClick={() => navigate("/")} />	
				</span>
					
						

			
					
					
			</Conversation>
		</StandardPage>
	)
}
