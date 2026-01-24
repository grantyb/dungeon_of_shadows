import { useNavigate } from "react-router-dom";
import img from "../../../assets/dungeon/tunnels/plasma-beast.png";
import Conversation from "../../Conversation";
import StandardPage from "../../StandardPage";

export const Plasma = () => {
	const navigate = useNavigate()

	
	
	return (
		<StandardPage backgroundImage={img} title="The Plasma beast">
			<Conversation width={20}>
					<p>
						It is your time to strike the Plasma beast.</p>
					<p>
						You have three options to attack with
					</p>
					<p>
						Which one do you choose?
					</p>

					<button 
						onClick={() => alert("attack features coming soon")}>use sword
					</button>
					<button
						onClick={() => alert("attack features coming soon")}>Magic Attack
					</button>
					<button
						onClick={() => alert("attack features coming soon")}>shoot with bow
					</button>
					
			</Conversation>
		</StandardPage>
	)
}
