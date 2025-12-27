import React from "react"

import { useNavigate } from "react-router-dom"
import dungeonEntrance from "../assets/dungeon/entrance.png"

const CharacterCreationScreen: React.FC = () => {
	const navigate = useNavigate()

	return (
		<div className="background-image" style={{ backgroundImage: `url(${dungeonEntrance})` }}>
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
						<select name="class">
							<option disabled>Select…</option>
							<option value="warrior">Warrior</option>
							<option value="mage">Mage</option>
							<option value="rogue">Rogue</option>
						</select>
					</label>
					<button type="submit" tabIndex={0}>Create Character</button>
				</form>
			</div>
		</div>
	)
}

export default CharacterCreationScreen
