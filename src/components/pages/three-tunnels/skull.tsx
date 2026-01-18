import img from "../../../assets/dungeon/tunnels/wave-symbol.png"
import StandardPage from "../../StandardPage"
import Conversation from "../../Conversation"
import Button from "components/Button";

export const Skull = () => {

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
					
				</p>
				<p>
					do you dare to descend the staircase?
				</p>

				<div className="conversation-controls">
						<Button label="yes" onClick={() => alert("not implemented yet")} />
							<Button label="no" onClick={() => alert("not implemented yet")} />
					</div>
					
						

			
					
					
			</Conversation>
		</StandardPage>
	)
}
