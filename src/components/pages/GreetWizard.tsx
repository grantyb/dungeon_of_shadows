import { useNavigate } from "react-router-dom";
import Conversation from "../Conversation";
import StandardPage from "../StandardPage";
import img from "../../assets/dungeon/greet-wizard.png";

export const GreetWizard = () => {
	const navigate = useNavigate()
	// TODO: Add more dialogue

	return (
		<StandardPage backgroundImage={img} title="Proclarus the Wise">
			<Conversation left={5} width={45} top={15}>
				<p>
					"Ah, a visitor," the wizard says, his voice raspy yet
					hopeful. "It's been ages since anyone has come this far into
					the dungeon."
				</p>
				<p>
					He gestures to the ancient scroll in his hands. "I have been
					studying this text for years, hoping to unlock its secrets.
					But I fear I am too old and weary to continue alone."
					<div className="conversation-controls">
						<button onClick={() => navigate("/proceed/")}>
							Agree to help
						</button>
						<button onClick={() => navigate("/attack-wizard/")}>
							Attack
						</button>
					</div>
				</p>
			</Conversation>
		</StandardPage>
	)
}
