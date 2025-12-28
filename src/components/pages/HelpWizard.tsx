import { useNavigate } from "react-router-dom";
import Conversation from "../Conversation";
import StandardPage from "../StandardPage";
import img from "../../assets/dungeon/greet-wizard.png";
import Button from "../Button"

export const HelpWizard = () => {
	const navigate = useNavigate()

	return (
		<StandardPage backgroundImage={img} title="Proclarus the Wise">
			<Conversation width={35}>
				<p>
					“My thanks, brave adventurer” the wizard says, he bows in
					gratitude.
				</p>
				<p>
					“Please, take this scroll with thee. It contains valuable
					knowledge that will aid thee on thy quest throughout the
					dungeon.”
					<div className="conversation-controls">
						<Button
							label="Take the scroll"
							onClick={() => navigate("/tunnels/")}
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
