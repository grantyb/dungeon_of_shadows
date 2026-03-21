import img from "assets/dungeon/tunnels/climb-waterfall.png"
import Button from "components/Button"
import Conversation from "components/Conversation"
import StandardPage from "components/StandardPage"
import { useNavigate } from "react-router-dom"

export const WaveExit = () => {
	const navigate = useNavigate()

	return (
		<StandardPage backgroundImage={img} title="The Waterfall">
			<Conversation width={20}>
				<p>You ignore the chest, and scramble up the rocky waterfall to safety.</p>
				<p>
					As you get to the top, you start to realise that the platform above is home to a familiar chamber.
					<span className="conversation-controls">
						<Button
							label="okay"
							onClick={() => navigate("/tunnels/")}
						/>
					</span>
				</p>
			</Conversation>
		</StandardPage>
	)
}
