import { useEffect } from "react"
import { useBackground } from "./StandardPage"
import { useReveal } from "./RevealContext"

interface BackgroundChangeProps {
	src: string
}

const BackgroundChange: React.FC<BackgroundChangeProps> = ({ src }) => {
	const { setBackgroundImage } = useBackground()
	const { revealed } = useReveal()

	useEffect(() => {
		if (revealed) {
			setBackgroundImage(src)
		}
	}, [revealed, src, setBackgroundImage])

	return <img src={src} alt="" hidden />
}

export default BackgroundChange
