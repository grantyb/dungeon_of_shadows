import BackgroundChange from "./BackgroundChange"
import Button from "components/Button"
import classNames from "classnames"
import { useCharacter } from "data/character-data"
import type { CSSProperties, ReactNode } from "react"
import React, { useEffect, useState } from "react"
import { RevealContext } from "./RevealContext"

function containsBackgroundChange(node: React.ReactNode): boolean {
	if (!React.isValidElement(node)) return false
	if (node.type === BackgroundChange) return true
	const props = node.props as { children?: React.ReactNode }
	if (!props.children) return false
	return React.Children.toArray(props.children).some(containsBackgroundChange)
}

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

	const stopIndices = childArray
		.map((child, i) => (containsBackgroundChange(child) ? i : -1))
		.filter((i) => i !== -1)

	function skipTarget(current: number): number {
		const next = stopIndices.find((i) => i >= current)
		return next !== undefined ? next + 1 : childArray.length
	}

	const autoAdvanceTarget = alreadyVisited
		? (stopIndices[0] ?? childArray.length)
		: 1
	const effectiveCount = Math.max(revealedCount, autoAdvanceTarget)

	const handleContinue = () => {
		setRevealedCount(Math.min(effectiveCount + 1, childArray.length))
	}

	const handleSkip = () => {
		setRevealedCount(skipTarget(effectiveCount))
	}

	const allRevealed = effectiveCount >= childArray.length

	useEffect(() => {
		if (allRevealed) {
			visit(window.location.pathname)
		}
	}, [allRevealed, visit])

	const style: CSSProperties = {
		maxWidth: `${width}%`,
	}
	if (top !== undefined) {
		style.marginTop = `${top}vh`
	}
	return (
		<div className="conversation" style={style}>
			{childArray.map((child, i) => {
				const revealed = i < effectiveCount
				const instant = alreadyVisited
				const className = classNames("conversation-child", {
					"-revealed": revealed,
					"-instant": instant,
				})

				return (
					<RevealContext.Provider key={i} value={{ revealed }}>
						<div className={className}>{child}</div>
					</RevealContext.Provider>
				)
			})}
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
