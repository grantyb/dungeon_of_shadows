import img from "assets/dungeon/tunnels/mushroom-playroom.png"
import Button from "components/Button"
import Conversation from "components/Conversation"
import StandardPage from "components/StandardPage"
import { useNavigate } from "react-router-dom"

export const MushroomTrail = () => {
	const navigate = useNavigate()

	return (
		<StandardPage backgroundImage={img} title="The Mushroom Trail">
			<Conversation width={24}>
				<p>
					You climb down the narrow shelf and step into a cavern soft
					with moss and pale fungal light.
				</p>
				<p>
					A troop of myconid sproutlings tumbles around a fallen log.
					They are no taller than your boots, and they do not seem
					afraid of you at all.
				</p>
				<p>
					One sproutling lays a dead twig on a flat stone. Another
					drips water over it from a curled leaf. A third cups both
					hands over a small moon-white cap until the cap begins to glow.
				</p>
				<p>
					When the sproutlings notice you watching, they chirp with
					delighted surprise and hurry through an arch of roots.
					<span className="conversation-controls">
						<Button label="Follow" onClick={() => navigate("/tunnels/mushroom-grove/")} />
						<Button label="Turn Back" onClick={() => navigate("/tunnels/west/")} />
					</span>
				</p>
			</Conversation>
		</StandardPage>
	)
}
