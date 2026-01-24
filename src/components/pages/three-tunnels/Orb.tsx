import img from "assets/dungeon/tunnels/chest.png"
import Button from "components/Button"
import Conversation from "components/Conversation"
import StandardPage from "components/StandardPage"
import { addToInventory } from "data/character-data"
import { useNavigate } from "react-router-dom"

export const Orb = () => {
	const navigate = useNavigate()

	return (
		<StandardPage backgroundImage={img} title="The Shiny Orb">
			<Conversation width={20}>
				<p>You slowly approach the chest.</p>
				<p>
					When you arrive you try to open the chest but the lid is too
					heavy.
				</p>
				<p>
					After what feels like hours you finally manage to pry the
					lid open.
				</p>
				<p>
					Inside you find a shiny orb pulsating with magical energy.
				</p>
				<p>
					 You take the orb.
					<span className="conversation-controls">
						
						<Button
							label="Continue"
							onClick={() =>
								addToInventory("FireOrb") &&
								navigate("/tunnels/cavern/")
							}
						/>
					</span>
				</p>
			</Conversation>
		</StandardPage>
	)
}
