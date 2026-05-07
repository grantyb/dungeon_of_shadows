import { useNavigate } from "react-router-dom";
import img from "../../../assets/dungeon/tunnels/right.png";
import deadEnd from "../../../assets/dungeon/tunnels/dead-end.png";
import doorTrap from "../../../assets/dungeon/tunnels/door-trap.png";
import portClosed from "../../../assets/dungeon/tunnels/port-closed.png";
import Button from "../../Button";
import Conversation from "../../Conversation";
import StandardPage from "../../StandardPage";
import BackgroundChange from "components/BackgroundChange";
import { useCharacter } from "data/character-data";

export const RightTwo = () => {
	const navigate = useNavigate()
	const { inventoryContains } = useCharacter()
	const hasMooncapLantern = inventoryContains("MooncapLantern")
	
	return (
		<StandardPage backgroundImage={img} title="The doors">
			<Conversation width={28}>
				<p>
					You enter the tunnel furthest from you on the right.
				</p>
				<p>
					<BackgroundChange src={deadEnd}/>
					You walk a long way down the mysterious tunnel, but hit a dead end.
				</p>
				<p>
					<BackgroundChange src={doorTrap}/>
					You turn around and notice that the door swings shut and traps you inside.
				</p>
				<p>
					<BackgroundChange src={portClosed}/>
					The sealed door ahead does not merely block the tunnel. It grips
					itself shut. Six thick pinkish-purple tentacles slide from behind the
					planks and coil around the wood, while two angry eyes carved into
					the stone above glare down at you.
				</p>
				<p>
					This is the Port: a monster disguised as a door. There is no way
					back, and no way through unless its portal opens.
				</p>
				{hasMooncapLantern ? (
					<p>
						The Mooncap Lantern glows cold blue. A tiny myconid sproutling
						steps out of the light and whispers into your thoughts: "The
						Port opens for a true answer, or for death. Choose with care."
						<span className="conversation-controls">
							<Button label="Answer the riddle" onClick={() => navigate("/tunnels/port-riddle/")} />
							<Button label="Fight the Port" onClick={() => navigate("/tunnels/port-fight/")} />
						</span>
					</p>
				) : (
					<p>
						No friendly spores stir in the dark. The Port's tentacles tighten
						around the door, and the only path left is violence.
						<span className="conversation-controls">
							<Button label="Fight the Port" onClick={() => navigate("/tunnels/port-fight/")} />
						</span>
					</p>
				)}
			</Conversation>
		</StandardPage>
	)
}
