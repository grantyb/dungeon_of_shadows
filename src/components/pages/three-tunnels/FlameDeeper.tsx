import { useNavigate } from "react-router-dom";
import img from "../../../assets/dungeon/tunnels/flame-symbol.png";
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
						You ponder which door to choose.
					</p>
					<p>
						Which door do you pick?
					</p>

					<button 
						onClick={() => navigate("/tunnels/left-door/")}>Left Door
					</button>

					<button
						onClick={() => navigate("/tunnels/right-one/")}>Right Door 1
					</button>

					<button
						onClick={() => navigate("/tunnels/right-two/")}>Right Door 2
					</button>

			

					
				

			
					
					
			</Conversation>
		</StandardPage>
	)
}
