import wizard from "assets/foes/wizard.webp"
import plasmaBeast from "assets/dungeon/tunnels/plasma-beast.webp"
import portAttack from "assets/dungeon/tunnels/port-attack.webp"

import wizardVictoryImg from "assets/combat/wizard-victory.png"
import wizardDeathImg from "assets/combat/wizard-death.webp"
import wizardFleeImg from "assets/combat/wizard-flee.webp"
import plasmaBeastVictoryImg from "assets/combat/plasma-beast-victory.webp"
import plasmaBeastDeathImg from "assets/combat/plasma-beast-death.webp"
import plasmaBeastFleeImg from "assets/combat/plasma-beast-flee.webp"
import portDefeatedImg from "assets/dungeon/tunnels/port-defeated.webp"

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
	canFlee?: boolean
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
	"port": {
		name: "The Port",
		description: "A door-shaped horror with six crushing tentacles and a poisoned maw behind the threshold.",
		backgroundImage: portAttack,
		portrait: { image: portAttack, scale: 100, position: "-24px 4px" },
		hitpoints: 180,
		defense: 18,
		resistances: {
			...defaultResistances,
			poison: 0,
			fire: 130,
			water: 70,
			cold: 85,
		},
		attacks: [
			{
				name: "Venomous Bite",
				accuracy: 70,
				strength: 42,
				damageMix: { poison: 0.7, bleeding: 0.3 },
				cooldown: 0,
				dotFalloff: { poison: 0.4, bleeding: 0.6 },
			},
			{
				name: "Crushing Tentacles",
				accuracy: 65,
				strength: 58,
				damageMix: { crushing: 0.8, bleeding: 0.2 },
				cooldown: 1,
				dotFalloff: { bleeding: 0.6 },
			},
			{
				name: "Splintering Maw",
				accuracy: 55,
				strength: 70,
				damageMix: { bleeding: 0.5, crushing: 0.3, poison: 0.2 },
				cooldown: 3,
				dotFalloff: { bleeding: 0.5, poison: 0.5 },
			},
		],
		canFlee: false,
		victory: { route: "/combat/port-victory", image: portDefeatedImg },
		death: { route: "/combat/port-death", image: portAttack },
		flee: { route: "/tunnels/port-fight/", image: portAttack },
	},
}

export type FoeId = keyof typeof Foes
