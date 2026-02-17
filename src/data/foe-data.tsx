import wizard from "assets/foes/wizard.png"

export type Foe = {
	name: string
	description: string
	hitpoints: number
	attack: number
	defense: number
	backgroundImage: string
}

export const Foes: Record<string, Foe> = {
	"wizard": {
		name: "Proclarus the Wise",
		description: "A powerful wizard with a staff and a long robe. Proclarus The Wise is a truly fearsome adversary!",
		backgroundImage: wizard,
		hitpoints: 100,
		attack: 100,
		defense: 5,
	},
}

export type FoeId = keyof typeof Foes

