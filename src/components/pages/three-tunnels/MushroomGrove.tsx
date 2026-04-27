import img from "assets/dungeon/tunnels/mushroom-grove.png"
import Button from "components/Button"
import Conversation from "components/Conversation"
import StandardPage from "components/StandardPage"
import { useNavigate } from "react-router-dom"

export const MushroomGrove = () => {
	const navigate = useNavigate()

	return (
		<StandardPage backgroundImage={img} title="The Elder Grove">
			<Conversation width={28}>
				<p>
					The root arch opens into a still grove where adult myconids
					sit in a circle around a carved stone dais.
				</p>
				<p>
					The oldest one bows its broad cap. A cloud of silver spores
					drifts through the air, and a calm voice settles inside your
					thoughts.
				</p>
				<p>
					"Small feet brought you here. Small games carry old wisdom.
					Answer the mooncap's waking, and we will share a gift."
				</p>
				<p>
					How does the mooncap wake?
					<span className="conversation-controls">
						<Button
							label="Dead wood, water, darkness"
							onClick={() => navigate("/tunnels/mushroom-reward/")}
						/>
						<Button
							label="Flame, water, a shouted name"
							onClick={() => navigate("/tunnels/mushroom-puzzle-fail/")}
						/>
						<Button
							label="Sunlight, silver, stone"
							onClick={() => navigate("/tunnels/mushroom-puzzle-fail/")}
						/>
					</span>
				</p>
			</Conversation>
		</StandardPage>
	)
}
