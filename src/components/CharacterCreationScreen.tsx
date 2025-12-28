import React, { useState } from "react"

import {
	images,
	type CharacterClass,
	type CharacterGender,
	type CharacterRace,
} from "../data/character-images"
import Button from "./Button"

const CharacterCreationScreen: React.FC = () => {
	const [characterRace, setCharacterRace] = useState<CharacterRace>("human")
	const [characterGender, setCharacterGender] =
		useState<CharacterGender>("male")
	const [characterClass, setCharacterClass] =
		useState<CharacterClass>("warrior")

	const selectRace = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setCharacterRace(event.target.value as CharacterRace)
	}

	const selectGender = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setCharacterGender(event.target.value as CharacterGender)
	}

	const selectClass = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setCharacterClass(event.target.value as CharacterClass)
	}

	const image = images[characterRace][characterGender][characterClass]

	return (
		<div
			className="background-image"
			style={{ backgroundImage: `url(${image})` }}
		>
			<div className="main-title">
				<h1>Create character</h1>
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
					<Button type="submit" label="Create character" />
				</form>
			</div>
		</div>
	)
}

export default CharacterCreationScreen
