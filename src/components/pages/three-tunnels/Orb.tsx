import img from "assets/dungeon/tunnels/wave-symbol.png"
import Button from "components/Button"
import Conversation from "components/Conversation"
import StandardPage from "components/StandardPage"
import { useNavigate } from "react-router-dom"

export const Orb = () => {
	const navigate = useNavigate()

	return (
		<StandardPage backgroundImage={img} title="The calm cavern">
			<Conversation width={20}>
				<p>you slowly approach the chest.</p>
				<p>
					when you arrive you try to open the chest
					but the lid is too heavy.
				</p>
				<p>
					after what feels like hours you finally manage to
					pry the lid open.
				</p>
				<p>
					inside you find a shiny orb pulsating with magical energy.
				</p>
				<p>
					Do you take the orb out of the chest?
					<div className="conversation-controls">
						<Button label="No" onClick={() => alert("not implemented yet")} />
						<Button
							label="Yes"
							onClick={() => navigate("/tunnels/cavern/")}
						/>
					</div>
				</p>
			</Conversation>
		</StandardPage>
	)
}
