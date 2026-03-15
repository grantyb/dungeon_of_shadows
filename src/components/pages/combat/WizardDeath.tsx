import { useNavigate } from "react-router-dom"
import img from "assets/combat/wizard-death.png"
import StandardPage from "../../StandardPage"
import Conversation from "../../Conversation"
import Button from "../../Button"

export const WizardDeath = () => {
	const navigate = useNavigate()
	return (
		<StandardPage backgroundImage={img} title="You Have Fallen">
			<Conversation width={30}>
				<p>Gol-Ink the Wise unleashes a devastating spell. You crumple to the ground as arcane fire engulfs you.</p>
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
