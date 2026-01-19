import img from "assets/dungeon/tunnels/wave-symbol.png"
import Button from "components/Button"
import Conversation from "components/Conversation"
import StandardPage from "components/StandardPage"
import { useNavigate } from "react-router-dom"

export const WaveDeeper = () => {
	const navigate = useNavigate()

	return (
		<StandardPage backgroundImage={img} title="The Roaring River">
			<Conversation width={20}>
				<p>You enter the rushing underground current.</p>
				<p>
					The current throws you throughout the small tunnel. You are
					thrown against the rocky walls, After what felt like an
					eternity the current slows down, finally depositing you onto
					a rocky shore within a vast cavern.
				</p>
				<p>
					Do you dare explore the cavern further?
					<span className="conversation-controls">
						<Button label="No" onClick={() => alert("not implemented yet")} />
						<Button
							label="Yes"
							onClick={() => navigate("/tunnels/chest/")}
						/>
					</span>
				</p>
			</Conversation>
		</StandardPage>
	)
}
