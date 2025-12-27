import React from "react"

interface StandardPageProps extends React.PropsWithChildren {
	backgroundImage: string
	title: string
}

const StandardPage: React.FC<StandardPageProps> = ({
	backgroundImage,
	title,
	children,
}) => {
	return (
		<div
			className="background-image"
			style={{ backgroundImage: `url(${backgroundImage})` }}
		>
			<div className="main-title">
				<h1>{title}</h1>
			</div>
			{children}
		</div>
	)
}

export default StandardPage
