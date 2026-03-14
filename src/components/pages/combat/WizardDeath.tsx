import img from "assets/combat/wizard-death.png"
import { CombatOutcome } from "./CombatOutcome"

export const WizardDeath = () => (
	<CombatOutcome
		backgroundImage={img}
		title="You Have Fallen"
		text={[
			"Proclarus the Wise unleashes a devastating spell. You crumple to the ground as arcane fire engulfs you.",
			"Your adventure ends here, brave soul.",
		]}
		continueRoute="/"
		continueLabel="Return to start"
	/>
)
