import React, { useState } from "react"

import warriorImage from "../assets/character/warrior.png"
import wizardImage from "../assets/character/wizard.png"
import rogueImage from "../assets/character/rogue.png"

const CharacterCreationScreen: React.FC = () => {
	const [characterClass, setCharacterClass] = useState<string>("warrior")

	const selectClass = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setCharacterClass(event.target.value)
	}

	const image =
		characterClass === "mage"
			? wizardImage
			: characterClass === "rogue"
			? rogueImage
			: warriorImage

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
						Class:
						<select name="class" onChange={selectClass}>
							<option value="warrior">Warrior</option>
							<option value="mage">Mage</option>
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
