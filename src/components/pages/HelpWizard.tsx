import { useNavigate } from "react-router-dom";
import Conversation from "../Conversation";
import StandardPage from "../StandardPage";
import img from "../../assets/dungeon/greet-wizard.png";

export const HelpWizard = () => {
	const navigate = useNavigate()

	return (
		<StandardPage backgroundImage={img} title="Proclarus the Wise">
			<Conversation width={35}>
				<p>
					" My thanks, brave adventurer" the wizard says,
					he bows in gratitude.
				</p>
				<p>
					"Please, take this scroll with thee. It contains
					valuable knowledge that will aid thee on thy quest
					throughout the dungeon."
				
					
					<div className="conversation-controls">
						<button tabIndex={0} onClick={() => navigate("/tunnels/")}>
							Take the scroll
						</button>
						<button tabIndex={0} onClick={() => navigate("/attack-wizard/")}>
							Attack
						</button>
					</div>
				</p>
			</Conversation>
		</StandardPage>
	)
}
