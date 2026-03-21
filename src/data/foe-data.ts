import wizard from "assets/foes/wizard.png"
import plasmaBeast from "assets/dungeon/tunnels/plasma-beast.png"

import wizardVictoryImg from "assets/combat/wizard-victory.png"
import wizardDeathImg from "assets/combat/wizard-death.png"
import wizardFleeImg from "assets/combat/wizard-flee.png"
import plasmaBeastVictoryImg from "assets/combat/plasma-beast-victory.png"
import plasmaBeastDeathImg from "assets/combat/plasma-beast-death.png"
import plasmaBeastFleeImg from "assets/combat/plasma-beast-flee.png"

import { defaultResistances, type FoeAttack, type Resistances } from "./combat-data"

export type FoeOutcome = {
	route: string
	image: string
}

export type FoePortrait = {
	image: string
	scale: number
	position: string
}

export type Foe = {
	name: string
	description: string
	hitpoints: number
	defense: number
	backgroundImage: string
	portrait: FoePortrait
	resistances: Resistances
	attacks: FoeAttack[]
	victory: FoeOutcome
	death: FoeOutcome
	flee: FoeOutcome
}

export const Foes: Record<string, Foe> = {
	"wizard": {
		name: "Gol-Ink the Wise",
		description: "A powerful wizard with a staff and a long robe. Gol-Ink the Wise is a truly fearsome adversary!",
		backgroundImage: wizard,
		portrait: { image: wizard, scale: 72, position: "0px 12px" },
		hitpoints: 1000,
		defense: 5,
		resistances: {
			bleeding: 0,
			crushing: 0,
			fire: 0,
			cold: 0,
			electricity: 0,
			poison: 0,
			water: 0,
		},
		attacks: [
			{
				name: "Arcane Bolt",
				accuracy: 100,
				strength: 45,
				damageMix: { electricity: 0.5, cold: 0.5 },
				cooldown: 0,
				dotFalloff: { cold: 0.6 },
			},
			{
				name: "Meteor Strike",
				accuracy: 100,
				strength: 65,
				damageMix: { fire: 0.6, crushing: 0.4 },
				cooldown: 2,
				dotFalloff: { fire: 0.5 },
			},
		],
		victory: { route: "/combat/wizard-victory", image: wizardVictoryImg },
		death: { route: "/combat/wizard-death", image: wizardDeathImg },
		flee: { route: "/combat/wizard-flee", image: wizardFleeImg },
	},
	"plasma-beast": {
		name: "Flaming Plasma Beast",
		description: "A terrifying creature of pure plasma energy, crackling with searing heat and malice.",
		backgroundImage: plasmaBeast,
		portrait: { image: plasmaBeast, scale: 100, position: "-27px 5px" },
		hitpoints: 100,
		defense: 20,
		resistances: {
			...defaultResistances,
			fire: 0,
			electricity: 50,
			water: 200,
			cold: 150,
		},
		attacks: [
			{
				name: "Plasma Strike",
				accuracy: 50,
				strength: 50,
				damageMix: { fire: 0.6, electricity: 0.4 },
				cooldown: 0,
				dotFalloff: { fire: 0.5, electricity: 0.7 },
			},
			{
				name: "Inferno Burst",
				accuracy: 40,
				strength: 70,
				damageMix: { fire: 0.9, crushing: 0.1 },
				cooldown: 3,
				dotFalloff: { fire: 0.4 },
			},
		],
		victory: { route: "/combat/plasma-beast-victory", image: plasmaBeastVictoryImg },
		death: { route: "/combat/plasma-beast-death", image: plasmaBeastDeathImg },
		flee: { route: "/combat/plasma-beast-flee", image: plasmaBeastFleeImg },
	},
}

export type FoeId = keyof typeof Foes
