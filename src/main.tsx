
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CharacterProvider } from 'data/CharacterContext';
import App from './App';
import "./css/index.css"

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<CharacterProvider>
				<App />
			</CharacterProvider>
		</BrowserRouter>
	</StrictMode>,
)
