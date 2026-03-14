import img from "assets/combat/plasma-beast-victory.png"
import { CombatOutcome } from "./CombatOutcome"

export const PlasmaBeastVictory = () => (
	<CombatOutcome
		backgroundImage={img}
		title="Victory!"
		text={[
			"The Flaming Plasma Beast lets out a final, agonised screech as its fiery form collapses into a shower of embers.",
			"You stand victorious, singed but alive. The tunnel ahead is clear.",
		]}
		continueRoute="/tunnels/flame-deeper/"
		continueLabel="Continue deeper"
	/>
)
