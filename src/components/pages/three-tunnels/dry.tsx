import img from "assets/dungeon/tunnels/dry.png"
import Button from "components/Button"
import Conversation from "components/Conversation"
import StandardPage from "components/StandardPage"
import { useNavigate } from "react-router-dom"

export const Dry = () => {
	const navigate = useNavigate()

	return (
		<StandardPage backgroundImage={img} title="The orb">
			<Conversation width={20}>
				<p>You wake up in the same cavern as before.</p>
				<p>
					You understand what the shiny orb is.
				</p>
				<p>
					It's an orb of Fire protection.
				</p>
				<p>
					You still ponder on how to escape, you look to the river and see
					that the whole river seems to be drained of its water.
				</p>
				<p>
					
					Which way would you like to explore?
					
					<span className="conversation-controls">
						<Button label="West" onClick={() => navigate("/tunnels/west/")} />
							<Button label="East" onClick={() => navigate("/tunnels/east/")} />
					</span>
				</p>
			</Conversation>
		</StandardPage>
	)
}
