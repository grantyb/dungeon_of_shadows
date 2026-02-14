import { useNavigate } from "react-router-dom";
import img from "../../../assets/dungeon/tunnels/plasma-beast.png";
import Conversation from "../../Conversation";
import StandardPage from "../../StandardPage";

export const LeftDoor = () => {
	const navigate = useNavigate()

	return (
		<StandardPage backgroundImage={img} title="The Plasma beast">
			<Conversation width={20}>
					<p>
						You enter the tunnel on the left.</p>
					<p>
						You walk a long way down the mysterious tunnel.
					</p>
					<p>
						You find yourself in a giant room filled with fire,
						you look up and see a huge mouth seeming to be hungry for your flesh
					</p>
					<p>
						The creature pounces at you,but you manage to dodge its attack
						in time.
					</p>
					<p>
						It is now your turn to attack
						<span className="conversation-controls">
							<button 
								onClick={() => navigate("/tunnels/plasma/")}>Start turn
							</button>
						</span>
					</p>
			</Conversation>
		</StandardPage>
	)
}
