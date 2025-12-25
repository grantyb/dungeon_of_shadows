import { useEffect } from "react"
import { Route } from "react-router-dom"
import introductionMusic from "./assets/dungeon/introduction.m4a"
import DungeonEntrance from "./components/DungeonEntrance"
import { AnimatedRoutes } from "./components/Routing/AnimatedRoute"
import WelcomeScreen from "./components/WelcomeScreen"

function App() {
	useEffect(() => {
		const ctx = new AudioContext()
		const gainNode = ctx.createGain()
		gainNode.gain.value = 0.1 // 50%
		gainNode.connect(ctx.destination)
		let source

		fetch(introductionMusic)
			.then((r) => r.arrayBuffer())
			.then((b) => ctx.decodeAudioData(b))
			.then((buffer) => {
				source = ctx.createBufferSource()
				source.buffer = buffer
				source.loop = true
				source.connect(gainNode)
				console.log("Starting music")
				source.start()
			})
	}, [])
	return (
		<AnimatedRoutes durationMs={500}>
			<Route path="/" element={<WelcomeScreen />} />
			<Route path="/dungeon/" element={<DungeonEntrance />} />
		</AnimatedRoutes>
	)
}

export default App
