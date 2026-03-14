import wizard from "assets/foes/wizard.png"
import plasmaBeast from "assets/dungeon/tunnels/plasma-beast.png"

import wizardVictoryImg from "assets/combat/wizard-victory.png"
import wizardDeathImg from "assets/combat/wizard-death.png"
import wizardFleeImg from "assets/combat/wizard-flee.png"
import plasmaBeastVictoryImg from "assets/combat/plasma-beast-victory.png"
import plasmaBeastDeathImg from "assets/combat/plasma-beast-death.png"
import plasmaBeastFleeImg from "assets/combat/plasma-beast-flee.png"

export type FoeOutcome = {
	route: string
	image: string
}

export type Foe = {
	name: string
	description: string
	hitpoints: number
	attack: number
	defense: number
	attackStrength: number
	backgroundImage: string
	victory: FoeOutcome
	death: FoeOutcome
	flee: FoeOutcome
}

export const Foes: Record<string, Foe> = {
	"wizard": {
		name: "Proclarus the Wise",
		description: "A powerful wizard with a staff and a long robe. Proclarus The Wise is a truly fearsome adversary!",
		backgroundImage: wizard,
		hitpoints: 100,
		attack: 100,
		defense: 5,
		attackStrength: 50,
		victory: { route: "/combat/wizard-victory", image: wizardVictoryImg },
		death: { route: "/combat/wizard-death", image: wizardDeathImg },
		flee: { route: "/combat/wizard-flee", image: wizardFleeImg },
	},
	"plasma-beast": {
		name: "Flaming Plasma Beast",
		description: "A terrifying creature of pure plasma energy, crackling with searing heat and malice.",
		backgroundImage: plasmaBeast,
		hitpoints: 100,
		attack: 50,
		defense: 20,
		attackStrength: 50,
		victory: { route: "/combat/plasma-beast-victory", image: plasmaBeastVictoryImg },
		death: { route: "/combat/plasma-beast-death", image: plasmaBeastDeathImg },
		flee: { route: "/combat/plasma-beast-flee", image: plasmaBeastFleeImg },
	},
}

export type FoeId = keyof typeof Foes
