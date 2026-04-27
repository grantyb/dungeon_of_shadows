import img from "assets/dungeon/tunnels/mushroom-grove.png"
import Button from "components/Button"
import Conversation from "components/Conversation"
import StandardPage from "components/StandardPage"
import { useNavigate } from "react-router-dom"

export const MushroomPuzzleFail = () => {
	const navigate = useNavigate()

	return (
		<StandardPage backgroundImage={img} title="The Elder Grove">
			<Conversation width={28}>
				<p>
					The runes on the dais dim. The eldest myconid shakes its cap,
					but there is no anger in the gesture.
				</p>
				<p>
					"Not that path. Watch the small ones again if memory has
					slipped through your fingers."
				</p>
				<p>
					The sproutlings peek from behind the roots, eager to perform
					their game once more.
					<span className="conversation-controls">
						<Button label="Try Again" onClick={() => navigate("/tunnels/mushroom-grove/")} />
						<Button label="Watch Them" onClick={() => navigate("/tunnels/mushroom-trail/")} />
						<Button label="Leave" onClick={() => navigate("/tunnels/east/")} />
					</span>
				</p>
			</Conversation>
		</StandardPage>
	)
}
