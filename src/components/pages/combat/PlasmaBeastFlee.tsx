import { useNavigate } from "react-router-dom"
import img from "assets/combat/plasma-beast-flee.png"
import StandardPage from "../../StandardPage"
import Conversation from "../../Conversation"
import Button from "../../Button"

export const PlasmaBeastFlee = () => {
	const navigate = useNavigate()
	return (
		<StandardPage backgroundImage={img} title="Escaped!">
			<Conversation width={30}>
				<p>You turn and run from the Flaming Plasma Beast, its scorching tendrils lashing at your back as you flee.</p>
				<p>
					Scorched but alive, you retreat to the tunnel entrance.
					<span className="conversation-controls">
						<Button onClick={() => navigate("/tunnels/")} label="Back to the tunnels" />
					</span>
				</p>
			</Conversation>
		</StandardPage>
	)
}
