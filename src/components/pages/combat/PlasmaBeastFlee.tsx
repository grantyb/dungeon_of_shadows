import img from "assets/combat/plasma-beast-flee.png"
import { CombatOutcome } from "./CombatOutcome"

export const PlasmaBeastFlee = () => (
	<CombatOutcome
		backgroundImage={img}
		title="Escaped!"
		text={[
			"You turn and run from the Flaming Plasma Beast, its scorching tendrils lashing at your back as you flee.",
			"Battered but alive, you retreat to the tunnel entrance.",
		]}
		continueRoute="/tunnels/"
		continueLabel="Back to the tunnels"
	/>
)
