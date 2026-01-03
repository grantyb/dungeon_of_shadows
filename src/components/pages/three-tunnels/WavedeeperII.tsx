import img from "assets/dungeon/tunnels/wave-symbol.png"
import Button from "components/Button"
import Conversation from "components/Conversation"
import StandardPage from "components/StandardPage"
import { useNavigate } from "react-router-dom"

export const WaveDeeperII = () => {
	const navigate = useNavigate()

	return (
		<StandardPage backgroundImage={img} title="The Roaring River">
			<Conversation width={20}>
				<p>You enter the rushing underground current again.</p>
				<p>
					The current throws you throughout the small tunnel. You are
					thrown against the stones in the middle of the path. After what felt like an
					eternity, The current slows down, finally depositing you onto
					another rocky shore within a vast cavern.
				</p>
				<p>
					Do you dare explore the cavern further?
					<div className="conversation-controls">
						<Button label="No" onClick={() => navigate("/tunnels/Wave-deeperII/")} />
						<Button
							label="Yes"
							onClick={() => alert("Not implemented yet")}
						/>
					</div>
				</p>
			</Conversation>
		</StandardPage>
	)
}
