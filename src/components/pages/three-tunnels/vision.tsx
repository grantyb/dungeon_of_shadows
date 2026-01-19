import img from "assets/dungeon/tunnels/wave-symbol.png"
import Button from "components/Button"
import Conversation from "components/Conversation"
import StandardPage from "components/StandardPage"
import { useNavigate } from "react-router-dom"

export const Vision = () => {
	const navigate = useNavigate()

	return (
		<StandardPage backgroundImage={img} title="The orb">
			<Conversation width={20}>
				<p>as you jump in a figure forms in front of you.</p>
				<p>
					it is Proclarus, he looks at you with a sad expression.
				</p>
				<p>
					this world does not seem to exist,
					just merely an illusion.
				</p>
				<p>
					a song seems to be sung from nowhere but all around
					at the same time.
				</p>
				<p>
					the song speaks
					"the tunnel really bright and warm-the path 
					that lead to endless calm"
				</p>
				<p>
					you feel a strange sensation as you are 
					transported back to your phisycal body.
					<span className="conversation-controls">
						<Button label="Continue" onClick={() => navigate("/tunnels/dry")} />
					</span>
				</p>
			</Conversation>
		</StandardPage>
	)
}
