import img from "assets/dungeon/tunnels/portal.png"
import Button from "components/Button"
import Conversation from "components/Conversation"
import StandardPage from "components/StandardPage"
import { useNavigate } from "react-router-dom"

export const Cavern = () => {
	const navigate = useNavigate()

	return (
		<StandardPage backgroundImage={img} title="The Portal">
			<Conversation width={20}>
				<p>The orb pulsates in your hands
					vibrating your whole body intensely.</p>
				<p>
					You pocket the orb and turn to leave the cavern.
				</p>
				<p>
					But then you realise that the current takes you only deeper
					West throughout the cavern.
				</p>
				<p>
					You turn around  and begin to put your head on your knees
					to think what to do next.
				</p>
				<p>
					Suddenly a purple light glows in the corner of your eye,
					you look up and see a massive hole in the floor of
					the cavern filled with a swirling purple liquid.
				</p>
				<p>
					You jump into the portal without hesitation.
				</p>
				<p>
					You feel a strange sensation as you are transported
					to another place.
					<span className="conversation-controls">
						<Button label="Continue" onClick={() => navigate("/tunnels/vision")} />
					</span>
				</p>
			</Conversation>
		</StandardPage>
	)
}
