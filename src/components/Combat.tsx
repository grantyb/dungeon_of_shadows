import React from "react"

interface CombatProps extends React.PropsWithChildren {
	backgroundImage: string
	foe: string
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
			{children}
		</div>
	)
}

export default Combat
