import img from "../../../assets/dungeon/tunnels/skull-symbol.png"
import skullTunnel from "../../../assets/dungeon/tunnels/skull-tunnel.png"
import StandardPage from "../../StandardPage"
import Conversation from "../../Conversation"
import Button from "components/Button";
import { useNavigate } from "react-router-dom";
import BackgroundChange from "components/BackgroundChange";

export const Skull = () => {
	const navigate = useNavigate()
	return (
		<StandardPage backgroundImage={img} title="The Skull">
			<Conversation width={20}>
				<p>You choose the tunnel marked with a Skull.</p>
				<p>
					At the end of the tunnel you find yourself in a small underground cavern,
					in the center is a staircase that leads downwards.
				</p>
				<p>
					<BackgroundChange src={skullTunnel} />
					As you look down the staircase a damp forbidding darkness swallows the light.
					<span className="conversation-controls">
						<Button label="Enter" onClick={() => navigate("/tunnels/skullDeeper/")} />
					</span>
				</p>

			</Conversation>
		</StandardPage>
	)
}
