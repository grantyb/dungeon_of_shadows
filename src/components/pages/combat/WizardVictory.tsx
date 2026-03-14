import img from "assets/combat/wizard-victory.png"
import { CombatOutcome } from "./CombatOutcome"

export const WizardVictory = () => (
	<CombatOutcome
		backgroundImage={img}
		title="Victory!"
		text={[
			"Proclarus the Wise falls to his knees, his staff clattering to the ground. The arcane energy around him fades.",
			"You have defeated the wizard. The path forward is yours.",
		]}
		continueRoute="/proceed/"
		continueLabel="Proceed"
	/>
)
