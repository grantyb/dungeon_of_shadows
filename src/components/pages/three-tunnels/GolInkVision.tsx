import img from "assets/dungeon/tunnels/vision.png"
import Button from "components/Button"
import Conversation from "components/Conversation"
import StandardPage from "components/StandardPage"
import { useNavigate } from "react-router-dom"

export const GolInkVision = () => {
	const navigate = useNavigate()

	return (
		<StandardPage backgroundImage={img} title="A surprising vision">
			<Conversation width={20}>
				<p>As you jump in a figure forms in front of you.</p>
				<p>
					It is Gol-Ink, he looks at you with a sad expression.
				</p>
				<p>
					This world does not seem to exist,
					just merely an illusion.
				</p>
				<p>
					A song seems to be sung from nowhere but all around
					at the same time.
				</p>
				<p>
					The song speaks
					"the tunnel really bright and warm-the path 
					that lead to endless calm"
				</p>
				<p>
					You feel a strange sensation as you are 
					transported back to your physical body.
					<span className="conversation-controls">
						<Button label="Continue" onClick={() => navigate("/tunnels/dry")} />
					</span>
				</p>
			</Conversation>
		</StandardPage>
	)
}
