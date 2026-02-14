import React from "react"
import Button from "components/Button"
import Conversation from "components/Conversation"
import type { FoeId } from "data/foe-data"

interface CombatProps extends React.PropsWithChildren {
	backgroundImage: string
	foe: FoeId
}

// TODO : Expand combat system

const Combat: React.FC<CombatProps> = ({ foe, backgroundImage, children }) => {
	return (
		<div
			className="background-image"
			style={{ backgroundImage: `url(${backgroundImage})` }}
		>
			<div className="main-title">
				<h1>Combat with {foe}</h1>
			</div>
			<Conversation width={20}>
				<p>You are now in combat with {foe}!</p>
				<p>Choose your action:
					<span className="combat-controls">
						<Button onClick={() => alert("Combat system coming soon!")} label={"dash"}></Button>
						<Button onClick={() => alert("Combat system coming soon!")} label={"dodge"}></Button>
						<Button onClick={() => alert("Combat system coming soon!")} label={"defend"}></Button>
					</span>
				</p>
			</Conversation>
			{children}
		</div>
	)
}

export default Combat
