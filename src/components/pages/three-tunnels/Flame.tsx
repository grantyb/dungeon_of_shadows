import { useNavigate } from "react-router-dom";
import img from "../../../assets/dungeon/tunnels/wave-symbol.png";
import Conversation from "../../Conversation";
import StandardPage from "../../StandardPage";
import { identifyItem, inventoryContains } from "data/character-data";

export const Flame = () => {
	const navigate = useNavigate()

	const youSurvived = inventoryContains("FireOrb");
	
	return (
		<StandardPage backgroundImage={img} title="The Flame">
			<Conversation width={20}>
				<p>You choose the tunnel marked with a Flame.</p>
				<p>
					As you proceed, the sound ofa crackling fire grows louder, and
					soon you find yourself in a vast underground cavern filled
					with dancing flames. The walls glow with heat.
				</p>
				{youSurvived ? (<>
					<p>
						You try to escape but the fire is too intense, trapping you
						inside the cavern.
					</p>
					<p>
						Your orb glows brightly, and a protective barrier forms around you,
						shielding you from the flames. You safely make your way out of the cavern.
					</p>
					<p>
						you reach a corridor at the end of the cavern, you enter the small arched hallway.
					</p>

					<button 
						onClick={() => identifyItem("FireOrb") && navigate("/tunnels/flame-deeper")}>Continue
					</button>

				</>) : (<>

					<p>
						You try to escape but the fire is too intense, trapping you
						inside the cavern.
					</p>
					<p>
						You have perished in the flames.
					</p>

					<button 
						onClick={() => navigate("/")}>Restart
					</button>
				</>)}

			
					
					
			</Conversation>
		</StandardPage>
	)
}
