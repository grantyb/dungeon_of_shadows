import { useNavigate } from "react-router-dom";
import img from "../../../assets/dungeon/tunnels/wave-symbol.png";
import Conversation from "../../Conversation";
import StandardPage from "../../StandardPage";
import { identifyItem, inventoryContains } from "data/character-data";

export const FlameDeeper = () => {
	const navigate = useNavigate()

	
	
	return (
		<StandardPage backgroundImage={img} title="The Flame">
			<Conversation width={20}>
					<p>
						You enter the tunnel and see 3 doors-one on the left and two on the right.</p>
					<p>
						you ponder which door to choose.
					</p>
					<p>
						which door do you pick?
					</p>

					<button 
						onClick={() => navigate("/tunnels/left-door/")}>Left Door
					</button>

					<button
						onClick={() => navigate("/tunnels/right-one/")}>right door 1
					</button>

					<button
						onClick={() => navigate("/tunnels/right-two/")}>right door 2
					</button>

			

					
				

			
					
					
			</Conversation>
		</StandardPage>
	)
}
