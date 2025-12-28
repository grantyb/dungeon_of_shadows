import React, { useState } from "react"
import type { CSSProperties, ReactNode } from "react"

interface ConversationProps {
	top?: number
	width: number
	children: ReactNode[] | ReactNode
}

const Conversation: React.FC<ConversationProps> = ({
	top,
	width,
	children,
}) => {
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

	const style: CSSProperties = {
		maxWidth: `${width}%`,
	}
	if (top !== undefined) {
		style.marginTop = `${top}%`
	}
	return (
		<div className="conversation" style={style}>
			{childArray.slice(0, revealedCount)}
			{!allRevealed && (
				<div className="conversation-controls">
					<button tabIndex={0} onClick={handleContinue}>
						Continue
					</button>
					<button tabIndex={0} onClick={handleSkip}>
						Skip
					</button>
				</div>
			)}
		</div>
	)
}

export default Conversation
