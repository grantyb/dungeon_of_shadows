import React from "react"

interface CombatProps extends React.PropsWithChildren {
	backgroundImage: string
	title: string
	foe: string
}

// TODO : Expand combat system

const Combat: React.FC<CombatProps> = ({
	foe,
	title,
	backgroundImage,
	children,
}) => {
	return (
		<div className="background-image">
			<img src={backgroundImage} alt={title} />
			<div className="main-title">
				<h1>Combat with {foe}</h1>
			</div>
			{children}
		</div>
	)
}

export default Combat
