import { useNavigate } from "react-router-dom";
import img from "../../../assets/dungeon/tunnels/wave-symbol.png"
import StandardPage from "../../StandardPage"
import Conversation from "../../Conversation"

export const Flame = () => {
	const navigate = useNavigate()

	return (
		<StandardPage backgroundImage={img} title="The Three Tunnels">
			<Conversation width={20}>
				<p>You choose the tunnel marked with a Flame.</p>
				<p>
					As you proceed, the sound ofa crackling fire grows louder, and
					soon you find yourself in a vast underground cavern filled
					with dancing flames. The walls glow with heat.
					
				</p>
				<p>
					You try to escape but the fire is too intense, trapping you
					inside the cavern.
				</p>
				<p>
					You have perished in the flames.
				</p>
			
					
					
			</Conversation>
		</StandardPage>
	)
}
