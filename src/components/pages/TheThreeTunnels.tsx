import { useNavigate } from "react-router-dom";
import Conversation from "components/Conversation"
import StandardPage from "components/StandardPage"
import img from "assets/dungeon/tunnels/the-three-tunnels.png"
import Button from "components/Button"

export const TheThreeTunnels = () => {
	const navigate = useNavigate()

	return (
		<StandardPage backgroundImage={img} title="The three tunnels">
			<Conversation width={35} top={25}>
				<p>There are three tunnels in the corner behind Proclarus.</p>
				<p>
					As you move through the shallow waters of the chamber, you
					notice that each tunnel is marked with a distinct symbol
					carved into the stone above its entrance: a skull, a wave,
					and a flame.
				</p>
				<p>
					Which tunnel do you dare take?
					<div className="conversation-controls">
						<Button
							label="Skull"
							onClick={() => navigate("/tunnels/skull/")}
						/>
						
					

						<Button
							label="Wave"
							onClick={() => navigate("/tunnels/wave/")}
						/>
							<Button
							label="Flame"
							onClick={() => navigate("/tunnels/flame/")}
						/>
						
					</div>
				</p>
			</Conversation>
		</StandardPage>
	)
}
