import humanMaleWarriorImage from "assets/character/human-male-warrior.png"
import humanMaleWizardImage from "assets/character/human-male-wizard.png"
import humanMaleRogueImage from "assets/character/human-male-rogue.png"
import humanFemaleWarriorImage from "assets/character/human-female-warrior.png"
import humanFemaleWizardImage from "assets/character/human-female-wizard.png"
import humanFemaleRogueImage from "assets/character/human-female-rogue.png"
import elfMaleWarriorImage from "assets/character/elf-male-warrior.png"
import elfMaleWizardImage from "assets/character/elf-male-wizard.png"
import elfMaleRogueImage from "assets/character/elf-male-rogue.png"
import elfFemaleWarriorImage from "assets/character/elf-female-warrior.png"
import elfFemaleWizardImage from "assets/character/elf-female-wizard.png"
import elfFemaleRogueImage from "assets/character/elf-female-rogue.png"
import dwarfMaleWarriorImage from "assets/character/dwarf-male-warrior.png"
import dwarfMaleWizardImage from "assets/character/dwarf-male-wizard.png"
import dwarfMaleRogueImage from "assets/character/dwarf-male-rogue.png"
import dwarfFemaleWarriorImage from "assets/character/dwarf-female-warrior.png"
import dwarfFemaleWizardImage from "assets/character/dwarf-female-wizard.png"
import dwarfFemaleRogueImage from "assets/character/dwarf-female-rogue.png"
import { signal } from "@preact/signals-react"

export type CharacterRace = "human" | "elf" | "dwarf"
export type CharacterGender = "male" | "female"
export type CharacterClass = "warrior" | "wizard" | "rogue"

export type InventoryItem = {
	id: string
	name: string
	quantity: number
	identified: boolean
}

export type CharacterRecord = {
	name: string
	race: CharacterRace
	gender: CharacterGender
	characterClass: CharacterClass
	inventory: InventoryItem[]
	visitedScenes: string[]
	hitPoints: number
}

export const DefaultCharacterRecord: CharacterRecord = {
	name: "",
	race: "human",
	gender: "male",
	characterClass: "warrior",
	inventory: [],
	visitedScenes: [],
	hitPoints: 100,
}

export const images = {
	human: {
		male: {
			warrior: humanMaleWarriorImage,
			wizard: humanMaleWizardImage,
			rogue: humanMaleRogueImage,
		},
		female: {
			warrior: humanFemaleWarriorImage,
			wizard: humanFemaleWizardImage,
			rogue: humanFemaleRogueImage,
		},
	},
	elf: {
		male: {
			warrior: elfMaleWarriorImage,
			wizard: elfMaleWizardImage,
			rogue: elfMaleRogueImage,
		},
		female: {
			warrior: elfFemaleWarriorImage,
			wizard: elfFemaleWizardImage,
			rogue: elfFemaleRogueImage,
		},
	},
	dwarf: {
		male: {
			warrior: dwarfMaleWarriorImage,
			wizard: dwarfMaleWizardImage,
			rogue: dwarfMaleRogueImage,
		},
		female: {
			warrior: dwarfFemaleWarriorImage,
			wizard: dwarfFemaleWizardImage,
			rogue: dwarfFemaleRogueImage,
		},
	},
}

export const saveCharacterToLocalStorage = (characterRecord: CharacterRecord) => {
	localStorage.setItem(
		characterRecord.name,
		JSON.stringify(characterRecord)
	)
	localStorage.setItem("currentCharacterName", characterRecord.name)
	const allCharacterNames = JSON.parse(localStorage.getItem("allCharacterNames") || "[]") as string[]
	if (!allCharacterNames.includes(characterRecord.name)) {
		allCharacterNames.push(characterRecord.name)
		allCharacterNames.sort()
		localStorage.setItem("allCharacterNames", JSON.stringify(allCharacterNames))
	}
}

const currentCharacterName = localStorage.getItem("currentCharacterName")
const currentCharacterJSON = currentCharacterName
	? localStorage.getItem(currentCharacterName)
	: undefined
export const character = signal<CharacterRecord | undefined>(currentCharacterJSON ? JSON.parse(currentCharacterJSON) as CharacterRecord : undefined)

