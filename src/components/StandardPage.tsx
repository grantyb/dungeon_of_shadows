import { BackgroundContext } from "components/BackgroundContext"
import React, { useCallback, useRef, useState } from "react"

interface StandardPageProps extends React.PropsWithChildren {
	backgroundImage: string
	title: string
}

const StandardPage: React.FC<StandardPageProps> = ({
	backgroundImage: initialBackground,
	title,
	children,
}) => {
	const [backgroundImage, setBackgroundImage] = useState(initialBackground)
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

	const debouncedSetBackground = useCallback((bg: string) => {
		if (timerRef.current) clearTimeout(timerRef.current)
		timerRef.current = setTimeout(() => setBackgroundImage(bg), 0)
	}, [])

	return (
		<BackgroundContext.Provider value={{ setBackgroundImage: debouncedSetBackground }}>
			<div
				className="background-image"
				style={{ backgroundImage: `url(${backgroundImage})` }}
			>
				<div className="main-title">
					<h1>{title}</h1>
				</div>
				{children}
			</div>
		</BackgroundContext.Provider>
	)
}

export default StandardPage
