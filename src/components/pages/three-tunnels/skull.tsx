import img from "../../../assets/dungeon/tunnels/wave-symbol.png"
import StandardPage from "../../StandardPage"
import Conversation from "../../Conversation"
import Button from "components/Button";
import { useNavigate } from "react-router-dom";

export const Skull = () => {
	const navigate = useNavigate()
	return (
		<StandardPage backgroundImage={img} title="The Skull">
			<Conversation width={20}>
				<p>You choose the tunnel marked with a Skull.</p>
				<p>
					at the end of the tunnel you find yourself in a small underground cavern,
					in the center is a staircase that leads downwards.
					
				</p>
				<p>
					as you look down the staircase a damp forbidding darkness swallows the light
					
				</p>f

				<div className="conversation-controls">
						<Button label="enter" onClick={() => navigate("/tunnels/skullDeeper/")} />
					</div>
					
						

			
					
					
			</Conversation>
		</StandardPage>
	)
}
