import img from "assets/dungeon/tunnels/wave-symbol.png"
import Button from "components/Button"
import Conversation from "components/Conversation"
import StandardPage from "components/StandardPage"
import { useNavigate } from "react-router-dom"

export const West = () => {
	const navigate = useNavigate()

	return (
		<StandardPage backgroundImage={img} title="The orb">
			<Conversation width={20}>
				<p>you walk west through the tunnel.</p>
				<p>
					the tunnel is still damp and a bit slippery,
					but you manage to keep your balance.
				</p>
				<p>
					after walking for a while you come across an dead end.
				</p>
				<p>
					you turn back around and head East
				
					<span className="conversation-controls">
						<Button label="ok" onClick={() => navigate("/tunnels/east/")} />
					</span>
				</p>
			</Conversation>
		</StandardPage>
	)
}
