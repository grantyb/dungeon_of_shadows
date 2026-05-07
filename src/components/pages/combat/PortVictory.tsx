import { useNavigate } from "react-router-dom"
import img from "assets/dungeon/tunnels/port-defeated.png"
import Button from "components/Button"
import Conversation from "components/Conversation"
import StandardPage from "components/StandardPage"

export const PortVictory = () => {
	const navigate = useNavigate()

	return (
		<StandardPage backgroundImage={img} title="The Port Is Broken">
			<Conversation width={30}>
				<p>
					The Port shudders as the last tentacle falls away from the broken
					planks. Poison-green ichor hisses between the stones.
				</p>
				<p>
					Only smashed wood and bleeding purple wreckage remain. Beyond the
					ruined threshold, a new room waits in the dark.
					<span className="conversation-controls">
						<Button onClick={() => navigate("/tunnels/port-chamber/")} label="Enter the room" />
					</span>
				</p>
			</Conversation>
		</StandardPage>
	)
}
