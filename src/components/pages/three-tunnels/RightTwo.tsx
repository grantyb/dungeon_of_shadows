import { useNavigate } from "react-router-dom";
import img from "../../../assets/dungeon/tunnels/wave-symbol.png";
import Conversation from "../../Conversation";
import StandardPage from "../../StandardPage";
import { identifyItem, inventoryContains } from "data/character-data";

export const RightTwo = () => {
	const navigate = useNavigate()

	
	
	return (
		<StandardPage backgroundImage={img} title="The doors">
			<Conversation width={20}>
					<p>
						You enter the tunnel furthest from you on the right.</p>
					<p>
						you walk a long way down the mysterious tunnel.
					</p>
					<p>
						you hit a dead end, you turn around 
						and notice that the door swings shut and traps you inside.
					</p>
					<p>
						you have perished in the tunnel.
					</p>

					<button 
						onClick={() => navigate("/")}>Restart
					</button>
					
			</Conversation>
		</StandardPage>
	)
}
