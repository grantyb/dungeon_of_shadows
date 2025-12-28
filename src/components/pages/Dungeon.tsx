import { useNavigate } from "react-router-dom";
import Conversation from "../Conversation";
import StandardPage from "../StandardPage";
import img from "../../assets/dungeon/greet-wizard.png";

export const Dungeon = () => {
	const navigate = useNavigate()

	return (
		<StandardPage backgroundImage={img} title="The Three Tunnels">
			<Conversation width={35}>
				<p>
					There are three tunnels in the corner behind Proclarus.
				</p>
				<p>
					As you move through the shallow waters of the chamber,
					you notice that each tunnel is marked with a distinct symbol
					carved into the stone above its entrance: a skull, a flame,
					and a wave.
				</p>
				<p>
					Which tunnel do you dare take?
					
					<div className="conversation-controls">
						<button tabIndex={0} onClick={() => navigate("/proceed/")}>
							Skull
						</button>
						<button tabIndex={0} onClick={() => navigate("/attack-wizard/")}>
							Flame
						</button>
						<button tabIndex={0} onClick={() => navigate("/tunnels/wave/")}>
							Wave
						</button>
					</div>
				</p>
			</Conversation>
		</StandardPage>
	)
}
