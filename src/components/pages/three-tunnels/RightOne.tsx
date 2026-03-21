import { useNavigate } from "react-router-dom";
import img from "../../../assets/dungeon/tunnels/right.png";
import deadEnd from "../../../assets/dungeon/tunnels/dead-end.png";
import doorTrap from "../../../assets/dungeon/tunnels/door-trap.png";
import doorTrapDead from "../../../assets/dungeon/tunnels/door-trap-dead.png";
import Conversation from "../../Conversation";
import StandardPage from "../../StandardPage";
import BackgroundChange from "components/BackgroundChange";

export const RightOne = () => {
	const navigate = useNavigate()

	return (
		<StandardPage backgroundImage={img} title="The doors">
			<Conversation width={20}>
				<p>
					You enter the tunnel closest to you on the right.</p>
				<p>
					<BackgroundChange src={deadEnd}/>
					You walk a long way down the mysterious tunnel, but hit a dead end.
				</p>
				<p>
					<BackgroundChange src={doorTrap}/>
					You turn around and notice that the door swings shut and traps you inside.
				</p>
				<p>
					<BackgroundChange src={doorTrapDead}/>
					You have perished in the tunnel.
					<span className="conversation-controls">
						<button 
							onClick={() => navigate("/")}>Restart
						</button>
					</span>
				</p>
			</Conversation>
		</StandardPage>
	)
}
