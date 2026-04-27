import img from "assets/dungeon/tunnels/west-2.png"
import mushroomDescentImg from "assets/dungeon/tunnels/mushroom-descent.png"
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
					<BackgroundChange src={mushroomDescentImg}/>
					After walking for a while you reach what first looks like a
					dead end, but a cool blue glow seeps from a crack in the floor.
				</p>
				<p>
					Small mushrooms cluster around the opening. Beyond them, a
					narrow stone shelf twists down into a hidden cavern.
				
					<span className="conversation-controls">
						<Button label="Descend" onClick={() => navigate("/tunnels/mushroom-trail/")} />
						<Button label="Return East" onClick={() => navigate("/tunnels/east/")} />
					</span>
				</p>
			</Conversation>
		</StandardPage>
	)
}
