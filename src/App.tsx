
import introductionMusic from './assets/dungeon/introduction.m4a';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';

function App() {
	useEffect(() => {
		const ctx = new AudioContext();
		const gainNode = ctx.createGain();
		gainNode.gain.value = 0.5; // 50%
		gainNode.connect(ctx.destination);
		let source;

		fetch(introductionMusic)
			.then(r => r.arrayBuffer())
			.then(b => ctx.decodeAudioData(b))
			.then(buffer => {
				source = ctx.createBufferSource();
				source.buffer = buffer;
				source.loop = true;
				source.connect(ctx.destination);
				source.start();
			});
	}, []);
	return (
		<Routes>
			<Route path="/" element={<WelcomeScreen />} />
		</Routes>
	);
}

export default App;
