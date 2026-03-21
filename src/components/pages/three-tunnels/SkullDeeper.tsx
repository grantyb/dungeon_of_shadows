
import img from "../../../assets/dungeon/tunnels/stairs.png"
import img2 from "../../../assets/dungeon/tunnels/stairs-further.png"
import img3 from "../../../assets/dungeon/tunnels/stairs-void.png"
import StandardPage from "../../StandardPage"
import Conversation from "../../Conversation"
import Button from "components/Button";
import { useNavigate } from "react-router-dom";
import BackgroundChange from "components/BackgroundChange";

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
					<BackgroundChange src={img2} />
					At the end of the staircase is a faint light, you can just make
					out the shape of an arched doorway pulsating with an eerie yellow glow.
				</p>
				<p>
					The archway seems to sing, it attracts you - it pulls you in with extreme force.
				</p>
				<p>
					<BackgroundChange src={img3} />
					You grip to the floor as your waist is inside the doorway, but the damp
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
