import { useEffect } from "react"
import { Route } from "react-router-dom"
import introductionMusic from "./assets/dungeon/introduction.m4a"
import DungeonEntrance from "./components/DungeonEntrance"
import { AnimatedRoutes } from "./components/Routing/AnimatedRoute"
import WelcomeScreen from "./components/WelcomeScreen"
import Combat from "./components/Combat"

function App() {
	useEffect(() => {
		const ctx = new AudioContext()
		const gainNode = ctx.createGain()
		gainNode.gain.value = 0.1 // 10%
		gainNode.connect(ctx.destination)
		let source: AudioBufferSourceNode | undefined

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

		return () => {
			if (source) {
				try {
					source.stop()
				} catch {
					// ignore
				}
			}
			ctx.close()
		}
	}, [])
	return (
		<AnimatedRoutes durationMs={500}>
			<Route path="/" element={<WelcomeScreen />} />
			<Route path="/dungeon/" element={<DungeonEntrance />} />
			<Route path="/attack-wizard/" element={<Combat foe="wizard" />} />
		</AnimatedRoutes>
	)
}

export default App
