import type { InventoryItemType } from "./character-data"
import type { CharacterClass } from "./character-data"

import scrollImg from "assets/items/scroll.png"
import fireOrbImg from "assets/items/fire-orb.png"
import healingPotionImg from "assets/items/healing-potion.png"
import cauterizingPotionImg from "assets/items/cauterizing-potion.png"
import dowsingPotionImg from "assets/items/dowsing-potion.png"
import antidotePotionImg from "assets/items/antidote-potion.png"
import mooncapLanternImg from "assets/items/mooncap-lantern.png"

export type ItemDefinition = {
	unidentified: InventoryItemType
	identified: InventoryItemType
	image: string
	expendable: boolean
	combatOnly: boolean
}

export const InventoryItem: Record<string, ItemDefinition> = {
	"Scroll": {
		image: scrollImg,
		expendable: false,
		combatOnly: false,
		unidentified: {
			name: "Ancient Scroll",
			description: <p>A scroll given to you by Gol-Ink the Wise.</p>,
		},
		identified: {
			name: "Map of the Dungeon",
			description: <>
				<p>A scroll given to you by Gol-Ink the Wise.</p>
				<p>Contains valuable knowledge about the dungeon.</p>
			</>,
		},
	},
	"FireOrb": {
		image: fireOrbImg,
		expendable: false,
		combatOnly: false,
		unidentified: {
			name: "Glowing Orb",
			description: <p>A mystical orb.</p>,
		},
		identified: {
			name: "Orb of Fire Protection",
			description: <>
				<p>A mystical orb pulsating with fiery energy.</p>
				<p>It protects the bearer from fire-based attacks.</p>
			</>,
		},
	},
	"HealingPotion": {
		image: healingPotionImg,
		expendable: true,
		combatOnly: false,
		unidentified: {
			name: "Healing Potion",
			description: <p>A vial of crimson liquid that restores health. Heals a random amount up to 50 HP.</p>,
		},
		identified: {
			name: "Healing Potion",
			description: <p>A vial of crimson liquid that restores health. Heals a random amount up to 50 HP.</p>,
		},
	},
	"CauterizingPotion": {
		image: cauterizingPotionImg,
		expendable: true,
		combatOnly: true,
		unidentified: {
			name: "Cauterizing Potion",
			description: <p>A thick, amber salve that instantly stops all bleeding effects.</p>,
		},
		identified: {
			name: "Cauterizing Potion",
			description: <p>A thick, amber salve that instantly stops all bleeding effects.</p>,
		},
	},
	"DowsingPotion": {
		image: dowsingPotionImg,
		expendable: true,
		combatOnly: true,
		unidentified: {
			name: "Dowsing Potion",
			description: <p>A cool, blue liquid that extinguishes all burning effects.</p>,
		},
		identified: {
			name: "Dowsing Potion",
			description: <p>A cool, blue liquid that extinguishes all burning effects.</p>,
		},
	},
	"AntidotePotion": {
		image: antidotePotionImg,
		expendable: true,
		combatOnly: true,
		unidentified: {
			name: "Antidote Potion",
			description: <p>A sharp, green tonic that neutralises all poison effects.</p>,
		},
		identified: {
			name: "Antidote Potion",
			description: <p>A sharp, green tonic that neutralises all poison effects.</p>,
		},
	},
	"MooncapLantern": {
		image: mooncapLanternImg,
		expendable: false,
		combatOnly: false,
		unidentified: {
			name: "Mooncap Lantern",
			description: <p>A silver-blue lantern grown from a glowing mushroom cap.</p>,
		},
		identified: {
			name: "Mooncap Lantern",
			description: <>
				<p>A gift from the elder myconids.</p>
				<p>It glows near hidden ways and kindred roots.</p>
			</>,
		},
	},
}

export const StartingInventory: Record<CharacterClass, { id: string; quantity: number }[]> = {
	warrior: [
		{ id: "HealingPotion", quantity: 30 },
		{ id: "CauterizingPotion", quantity: 2 },
		{ id: "DowsingPotion", quantity: 1 },
		{ id: "AntidotePotion", quantity: 1 },
	],
	wizard: [
		{ id: "HealingPotion", quantity: 50 },
		{ id: "CauterizingPotion", quantity: 1 },
		{ id: "DowsingPotion", quantity: 2 },
		{ id: "AntidotePotion", quantity: 1 },
	],
	rogue: [
		{ id: "HealingPotion", quantity: 40 },
		{ id: "CauterizingPotion", quantity: 1 },
		{ id: "DowsingPotion", quantity: 1 },
		{ id: "AntidotePotion", quantity: 2 },
	],
}
