import { useNavigate } from "react-router-dom";
import img from "../../../assets/dungeon/tunnels/wave-symbol.png"
import Button from "../../Button"
import Conversation from "../../Conversation"
import StandardPage from "../../StandardPage"

export const Wave = () => {
	const navigate = useNavigate()

	return (
		<StandardPage backgroundImage={img} title="The Three Tunnels">
			<Conversation width={20}>
				<p>You choose the tunnel marked with a wave.</p>
				<p>
					As you proceed, the sound of rushing water grows louder, and
					soon you find yourself in a vast underground cavern filled
					with a roaring river. The walls glisten with moisture, and
					the air is cool and damp.
				</p>
				<p>
					Do you wish to follow the river deeper into the cavern?
					<div className="conversation-controls">
						<Button
							label="No"
							onClick={() => navigate("/tunnels/")}
						/>
						<Button
							label="Yes"
							onClick={() => alert("Not implemented yet")}
						/>
					</div>
				</p>
			</Conversation>
		</StandardPage>
	)
}
