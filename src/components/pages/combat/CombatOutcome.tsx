import { useNavigate } from "react-router-dom"
import Conversation from "../../Conversation"
import StandardPage from "../../StandardPage"
import Button from "../../Button"

interface CombatOutcomeProps {
	backgroundImage: string
	title: string
	text: string[]
	continueRoute: string
	continueLabel: string
}

export const CombatOutcome: React.FC<CombatOutcomeProps> = ({
	backgroundImage,
	title,
	text,
	continueRoute,
	continueLabel,
}) => {
	const navigate = useNavigate()

	return (
		<StandardPage backgroundImage={backgroundImage} title={title}>
			<Conversation width={30}>
				{text.map((line, i) => (
					<p key={i}>{line}
						{i === text.length - 1 && (
							<span className="conversation-controls">
								<Button onClick={() => navigate(continueRoute)} label={continueLabel} />
							</span>
						)}
					</p>
				))}
			</Conversation>
		</StandardPage>
	)
}
