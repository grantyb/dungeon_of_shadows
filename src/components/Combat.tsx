import React from "react"

interface CombatProps {
	foe: string
}

const Combat: React.FC<CombatProps> = ({ foe }) => {

	return (
		<div className="combat-screen-bg">
			<h2>Combat with {foe}</h2>
			{/* Combat UI would go here */}
		</div>
	)
}

export default Combat
