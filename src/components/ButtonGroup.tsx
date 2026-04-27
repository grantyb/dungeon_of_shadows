import React from "react"

type Props = React.PropsWithChildren

const ButtonGroup: React.FC<Props> = ({children}) => {
	return (
		<div className="button-group" style={{ "--num-buttons": React.Children.count(children) } as React.CSSProperties	}>
			{children}
		</div>
	)
}

export default ButtonGroup
