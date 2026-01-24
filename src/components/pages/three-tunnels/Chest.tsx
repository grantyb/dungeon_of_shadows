import img from "assets/dungeon/tunnels/wave-deeper.png"
import Button from "components/Button"
import Conversation from "components/Conversation"
import StandardPage from "components/StandardPage"
import { useNavigate } from "react-router-dom"

export const Chest = () => {
	const navigate = useNavigate()

	return (
		<StandardPage backgroundImage={img} title="The calm cavern">
			<Conversation width={20}>
				<p>as you search the cavern a shiny gold chest 
					catches your eye.</p>
				<p>
					you turn to the chest and go closer
				</p>
				<p>
					Do you dare open the chest?
					<span className="conversation-controls">
						<Button label="No" onClick={() => navigate("/tunnels/Wave-deeper/")} />
						<Button
							label="Yes"
							onClick={() => navigate("/tunnels/orb/")}
						/>
					</span>
				</p>
			</Conversation>
		</StandardPage>
	)
}
