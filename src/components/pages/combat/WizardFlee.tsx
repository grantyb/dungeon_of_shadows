import img from "assets/combat/wizard-flee.png"
import { CombatOutcome } from "./CombatOutcome"

export const WizardFlee = () => (
	<CombatOutcome
		backgroundImage={img}
		title="Escaped!"
		text={[
			"You turn and sprint away from Gol-Ink the Wise. A bolt of energy crackles past you as you flee.",
			"You retreat to the dungeon entrance, shaken but alive.",
		]}
		continueRoute="/dungeon/"
		continueLabel="Back to the entrance"
	/>
)
