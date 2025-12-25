import React from "react"

interface StandardPageProps extends React.PropsWithChildren {
	backgroundImage: string
	title: string
}

const StandardPage: React.FC<StandardPageProps> = (props) => {
	return (
		<div className="background-image">
			<img src={props.backgroundImage} alt={props.title} />
			<div className="main-title">
				<h1>{props.title}</h1>
			</div>
			{props.children}
		</div>
	)
}

export default StandardPage
