import React, { useState } from "react"
import type { ReactNode } from "react"

interface ConversationProps {
	width: number
	children: ReactNode[] | ReactNode
}

const Conversation: React.FC<ConversationProps> = ({ width, children }) => {
	// Normalize children to array
	const childArray = React.Children.toArray(children)
	const [revealedCount, setRevealedCount] = useState(1)

	const handleContinue = () => {
		setRevealedCount((prev) => Math.min(prev + 1, childArray.length))
	}

	const handleSkip = () => {
		setRevealedCount(childArray.length)
	}

	const allRevealed = revealedCount >= childArray.length

	return (
		<div className="conversation" style={{ maxWidth: `${width}%` }}>
			{childArray.slice(0, revealedCount)}
			{!allRevealed && (
				<div className="conversation-controls">
					<button onClick={handleContinue}>Continue</button>
					<button onClick={handleSkip}>Skip</button>
				</div>
			)}
		</div>
	)
}

export default Conversation
