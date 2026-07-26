import portClosed from "assets/dungeon/tunnels/port-closed.webp"
import Button from "components/Button"
import Conversation from "components/Conversation"
import StandardPage from "components/StandardPage"
import { useNavigate } from "react-router-dom"

export const PortRiddle = () => {
	const navigate = useNavigate()
	const fightPort = () => navigate("/tunnels/port-fight/")

	return (
		<StandardPage backgroundImage={portClosed} title="The Port's Riddle">
			<Conversation width={28}>
				<p>
					The sproutling presses both tiny hands to the Mooncap Lantern.
					Silver-blue spores drift from the glass and settle on the sealed
					door.
				</p>
				<p>
					The carved eyes grind open. A voice seeps through the wood like
					air from a tomb.
				</p>
				<p>
					"I have no mouth, yet I eat the dead. I have no feet, yet I spread
					unseen. I wear a cap when I wake from rot. What am I?"
					<span className="conversation-controls">
						<Button label="A mushroom" onClick={() => navigate("/tunnels/port-chamber/")} />
						<Button label="A candle" onClick={fightPort} />
						<Button label="A root" onClick={fightPort} />
					</span>
				</p>
			</Conversation>
		</StandardPage>
	)
}
