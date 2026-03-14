import Button from "components/Button"
import { useCharacter } from "data/character-data"
import type { CSSProperties, ReactNode } from "react"
import React, { useEffect, useState } from "react"

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
	const { character, visit } = useCharacter()
	const alreadyVisited = (character?.visitedScenes || []).includes(window.location.pathname)
	const childArray = React.Children.toArray(children)
	const [revealedCount, setRevealedCount] = useState(1)

	const handleContinue = () => {
		setRevealedCount((prev) => Math.min(prev + 1, childArray.length))
	}

	const handleSkip = () => {
		setRevealedCount(childArray.length)
	}

	const allRevealed = alreadyVisited || revealedCount >= childArray.length

	useEffect(() => {
		if (allRevealed) {
			visit(window.location.pathname)
		}
	}, [allRevealed, visit])

	const storySoFar = allRevealed ? childArray : childArray.slice(0, revealedCount)

	const style: CSSProperties = {
		maxWidth: `${width}%`,
	}
	if (top !== undefined) {
		style.marginTop = `${top}vh`
	}
	return (
		<div className="conversation" style={style}>
			{storySoFar}
			{!allRevealed && (
				<span className="conversation-controls">
					<Button onClick={handleContinue} label="Continue" />
					<Button onClick={handleSkip} label="Skip" />
				</span>
			)}
		</div>
	)
}

export default Conversation
