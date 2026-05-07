import { useNavigate } from "react-router-dom"
import img from "assets/dungeon/tunnels/port-attack.png"
import Button from "components/Button"
import Conversation from "components/Conversation"
import StandardPage from "components/StandardPage"

export const PortDeath = () => {
	const navigate = useNavigate()

	return (
		<StandardPage backgroundImage={img} title="You Have Fallen">
			<Conversation width={30}>
				<p>
					The Port's portal yawns wide. Six tentacles drag you toward the
					purple maw as poison burns through your veins.
				</p>
				<p>
					The wooden doors slam shut on your final breath.
					<span className="conversation-controls">
						<Button onClick={() => navigate("/")} label="Return to start" />
					</span>
				</p>
			</Conversation>
		</StandardPage>
	)
}
