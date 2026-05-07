import img from "assets/dungeon/tunnels/archway.png"
import Button from "components/Button"
import Conversation from "components/Conversation"
import StandardPage from "components/StandardPage"
import { useNavigate } from "react-router-dom"

export const PortChamber = () => {
	const navigate = useNavigate()

	return (
		<StandardPage backgroundImage={img} title="Beyond the Port">
			<Conversation width={28}>
				<p>
					The Port's portal opens at last, not like a door but like a wound
					in the dungeon deciding to heal around you.
				</p>
				<p>
					You step through into a low stone room where golden light coils
					over old crates, rusted chains, and a stair sunk into the far wall.
				</p>
				<p>
					Behind you, the threshold seals with a tired wooden sigh. Ahead,
					the dungeon continues.
					<span className="conversation-controls">
						<Button label="Continue" onClick={() => navigate("/tunnels/")} />
					</span>
				</p>
			</Conversation>
		</StandardPage>
	)
}
