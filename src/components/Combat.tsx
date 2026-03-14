import React, { useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import Button from "components/Button"
import { Foes, type FoeId } from "data/foe-data"
import { character, ClassStats, saveCharacterToLocalStorage } from "data/character-data"

interface CombatProps extends React.PropsWithChildren {
	foe: FoeId
}

type CombatLogEntry = {
	text: string
	type: "player" | "foe" | "info"
}

function rollDamage(attackStrength: number): number {
	return Math.floor(Math.random() * attackStrength) + 1
}

function rollHit(accuracy: number): boolean {
	return Math.random() * 100 < accuracy
}

const Combat: React.FC<CombatProps> = (props) => {
	const foe = Foes[props.foe]
	const navigate = useNavigate()
	const charRecord = character.value
	const classStats = charRecord ? ClassStats[charRecord.characterClass] : null

	const [foeHp, setFoeHp] = useState(foe.hitpoints)
	const [playerHp, setPlayerHp] = useState(charRecord?.hitPoints ?? 100)
	const [log, setLog] = useState<CombatLogEntry[]>([
		{ text: `You face ${foe.name}!`, type: "info" },
		{ text: foe.description, type: "info" },
	])
	const [combatOver, setCombatOver] = useState(false)

	const addLog = useCallback((entry: CombatLogEntry) => {
		setLog((prev) => [...prev, entry])
	}, [])

	const foeAttacks = useCallback((currentPlayerHp: number): number => {
		if (!classStats) return currentPlayerHp

		const foeHits = rollHit(foe.attack)
		if (!foeHits) {
			addLog({ text: `${foe.name} attacks but misses!`, type: "foe" })
			return currentPlayerHp
		}

		const playerBlocks = rollHit(classStats.defense)
		const rawDamage = rollDamage(foe.attackStrength)

		if (playerBlocks) {
			const blockedDamage = Math.floor(rawDamage / 2)
			const newHp = Math.max(0, currentPlayerHp - blockedDamage)
			addLog({ text: `${foe.name} hits you but you partially block! You take ${blockedDamage} damage.`, type: "foe" })
			return newHp
		} else {
			const newHp = Math.max(0, currentPlayerHp - rawDamage)
			addLog({ text: `${foe.name} hits you for ${rawDamage} damage!`, type: "foe" })
			return newHp
		}
	}, [foe, classStats, addLog])

	const handleAttack = useCallback((attackName: string) => {
		if (combatOver || !classStats || !charRecord) return

		const playerHits = rollHit(classStats.attack)
		if (!playerHits) {
			addLog({ text: `You use ${attackName} but miss!`, type: "player" })
		} else {
			const foeBlocks = rollHit(foe.defense)
			const rawDamage = rollDamage(classStats.attackStrength)

			if (foeBlocks) {
				const blockedDamage = Math.floor(rawDamage / 2)
				const newFoeHp = Math.max(0, foeHp - blockedDamage)
				addLog({ text: `You use ${attackName}! ${foe.name} blocks partially — ${blockedDamage} damage dealt.`, type: "player" })
				setFoeHp(newFoeHp)

				if (newFoeHp <= 0) {
					addLog({ text: `${foe.name} has been slain!`, type: "info" })
					setCombatOver(true)
					return
				}
			} else {
				const newFoeHp = Math.max(0, foeHp - rawDamage)
				addLog({ text: `You use ${attackName} and hit for ${rawDamage} damage!`, type: "player" })
				setFoeHp(newFoeHp)

				if (newFoeHp <= 0) {
					addLog({ text: `${foe.name} has been slain!`, type: "info" })
					setCombatOver(true)
					return
				}
			}
		}

		// Foe's turn
		const hpAfterFoeAttack = foeAttacks(playerHp)
		setPlayerHp(hpAfterFoeAttack)

		if (hpAfterFoeAttack <= 0) {
			addLog({ text: "You have fallen in combat...", type: "info" })
			setCombatOver(true)
			charRecord.hitPoints = 0
			saveCharacterToLocalStorage(charRecord)
		} else {
			charRecord.hitPoints = hpAfterFoeAttack
			saveCharacterToLocalStorage(charRecord)
		}
	}, [combatOver, classStats, charRecord, foe, foeHp, playerHp, foeAttacks, addLog])

	const handleFlee = useCallback(() => {
		if (combatOver || !classStats || !charRecord) return

		addLog({ text: "You attempt to flee!", type: "player" })

		// Attack of opportunity
		const hpAfterOpportunity = foeAttacks(playerHp)
		setPlayerHp(hpAfterOpportunity)

		if (hpAfterOpportunity <= 0) {
			addLog({ text: "You were struck down while fleeing...", type: "info" })
			setCombatOver(true)
			charRecord.hitPoints = 0
			saveCharacterToLocalStorage(charRecord)
		} else {
			addLog({ text: "You manage to escape!", type: "info" })
			setCombatOver(true)
			charRecord.hitPoints = hpAfterOpportunity
			saveCharacterToLocalStorage(charRecord)
		}
	}, [combatOver, classStats, charRecord, playerHp, foeAttacks, addLog])

	const handleContinue = () => {
		if (playerHp <= 0) {
			navigate(foe.death.route)
		} else if (foeHp <= 0) {
			navigate(foe.victory.route)
		} else {
			// Fled successfully
			navigate(foe.flee.route)
		}
	}

	if (!charRecord || !classStats) {
		return <p>No character loaded.</p>
	}

	return (
		<div
			className="background-image"
			style={{ backgroundImage: `url(${foe.backgroundImage})` }}
		>
			<div className="main-title">
				<h1>Combat: {foe.name}</h1>
			</div>

			<div className="conversation" style={{ maxWidth: "40%" }}>
				<div className="combat-status">
					<p><strong>Your HP:</strong> {playerHp}</p>
					<p><strong>{foe.name} HP:</strong> {foeHp} / {foe.hitpoints}</p>
				</div>

				<div className="combat-log">
					{log.map((entry, i) => (
						<p key={i} className={`combat-log-${entry.type}`}>
							{entry.text}
						</p>
					))}
				</div>

				{!combatOver ? (
					<>
						<p>Choose your attack:</p>
						<span className="conversation-controls">
							{classStats.attacks.map((attackName) => (
								<Button
									key={attackName}
									onClick={() => handleAttack(attackName)}
									label={attackName}
								/>
							))}
							<Button onClick={handleFlee} label="Flee" />
						</span>
					</>
				) : (
					<span className="conversation-controls">
						<Button onClick={handleContinue} label="Continue" />
					</span>
				)}
			</div>
			{props.children}
		</div>
	)
}

export default Combat
