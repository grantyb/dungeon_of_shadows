import { useNavigate } from "react-router-dom"
import img from "assets/combat/plasma-beast-victory.png"
import StandardPage from "../../StandardPage"
import Conversation from "../../Conversation"
import Button from "../../Button"

export const PlasmaBeastVictory = () => {
	const navigate = useNavigate()
	return (
		<StandardPage backgroundImage={img} title="Victory!">
			<Conversation width={30}>
				<p>The Flaming Plasma Beast lets out a final, agonised screech as its fiery form collapses into a shower of embers.</p>
				<p>
					You stand victorious, singed but alive. The tunnel ahead is clear.
					<span className="conversation-controls">
						<Button onClick={() => navigate("/tunnels/flame-deeper/")} label="Continue deeper" />
					</span>
				</p>
			</Conversation>
		</StandardPage>
	)
}
