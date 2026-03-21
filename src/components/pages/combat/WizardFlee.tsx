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
					“Prithee, let us lower our weapons and talk.
					I have great need of brave souls such as thee,
					though I am certainly willing to snuff out thy frail life if need be!”
				</p>
				<p>
					Cowed, humbled and terrified, you nod your agreement and lower your weapon.
					Gol-Ink the Wise smiles warmly, and inquires if you would be interested in assisting him.
					You nod again, and he continues.
				</p>
				<p>
					“I have been studying this text for years, hoping to unlock
					its secrets. I fear to understand it fully, one must
					completely explore this fearsome labyrinth.” He gestures
					vaguely to the dark corridors behind him.
				</p>
				<p>
					“Alas, I am forbidden by greater powers to face the dangers therein.
					Perhaps thou art stout enough to succeed where I have
					failed?”

					<span className="conversation-controls">
						<Button onClick={() => navigate("/proceed/")} label="Accept his offer" />
						<Button onClick={() => navigate("/fight-wizard/")} label="Attack" />
					</span>
				</p>
			</Conversation>
		</StandardPage>
	)
}
