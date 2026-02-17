import React from "react"
import Button from "components/Button"
import Conversation from "components/Conversation"
import { Foes, type FoeId } from "data/foe-data"

interface CombatProps extends React.PropsWithChildren {
	foe: FoeId
}

// TODO : Expand combat system

const Combat: React.FC<CombatProps> = (props) => {
	const foe = Foes[props.foe]
	return (
		<div
			className="background-image"
			style={{ backgroundImage: `url(${foe.backgroundImage})` }}
		>
			<div className="main-title">
				<h1>Combat with {foe.name}</h1>
			</div>
			<Conversation width={20}>
				<p>It is your time to strike {foe.name}!</p>
				<p>Choose your action:
					<span className="combat-controls">
						<Button onClick={() => alert("Combat system coming very soon!")} label={"dash"}></Button>
						<Button onClick={() => alert("Combat system coming very soon!")} label={"dodge"}></Button>
						<Button onClick={() => alert("Combat system coming very soon!")} label={"defend"}></Button>
					</span>
				</p>
			</Conversation>
			{props.children}
		</div>
	)
}

export default Combat
