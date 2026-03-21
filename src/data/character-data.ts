import dwarfFemaleRogueImage from "assets/character/dwarf-female-rogue.png"
import dwarfFemaleWarriorImage from "assets/character/dwarf-female-warrior.png"
import dwarfFemaleWizardImage from "assets/character/dwarf-female-wizard.png"
import dwarfMaleRogueImage from "assets/character/dwarf-male-rogue.png"
import dwarfMaleWarriorImage from "assets/character/dwarf-male-warrior.png"
import dwarfMaleWizardImage from "assets/character/dwarf-male-wizard.png"
import elfFemaleRogueImage from "assets/character/elf-female-rogue.png"
import elfFemaleWarriorImage from "assets/character/elf-female-warrior.png"
import elfFemaleWizardImage from "assets/character/elf-female-wizard.png"
import elfMaleRogueImage from "assets/character/elf-male-rogue.png"
import elfMaleWarriorImage from "assets/character/elf-male-warrior.png"
import elfMaleWizardImage from "assets/character/elf-male-wizard.png"
import humanFemaleRogueImage from "assets/character/human-female-rogue.png"
import humanFemaleWarriorImage from "assets/character/human-female-warrior.png"
import humanFemaleWizardImage from "assets/character/human-female-wizard.png"
import humanMaleRogueImage from "assets/character/human-male-rogue.png"
import humanMaleWarriorImage from "assets/character/human-male-warrior.png"
import humanMaleWizardImage from "assets/character/human-male-wizard.png"
import React, { createContext, useContext, type JSX } from "react"
import type { DotEffect } from "./combat-data"
import { InventoryItem } from "./inventory-items"

export type InventoryItemType = {
	name: string
	description: JSX.Element
}

export type CharacterRace = "human" | "elf" | "dwarf"
export type CharacterGender = "male" | "female"
export type CharacterClass = "warrior" | "wizard" | "rogue"

export type InventoryItemId = keyof typeof InventoryItem

export type InventoryItem = {
	id: InventoryItemId
	identified: boolean
	quantity: number
}

export const ClassDefense: Record<CharacterClass, number> = {
	warrior: 30,
	wizard: 15,
	rogue: 20,
}

export const RaceBaseHp: Record<CharacterRace, number> = {
	dwarf: 120,
	elf: 80,
	human: 100,
}

export const ClassHpMultiplier: Record<CharacterClass, number> = {
	warrior: 2.0,
	rogue: 1.0,
	wizard: 0.8,
}

export type CharacterRecord = {
	name: string
	race: CharacterRace
	gender: CharacterGender
	characterClass: CharacterClass
	inventory: InventoryItem[]
	currentScene?: string
	visitedScenes: string[]
	hitPoints: number
}

export const GenderHpBonus: Record<CharacterGender, number> = {
	male: 0,
	female: -5,
}

export const GenderAccuracyBonus: Record<CharacterGender, number> = {
	male: 0,
	female: 5,
}

export function getMaxHp(record: CharacterRecord): number {
	return Math.floor((RaceBaseHp[record.race] + GenderHpBonus[record.gender]) * ClassHpMultiplier[record.characterClass])
}

export const DefaultCharacterRecord: CharacterRecord = {
	name: "",
	race: "human",
	gender: "male",
	characterClass: "warrior",
	inventory: [],
	visitedScenes: [],
	hitPoints: 200,
}

export type CharacterImage = {
	src: string
	brightness: number
}

export const images: Record<CharacterRace, Record<CharacterGender, Record<CharacterClass, CharacterImage>>> = {
	human: {
		male: {
			warrior: { src: humanMaleWarriorImage, brightness: 1.5 },
			wizard: { src: humanMaleWizardImage, brightness: 2.5 },
			rogue: { src: humanMaleRogueImage, brightness: 1.8 },
		},
		female: {
			warrior: { src: humanFemaleWarriorImage, brightness: 1.5 },
			wizard: { src: humanFemaleWizardImage, brightness: 3.5 },
			rogue: { src: humanFemaleRogueImage, brightness: 1.8 },
		},
	},
	elf: {
		male: {
			warrior: { src: elfMaleWarriorImage, brightness: 1.0 },
			wizard: { src: elfMaleWizardImage, brightness: 1.8 },
			rogue: { src: elfMaleRogueImage, brightness: 2.0 },
		},
		female: {
			warrior: { src: elfFemaleWarriorImage, brightness: 1.0 },
			wizard: { src: elfFemaleWizardImage, brightness: 1.8 },
			rogue: { src: elfFemaleRogueImage, brightness: 2 },
		},
	},
	dwarf: {
		male: {
			warrior: { src: dwarfMaleWarriorImage, brightness: 1.0 },
			wizard: { src: dwarfMaleWizardImage, brightness: 1.8 },
			rogue: { src: dwarfMaleRogueImage, brightness: 2.0 },
		},
		female: {
			warrior: { src: dwarfFemaleWarriorImage, brightness: 1.0 },
			wizard: { src: dwarfFemaleWizardImage, brightness: 1.8 },
			rogue: { src: dwarfFemaleRogueImage, brightness: 1.8 },
		},
	},
}

// --- Character Context ---

export type CombatState = {
	inCombat: boolean
	playerDots: DotEffect[]
	onPlayerDotsChange: (dots: DotEffect[]) => void
	foe: {
		name: string
		portrait: string
		currentHp: number
		maxHp: number
		dots: DotEffect[]
	}
}

export type CharacterContextType = {
	character: CharacterRecord | undefined
	preview: CharacterRecord | null
	setPreview: (preview: CharacterRecord | null) => void
	saveCharacter: (record: CharacterRecord) => void
	addToInventory: (itemId: InventoryItemId, quantity?: number) => void
	removeFromInventory: (itemId: InventoryItemId, quantity?: number) => boolean
	inventoryContains: (itemId: InventoryItemId) => boolean
	visit: (sceneId: string) => boolean
	identifyItem: (itemId: InventoryItemId) => boolean
	inventoryOpen: boolean
	setInventoryOpen: React.Dispatch<React.SetStateAction<boolean>>
	combatState: CombatState | null
	setCombatState: (state: CombatState | null) => void
}

export const CharacterContext = createContext<CharacterContextType | null>(null)

export function useCharacter() {
	const ctx = useContext(CharacterContext)
	if (!ctx) throw new Error("useCharacter must be used within CharacterProvider")
	return ctx
}

export function loadCharacterFromStorage(): CharacterRecord | undefined {
	const name = localStorage.getItem("currentCharacterName")
	if (!name) return undefined
	const json = localStorage.getItem(name)
	if (!json) return undefined
	return JSON.parse(json) as CharacterRecord
}

export function persistCharacter(record: CharacterRecord) {
	localStorage.setItem(record.name, JSON.stringify(record))
	localStorage.setItem("currentCharacterName", record.name)
	const allNames = JSON.parse(localStorage.getItem("allCharacterNames") || "[]") as string[]
	if (!allNames.includes(record.name)) {
		allNames.push(record.name)
		allNames.sort()
		localStorage.setItem("allCharacterNames", JSON.stringify(allNames))
	}
}
