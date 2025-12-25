import React from "react"
import { Routes, useLocation } from "react-router-dom"

interface AnimatedRoutesProps extends React.PropsWithChildren {
	durationMs?: number
}

export function AnimatedRoutes(props: AnimatedRoutesProps) {
	const { children, durationMs = 300 } = props
	const location = useLocation()

	// What we are currently *showing* (lags behind real location during fade-out)
	const [displayLocation, setDisplayLocation] = React.useState(location)

	// Controls fade state
	const [isFadingOut, setIsFadingOut] = React.useState(false)

	// When router location changes, start fade-out
	React.useEffect(() => {
		if (location.key !== displayLocation.key) {
			setIsFadingOut(true)
		}
	}, [location, displayLocation])

	// After fade-out, switch routes, then fade-in
	React.useEffect(() => {
		if (!isFadingOut) return

		const t = window.setTimeout(() => {
			setDisplayLocation(location) // navigation is now "committed" visually
			setIsFadingOut(false) // triggers fade-in
		}, durationMs)

		return () => window.clearTimeout(t)
	}, [isFadingOut, location, durationMs])

	return (
		<div className="backdrop">
			<div className={`route-fade ${isFadingOut ? "out" : ""}`}>
				<Routes location={displayLocation}>{children}</Routes>
			</div>
		</div>
	)
}
