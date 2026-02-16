import React from "react"

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	label: string
}

const Button: React.FC<Props> = ({ label, ...props }) => {
	if (props.tabIndex === undefined) {
		props.tabIndex = 0
	}
	return (
		<button type="button" {...props}>
			{label}
			{props.children}
		</button>
	)
}

export default Button
