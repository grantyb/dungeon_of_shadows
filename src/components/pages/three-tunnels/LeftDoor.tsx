import { useNavigate } from "react-router-dom";
import img from "../../../assets/dungeon/tunnels/wave-symbol.png";
import Conversation from "../../Conversation";
import StandardPage from "../../StandardPage";
import { identifyItem, inventoryContains } from "data/character-data";

export const LeftDoor = () => {
	const navigate = useNavigate()

	
	
	return (
		<StandardPage backgroundImage={img} title="The doors">
			<Conversation width={20}>
					<p>
						You enter the tunnel on the left.</p>
					<p>
						you walk a long way down the mysterious tunnel.
					</p>
					<p>
						you find yourself in a giant room filled with fire,
						you look up and see a huge mouth seeming to be hungry for your flesh
					</p>
					<p>
						the creature pounces at you,but you manage to dodge its attack
						in time.
					</p>
					<p>
						it is now your turn to attack
					</p>

					<button 
						onClick={() => alert("attack features coming soon")}>start turn
					</button>
					
			</Conversation>
		</StandardPage>
	)
}
