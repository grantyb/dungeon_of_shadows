import React, { useState } from "react"

import Button from "components/Button"
import {
	DefaultCharacterRecord,
	images,
	saveCharacterToLocalStorage,
	type CharacterRecord,
} from "data/character-data"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import ButtonGroup from "./ButtonGroup"
import dungeonEntrance from "assets/dungeon/entrance.png"

const LoadCharacterScreen: React.FC = () => {
	const navigate = useNavigate()

	const [characterRecord, setCharacterRecord] = useState<CharacterRecord | undefined>()

	const image = characterRecord ? images[characterRecord.race][characterRecord.gender][characterRecord.characterClass] : dungeonEntrance

	const savedCharacters: string[] = JSON.parse(localStorage.getItem("allCharacterNames") || "[]")
	const selectCharacter = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const characterName = event.target.value
		const characterRecordJSON = localStorage.getItem(characterName)
		const selectedCharacterRecord: CharacterRecord = characterRecordJSON ? JSON.parse(characterRecordJSON) : undefined
		setCharacterRecord(selectedCharacterRecord)
		if (selectedCharacterRecord) {
			toast.success(`Selected ${selectedCharacterRecord.gender} ${selectedCharacterRecord.race} ${selectedCharacterRecord.characterClass}: ${selectedCharacterRecord.name}\nCurrent location: ${selectedCharacterRecord.currentScene}`)
		}
	}

	const loadCharacter = (event: React.ChangeEvent<HTMLSelectElement>) => {
		event.preventDefault()
		if (!characterRecord) {
			toast.error("Please select a character to load.")
			return
		}
		saveCharacterToLocalStorage(characterRecord)
		toast.success(`Loaded character: ${characterRecord.name}`)
		navigate(characterRecord.currentScene || "/")
	}

	return (
		<div
			className="background-image"
			style={{ backgroundImage: `url(${image})` }}
		>
			<div className="main-title">
				<h1>Load character</h1>
			</div>
			<div className="character-creation-form">
				{savedCharacters.length === 0 ? (
					<>
						<p>No saved characters found. Please create a character first.</p>
						<ButtonGroup>
							<Button label="Cancel" onClick={() => navigate("/")} />
						</ButtonGroup>
					</>
				) : (
					<form>
						<label>
							Choose character:
								<select name="character" onChange={selectCharacter}>
									<option value=""></option>
									{savedCharacters
										.sort((a, b) => a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase()))
										.map((characterName) => (
									<option key={characterName} value={characterName}>
										{characterName}
									</option>
								))}
							</select>
						</label>
						<ButtonGroup>
							<Button label="Cancel" onClick={() => navigate("/")} />
							<Button
								label="Load character"
								onClick={loadCharacter}
							/>
						</ButtonGroup>
					</form>
				)}
			</div>
		</div>
	)
}

export default LoadCharacterScreen
