import { useNavigate } from "react-router-dom";
import img from "../../../assets/dungeon/greet-wizard.png";
import StandardPage from "../../StandardPage";
import Conversation from "../../Conversation";

export const Wave = () => {
	const navigate = useNavigate()

	return (
		<StandardPage backgroundImage={img} title="The Three Tunnels">
			<Conversation width={35}>
				<p>
					You choose the tunnel marked with a wave.
				</p>
				<p>
					As you proceed, the sound of rushing water grows louder,
					and soon you find yourself in a vast underground cavern filled
					with a roaring river. The walls glisten with moisture, and
					the air is cool and damp.
				</p>
				<p>
					Do you wish to follow the river deeper into the cavern,
					<div className="conversation-controls">
						<button tabIndex={0} onClick={() => navigate("/proceed/")}>
							No
						</button>
						<button tabIndex={0} onClick={() => navigate("/attack-wizard/")}>
							Yes
						</button>
					</div>
				</p>
			</Conversation>
		</StandardPage>
	)
}
