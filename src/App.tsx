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
import { Cavern } from "components/pages/three-tunnels/cavern"
import { Chest } from "components/pages/three-tunnels/Chest"
import { Dry } from "components/pages/three-tunnels/dry"
import { East } from "components/pages/three-tunnels/East"
import { Flame } from "components/pages/three-tunnels/Flame"
import { Orb } from "components/pages/three-tunnels/Orb"
import { Skull } from "components/pages/three-tunnels/skull"
import { SkullDeeper } from "components/pages/three-tunnels/SkullDeeper"
import { Vision } from "components/pages/three-tunnels/vision"
import { Wave } from "components/pages/three-tunnels/Wave"
import { WaveDeeper } from "components/pages/three-tunnels/WaveDeeper"
import { WaveDeeperII } from "components/pages/three-tunnels/WavedeeperII"
import { West } from "components/pages/three-tunnels/West"
import { toast, ToastContainer, Zoom } from "react-toastify"
import { character } from "data/character-data"
import { FlameDeeper } from "components/pages/three-tunnels/FlameDeeper"
import { RightOne } from "components/pages/three-tunnels/RightOne"
import { RightTwo } from "components/pages/three-tunnels/RightTwo"
import { LeftDoor } from "components/pages/three-tunnels/LeftDoor"
import { Plasma } from "components/pages/three-tunnels/Plasma"
function App() {
	const [audioEnabled, setAudioEnabled] = useState(false)
	const ctxRef = useRef<AudioContext | null>(null)
	const sourceRef = useRef<AudioBufferSourceNode | null>(null)
	const gainNodeRef = useRef<GainNode | null>(null)
	const bufferRef = useRef<AudioBuffer | null>(null)

	// Load audio buffer once
	React.useEffect(() => {

		if (!character.value) {
			toast.info("No character loaded. Please create a character to start the game.")
		} else {
			toast.success(`Welcome back, ${character.value.name}!`, { toastId: "welcome-back" })
		}


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

	const routes = character.value ? (
		<>
			<Route path="/" element={<WelcomeScreen />} />
			<Route path="/create-character" element={<CharacterCreationScreen />} />
			<Route path="/dungeon/" element={<DungeonEntrance />} />
			<Route path="/attack-wizard/" element={<Combat foe="wizard" backgroundImage={wizard} />} />
			<Route path="/greet-wizard/" element={<GreetWizard />} />
			<Route path="/proceed/" element={<HelpWizard />} />
			<Route path="/tunnels/" element={<TheThreeTunnels />} />
			<Route path="/tunnels/wave/" element={<Wave />} />
			<Route path="/tunnels/wave-deeper/" element={<WaveDeeper />} />
			<Route path="/tunnels/wave-deeperII/" element={<WaveDeeperII />} />
			<Route path="/tunnels/flame/" element={<Flame />} />
			<Route path="/tunnels/chest/" element={<Chest />} />
			<Route path="/tunnels/orb/" element={<Orb />} />
			<Route path="/tunnels/cavern/" element={<Cavern />} />
			<Route path="/tunnels/vision/" element={<Vision />} />
			<Route path="/tunnels/dry/" element={<Dry/>} />
			<Route path="/tunnels/east/" element={<East/>} />
			<Route path="/tunnels/skull/" element={<Skull/>} />
			<Route path="/tunnels/skullDeeper/" element={<SkullDeeper/>} />
			<Route path="/tunnels/west/" element={<West/>} />
			<Route path="/tunnels/flame-deeper/" element={<FlameDeeper/>} />
			<Route path="/tunnels/right-one/" element={<RightOne/>} />
			<Route path="/tunnels/right-two/" element={<RightTwo/>} />
			<Route path="/tunnels/left-door/" element={<LeftDoor/>} />
			<Route path="/tunnels/plasma/" element={<Plasma/>} />
		</>
	) : (
		<>
			<Route path="/create-character" element={<CharacterCreationScreen />} />
			<Route path="/*" element={<WelcomeScreen/>} />
		</>
	)

	return (
		<div className="app-container">
			<ToastContainer
				position="top-center"
				stacked
				hideProgressBar
				closeOnClick
				pauseOnHover
				theme="dark"
				transition={Zoom}
			/>
			<AnimatedRoutes durationMs={500}>
				{routes}
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
