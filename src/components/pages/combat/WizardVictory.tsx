import { useNavigate } from "react-router-dom"
import img from "assets/combat/wizard-victory.png"
import StandardPage from "../../StandardPage"
import Conversation from "../../Conversation"
import Button from "../../Button"

export const WizardVictory = () => {
	const navigate = useNavigate()
	return (
		<StandardPage backgroundImage={img} title="Victory!">
			<Conversation width={30}>
				<p>Gol-Ink the Wise falls to his knees, his staff clattering to the ground. The arcane energy around him fades.</p>
				<p>
					You have defeated the wizard. The path forward is yours.
					<span className="conversation-controls">
						<Button onClick={() => navigate("/proceed/")} label="Proceed" />
					</span>
				</p>
			</Conversation>
		</StandardPage>
	)
}
