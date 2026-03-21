import img from "assets/dungeon/tunnels/west-2.png"
import deadEndImg from "assets/dungeon/tunnels/dead-end.png"
import BackgroundChange from "components/BackgroundChange"
import Button from "components/Button"
import Conversation from "components/Conversation"
import StandardPage from "components/StandardPage"
import { useNavigate } from "react-router-dom"

export const West = () => {
	const navigate = useNavigate()

	return (
		<StandardPage backgroundImage={img} title="The Western approach">
			<Conversation width={20}>
				<p>You walk west through the tunnel.</p>
				<p>
					The tunnel is still damp and a bit slippery,
					but you manage to keep your balance.
				</p>
				<p>
					<BackgroundChange src={deadEndImg}/>
					After walking for a while you come across a dead end.
				</p>
				<p>
					You turn back around and head East
				
					<span className="conversation-controls">
						<Button label="ok" onClick={() => navigate("/tunnels/east/")} />
					</span>
				</p>
			</Conversation>
		</StandardPage>
	)
}
