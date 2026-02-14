export type Foe = {
	name: string
	description: string
	hitpoints: number
	attack: number
	defense: number
}

export const Foes: Record<string, Foe> = {
	"wizard": {
		name: "Proclarus the Wise",
		description: "A powerful wizard with a staff and a long robe. Proclarus The Wise is a truly fearsome adversary!",
		hitpoints: 100,
		attack: 100,
		defense: 5,
	},
}

export type FoeId = keyof typeof Foes

