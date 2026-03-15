import { useNavigate } from "react-router-dom"
import img from "assets/combat/wizard-flee.png"
import StandardPage from "../../StandardPage"
import Conversation from "../../Conversation"
import Button from "../../Button"

export const WizardFlee = () => {
	const navigate = useNavigate()
	return (
		<StandardPage backgroundImage={img} title="Escaped!">
			<Conversation width={30}>
				<p>You turn and sprint away from Gol-Ink the Wise. A bolt of energy crackles past you as you flee.</p>
				<p>
					You retreat to the dungeon entrance, shaken but alive.
					<span className="conversation-controls">
						<Button onClick={() => navigate("/dungeon/")} label="Back to the entrance" />
					</span>
				</p>
			</Conversation>
		</StandardPage>
	)
}
