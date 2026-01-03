import Combat from "components/Combat"
import { AnimatedRoutes } from "components/Routing/AnimatedRoute"
import WelcomeScreen from "components/WelcomeScreen"
import React, { useRef, useState } from "react"
import { Route } from "react-router-dom"

import introductionMusic from "assets/dungeon/introduction.m4a"
import wizard from "assets/foes/wizard.png"

import Button from "components/Button"
import CharacterCreationScreen from "components/CharacterCreationScreen"
import MuteIcon from "components/icons/MuteIcon"
import UnmuteIcon from "components/icons/UnmuteIcon"
import { DungeonEntrance } from "components/pages/DungeonEntrance"
import { GreetWizard } from "components/pages/GreetWizard"
import { HelpWizard } from "components/pages/HelpWizard"
import { TheThreeTunnels } from "components/pages/TheThreeTunnels"
import { Wave } from "components/pages/three-tunnels/Wave"
import { WaveDeeper } from "components/pages/three-tunnels/WaveDeeper"
import { WaveDeeperII } from "components/pages/three-tunnels/WavedeeperII"
import { Flame } from "components/pages/three-tunnels/Flame"

function App() {
	const [audioEnabled, setAudioEnabled] = useState(false)
	const ctxRef = useRef<AudioContext | null>(null)
	const sourceRef = useRef<AudioBufferSourceNode | null>(null)
	const gainNodeRef = useRef<GainNode | null>(null)
	const bufferRef = useRef<AudioBuffer | null>(null)

	// Load audio buffer once
	React.useEffect(() => {
		fetch(introductionMusic)
			.then((r) => r.arrayBuffer())
			.then((b) => {
				if (!ctxRef.current) ctxRef.current = new window.AudioContext()
				return ctxRef.current.decodeAudioData(b)
			})
			.then((buffer) => {
				bufferRef.current = buffer
			})
		return () => {
			try {
				sourceRef.current?.stop()
			} catch {
				// Ignore errors on stop
			}
			ctxRef.current?.close()
		}
	}, [])

	// Play or pause audio on toggle
	React.useEffect(() => {
		if (!audioEnabled) {
			try {
				sourceRef.current?.stop()
			} catch {
				// Ignore errors on stop
			}
			sourceRef.current = null
			return
		}
		if (!bufferRef.current) return
		if (!ctxRef.current) ctxRef.current = new window.AudioContext()
		if (!gainNodeRef.current) {
			gainNodeRef.current = ctxRef.current.createGain()
			gainNodeRef.current.gain.value = 0.1
			gainNodeRef.current.connect(ctxRef.current.destination)
		}
		const source = ctxRef.current.createBufferSource()
		source.buffer = bufferRef.current
		source.loop = true
		source.connect(gainNodeRef.current)
		source.start()
		sourceRef.current = source
	}, [audioEnabled])

	return (
		<div className="app-container">
			<AnimatedRoutes durationMs={500}>
				<Route path="/" element={<WelcomeScreen />} />
				<Route
					path="/create-character"
					element={<CharacterCreationScreen />}
				/>
				<Route path="/dungeon/" element={<DungeonEntrance />} />
				<Route
					path="/attack-wizard/"
					element={<Combat foe="wizard" backgroundImage={wizard} />}
				/>
				<Route path="/greet-wizard/" element={<GreetWizard />} />
				<Route path="/proceed/" element={<HelpWizard />} />
				<Route path="/tunnels/" element={<TheThreeTunnels />} />
				<Route path="/tunnels/wave/" element={<Wave />} />
				<Route path="/tunnels/wave-deeper/" element={<WaveDeeper />} />
				<Route path="/tunnels/wave-deeperII/" element={<WaveDeeperII />} />
				<Route path="/tunnels/flame/" element={<Flame />} />
			</AnimatedRoutes>
			<Button
				label=""	
				className="music-toggle"
				aria-label={audioEnabled ? "Pause music" : "Play music"}
				onClick={() => setAudioEnabled((v) => !v)}
			>
				{audioEnabled ? (
					<UnmuteIcon width={24} height={24} />
				) : (
					<MuteIcon width={24} height={24} />
				)}
			</Button>
		</div>
	)
}

export default App
