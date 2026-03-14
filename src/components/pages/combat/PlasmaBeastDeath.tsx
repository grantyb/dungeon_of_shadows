import img from "assets/combat/plasma-beast-death.png"
import { CombatOutcome } from "./CombatOutcome"

export const PlasmaBeastDeath = () => (
	<CombatOutcome
		backgroundImage={img}
		title="You Have Fallen"
		text={[
			"The Flaming Plasma Beast's searing energy overwhelms you. Your vision fades as the heat consumes everything.",
			"Your adventure ends here, brave soul.",
		]}
		continueRoute="/"
		continueLabel="Return to start"
	/>
)
