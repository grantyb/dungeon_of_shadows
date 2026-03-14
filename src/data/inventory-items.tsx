import type { InventoryItemType } from "./character-data";

export const InventoryItem: Record<string, { unidentified: InventoryItemType, identified: InventoryItemType }> = {
	"Scroll": {
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
		}
	},
	"FireOrb": {
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
		}
	}
}
