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
				<p>As you turn and flee from the undefeatable Gol-Ink the Wise, he stretches out his hand, placatingly.</p>
				<p>“Friend!”, he calls. “There is no sense in this violence.” </p>
				<p>
					“Please, let us lower our weapons and talk.
					I have great need of such brave souls such as yourself,
					but I am certainly willing to snuff you out if need be!”
				</p>
				<p>
					Cowed, humbled and terrified, you nod your agreement and lower your weapon.
					Gol-Ink the Wise smiles warmly, and invites you to sit with him and share a cup of tea.
					<span className="conversation-controls">
						<Button onClick={() => navigate("/proceed/")} label="Accept his offer" />
						<Button onClick={() => navigate("/fight-wizard/")} label="Attack" />
					</span>
				</p>
			</Conversation>
		</StandardPage>
	)
}
