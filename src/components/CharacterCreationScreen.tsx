import React, { useState } from "react"

import Button from "components/Button"
import {
	DefaultCharacterRecord,
	images,
	saveCharacterToLocalStorage,
	type CharacterClass,
	type CharacterGender,
	type CharacterRace,
} from "data/character-data"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import ButtonGroup from "./ButtonGroup"

const CharacterCreationScreen: React.FC = () => {
	const [characterRecord, setCharacterRecord] = useState(
		DefaultCharacterRecord
	)
	const navigate = useNavigate()

	const selectRace = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setCharacterRecord((prev) => ({
			...prev,
			race: event.target.value as CharacterRace,
		}))
	}

	const selectGender = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setCharacterRecord((prev) => ({
			...prev,
			gender: event.target.value as CharacterGender,
		}))
	}

	const selectClass = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setCharacterRecord((prev) => ({
			...prev,
			characterClass: event.target.value as CharacterClass,
		}))
	}
	const setCharacterName = (name: string) => {
		setCharacterRecord((prev) => ({ ...prev, name }))
	}

	const saveCharacter = () => {
		if (characterRecord.name.trim() === "") {
			toast.error("Please enter a character name.")
			return
		}
		const existingCharacterRecord = localStorage.getItem(
			characterRecord.name
		)
		if (existingCharacterRecord) {
			if (
				!confirm(
					`A character named ${characterRecord.name} already exists. Would you like to overwrite it?`
				)
			) {
				return
			}
		}
		saveCharacterToLocalStorage(characterRecord)
		navigate("/")
		toast.success("Character saved successfully!")
	}

	const image =
		images[characterRecord.race][characterRecord.gender][
			characterRecord.characterClass
		]
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
						<input
							type="text"
							value={characterRecord.name}
							onChange={(e) => setCharacterName(e.target.value)}
						/>
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
					<ButtonGroup>
						<Button label="Cancel" onClick={() => navigate("/")} />
						<Button
							label="Save character"
							onClick={saveCharacter}
						/>
					</ButtonGroup>
				</form>
			</div>
		</div>
	)
}

export default CharacterCreationScreen
