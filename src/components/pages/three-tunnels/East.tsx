import img from "assets/dungeon/tunnels/wave-symbol.png"
import Button from "components/Button"
import Conversation from "components/Conversation"
import StandardPage from "components/StandardPage"
import { useNavigate } from "react-router-dom"

export const East = () => {
	const navigate = useNavigate()

	return (
		<StandardPage backgroundImage={img} title="The orb">
			<Conversation width={20}>
				<p>you walk east through the tunnel.</p>
				<p>
					the tunnel is still damp and a bit slippery,
					but you manage to keep your balance.
				</p>
				<p>
					after walking for a while you come across an arc.
				</p>
				<p>
					you enter and it takes you back to the room where Proclarus
					is still muttering strange words on his small wooden chair.
				
					<span className="conversation-controls">
						<Button label="continue" onClick={() => navigate("/tunnels/")} />
							
					</span>
				</p>
			</Conversation>
		</StandardPage>
	)
}
