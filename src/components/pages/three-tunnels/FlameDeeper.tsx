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
						onClick={() => alert("not implemented yet")}>Left Door
					</button>

					<button
						onClick={() => alert("not implemented yet")}>right door 1
					</button>

					<button
						onClick={() => alert("not implemented yet")}>right door 2
					</button>

			

					
				

			
					
					
			</Conversation>
		</StandardPage>
	)
}
