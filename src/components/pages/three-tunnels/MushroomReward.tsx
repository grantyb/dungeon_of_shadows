import img from "assets/dungeon/tunnels/mushroom-reward.png"
import Button from "components/Button"
import Conversation from "components/Conversation"
import StandardPage from "components/StandardPage"
import { useCharacter } from "data/character-data"
import { useNavigate } from "react-router-dom"

export const MushroomReward = () => {
	const navigate = useNavigate()
	const { addToInventory, identifyItem } = useCharacter()

	const takeLantern = () => {
		addToInventory("MooncapLantern")
		identifyItem("MooncapLantern")
		navigate("/tunnels/east/")
	}

	return (
		<StandardPage backgroundImage={img} title="The Mooncap Gift">
			<Conversation width={26}>
				<p>
					The stone dais answers with a gentle chime. Pale light runs
					through the mycelium beneath your feet.
				</p>
				<p>
					The eldest myconid lifts a small lantern grown from a
					moon-white cap and bound with a brass ring.
				</p>
				<p>
					"Carry this where stone forgets the path. It glows for hidden
					ways and kindred roots."
				</p>
				<p>
					The sproutlings clap their tiny hands as the lantern floats
					into your grasp.
					<span className="conversation-controls">
						<Button label="Take Lantern" onClick={takeLantern} />
					</span>
				</p>
			</Conversation>
		</StandardPage>
	)
}
