import { useNavigate } from "react-router-dom";
import Conversation from "components/Conversation"
import StandardPage from "components/StandardPage"
import img from "assets/dungeon/tunnels/the-three-tunnels.png"
import Button from "components/Button"

export const TheThreeTunnels = () => {
	const navigate = useNavigate()

	return (
		<StandardPage backgroundImage={img} title="The Three Tunnels">
			<Conversation width={35} top={25}>
				<p>There are three tunnels in the corner behind Proclarus.</p>
				<p>
					As you move through the shallow waters of the chamber, you
					notice that each tunnel is marked with a distinct symbol
					carved into the stone above its entrance: a skull, a flame,
					and a wave.
				</p>
				<p>
					Which tunnel do you dare take?
					<div className="conversation-controls">
						<Button
							label="Skull"
							onClick={() => alert("Not implemented yet")}
						/>
						<Button
							label="Flame"
							onClick={() => alert("Not implemented yet")}
						/>
						<Button
							label="Wave"
							onClick={() => navigate("/tunnels/wave/")}
						/>
					</div>
				</p>
			</Conversation>
		</StandardPage>
	)
}
