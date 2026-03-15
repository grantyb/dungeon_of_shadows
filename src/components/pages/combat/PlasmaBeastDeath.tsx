import { useNavigate } from "react-router-dom"
import img from "assets/combat/plasma-beast-death.png"
import StandardPage from "../../StandardPage"
import Conversation from "../../Conversation"
import Button from "../../Button"

export const PlasmaBeastDeath = () => {
	const navigate = useNavigate()
	return (
		<StandardPage backgroundImage={img} title="You Have Fallen">
			<Conversation width={30}>
				<p>The Flaming Plasma Beast's searing energy overwhelms you. Your vision fades as the heat consumes everything.</p>
				<p>
					Your adventure ends here, brave soul.
					<span className="conversation-controls">
						<Button onClick={() => navigate("/")} label="Return to start" />
					</span>
				</p>
			</Conversation>
		</StandardPage>
	)
}
