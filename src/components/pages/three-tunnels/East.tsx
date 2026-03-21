import img from "assets/dungeon/tunnels/eastern-approach.png"
import archwayImg from "assets/dungeon/tunnels/eastern-archway.png"
import BackgroundChange from "components/BackgroundChange"
import Button from "components/Button"
import Conversation from "components/Conversation"
import StandardPage from "components/StandardPage"
import { useNavigate } from "react-router-dom"

export const East = () => {
	const navigate = useNavigate()

	return (
		<StandardPage backgroundImage={img} title="The Eastern approach">
			<Conversation width={20}>
				<p>You walk east through the tunnel.</p>
				<p>
					The tunnel is still damp and a bit slippery,
					but you manage to keep your balance.
				</p>
				<p>
					<BackgroundChange src={archwayImg}/>
					After walking for a while you come across an archway.
				</p>
				<p>
					You enter and it takes you back to the room where Gol-Ink
					is still muttering strange words on his small wooden chair.
				
					<span className="conversation-controls">
						<Button label="continue" onClick={() => navigate("/tunnels/")} />
					</span>
				</p>
			</Conversation>
		</StandardPage>
	)
}
