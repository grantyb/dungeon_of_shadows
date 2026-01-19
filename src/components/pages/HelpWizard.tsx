import { useNavigate } from "react-router-dom";
import Conversation from "components/Conversation"
import StandardPage from "components/StandardPage"
import img from "assets/dungeon/greet-wizard.png"
import Button from "components/Button"
import { addToInventory } from "data/character-data"

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
					<span className="conversation-controls">
						<Button
							label="Take the scroll"
							onClick={() =>
								addToInventory("Scroll") &&
								navigate("/tunnels/")
							}
						/>
						<Button
							label="Attack"
							onClick={() => navigate("/attack-wizard/")}
						/>
					</span>
				</p>
			</Conversation>
		</StandardPage>
	)
}
