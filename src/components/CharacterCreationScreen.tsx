import React, { useState } from "react"

import humanMaleWarriorImage from "../assets/character/warrior.png"
import humanMaleWizardImage from "../assets/character/wizard.png"
import humanMaleRogueImage from "../assets/character/rogue.png"
import elfMaleWarriorImage from "../assets/character/warrior.png"
import elfMaleWizardImage from "../assets/character/wizard.png"
import elfMaleRogueImage from "../assets/character/rogue.png"
import dwarfMaleWarriorImage from "../assets/character/warrior.png"
import dwarfMaleWizardImage from "../assets/character/wizard.png"
import dwarfMaleRogueImage from "../assets/character/rogue.png"

import humanFemaleWarriorImage from "../assets/character/warrior.png"
import humanFemaleWizardImage from "../assets/character/wizard.png"
import humanFemaleRogueImage from "../assets/character/rogue.png"
import elfFemaleWarriorImage from "../assets/character/warrior.png"
import elfFemaleWizardImage from "../assets/character/wizard.png"
import elfFemaleRogueImage from "../assets/character/rogue.png"
import dwarfFemaleWarriorImage from "../assets/character/warrior.png"
import dwarfFemaleWizardImage from "../assets/character/wizard.png"
import dwarfFemaleRogueImage from "../assets/character/rogue.png"

const images = {
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

type CharacterClass = "warrior" | "wizard" | "rogue"
type CharacterRace = "human" | "elf" | "dwarf"
type CharacterGender = "male" | "female"

const CharacterCreationScreen: React.FC = () => {
	const [characterRace, setCharacterRace] = useState<string>("human")
	const [characterGender, setCharacterGender] = useState<string>("male")
	const [characterClass, setCharacterClass] = useState<string>("warrior")

	const selectRace = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setCharacterRace(event.target.value)
	}

	const selectGender = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setCharacterGender(event.target.value)
	}

	const selectClass = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setCharacterClass(event.target.value)
	}

	const image = images[characterRace as CharacterRace][characterGender as CharacterGender][characterClass as CharacterClass]

	return (
		<div
			className="background-image"
			style={{ backgroundImage: `url(${image})` }}
		>
			<div className="main-title">
				<h1>Create Character</h1>
			</div>
			<div className="character-creation-form">
				<form>
					<label>
						Character Name:
						<input type="text" name="name" />
					</label>
					<label>
						Race:
						<select name="race" onChange={selectRace}>
							<option value="human">Human</option>
							<option value="elf">Elf</option>
							<option value="dwarf">Dwarf</option>
						</select>
					</label>
					<label>
						Gender:
						<select name="gender" onChange={selectGender}>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</select>
					</label>
					<label>
						Class:
						<select name="class" onChange={selectClass}>
							<option value="warrior">Warrior</option>
							<option value="wizard">Wizard</option>
							<option value="rogue">Rogue</option>
						</select>
					</label>
					<button type="submit" tabIndex={0}>
						Create Character
					</button>
				</form>
			</div>
		</div>
	)
}

export default CharacterCreationScreen
