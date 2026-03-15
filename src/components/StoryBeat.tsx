import type React from "react"
import { useEffect } from "react"
import { useBackground } from "./StandardPage"

interface StoryBeatProps extends React.PropsWithChildren {
	backgroundImage: string
}

const StoryBeat: React.FC<StoryBeatProps> = ({ backgroundImage, children }) => {
	const { setBackgroundImage } = useBackground()

	useEffect(() => {
		setBackgroundImage(backgroundImage)
	}, [backgroundImage, setBackgroundImage])

	return <>{children}</>
}

export default StoryBeat
