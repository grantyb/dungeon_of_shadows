import { useNavigate } from "react-router-dom";
import Conversation from "../Conversation";
import StandardPage from "../StandardPage";
import img from "../../assets/dungeon/greet-wizard.png";
import Button from "../Button"

export const GreetWizard = () => {
	const navigate = useNavigate()
	// TODO: Add more dialogue

	return (
		<StandardPage backgroundImage={img} title="Proclarus the Wise">
			<Conversation width={35}>
				<p>
					“Ah, a visitor,” the wizard says, his voice raspy yet
					hopeful. “It’s uncommon to see adventurers this far into the
					dungeon. The local legends tend to keep even the bravest
					away.”
				</p>
				<p>
					He appraises you thoughtfully. An idea seems to come to him,
					and he stashes the ancient scroll in his battered leather
					pouch.
				</p>
				<p>
					“I have been studying this text for years, hoping to unlock
					its secrets. I fear to understand it fully, one must
					completely explore this fearsome labyrinth.” He gestures
					vaguely to the dark corridors behind him.
				</p>
				<p>
					“Alas, I am grown too frail to face the dangers therein.
					Perhaps thou art stout enough to succeed where I have
					failed?”
					<div className="conversation-controls">
						<Button
							label="Agree to help"
							onClick={() => navigate("/proceed/")}
						/>
						<Button
							label="Attack"
							onClick={() => navigate("/attack-wizard/")}
						/>
					</div>
				</p>
			</Conversation>
		</StandardPage>
	)
}
