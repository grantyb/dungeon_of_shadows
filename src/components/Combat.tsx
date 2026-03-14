import React, { useState, useCallback, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Button from "components/Button"
import { Foes, type FoeId } from "data/foe-data"
import { useCharacter, ClassDefense } from "data/character-data"
import {
	ClassAttacks,
	RaceResistances,
	calculateDamage,
	tickDots,
	rollHit,
	type Attack,
	type DotEffect,
} from "data/combat-data"

interface CombatProps extends React.PropsWithChildren {
	foe: FoeId
}

type CombatLogEntry = {
	text: string
	type: "player" | "foe" | "info" | "round"
}

function rollHitCheck(accuracy: number): boolean {
	return rollHit(accuracy)
}

function rollDamage(strength: number): number {
	return Math.floor(Math.random() * strength) + 1
}

const Combat: React.FC<CombatProps> = (props) => {
	const foe = Foes[props.foe]
	const navigate = useNavigate()
	const { character: charRecord, saveCharacter, setCombatState } = useCharacter()
	const classAttacks = charRecord ? ClassAttacks[charRecord.characterClass] : null
	const classDefense = charRecord ? ClassDefense[charRecord.characterClass] : 0
	const playerResistances = charRecord ? RaceResistances[charRecord.race] : null

	const playerHp = charRecord?.hitPoints ?? 0

	const [foeHp, setFoeHp] = useState(foe.hitpoints)
	const [log, setLog] = useState<CombatLogEntry[]>([
		{ text: `You face ${foe.name}!`, type: "info" },
		{ text: foe.description, type: "info" },
	])
	const [combatOver, setCombatOver] = useState(false)
	const [round, setRound] = useState(0)

	// Cooldown tracking: maps attack name -> round when it becomes available
	const [playerCooldowns, setPlayerCooldowns] = useState<Record<string, number>>({})
	const [foeCooldowns, setFoeCooldowns] = useState<Record<string, number>>({})

	// DoT effects on each target
	const [playerDots, setPlayerDots] = useState<DotEffect[]>([])
	const [foeDots, setFoeDots] = useState<DotEffect[]>([])

	const logEndRef = useRef<HTMLDivElement>(null)
	const logQueueRef = useRef<CombatLogEntry[]>([])
	const [animating, setAnimating] = useState(false)

	// Register combat state so the App-level InventoryPanel can use combat potions
	useEffect(() => {
		setCombatState({
			inCombat: !combatOver,
			playerDots,
			onPlayerDotsChange: setPlayerDots,
		})
		return () => { setCombatState(null) }
	}, [combatOver, playerDots, charRecord, saveCharacter, setCombatState])

	useEffect(() => {
		logEndRef.current?.scrollIntoView({ behavior: "smooth" })
	}, [log])

	const drainQueue = useCallback(() => {
		const entry = logQueueRef.current.shift()
		if (!entry) {
			setAnimating(false)
			return
		}
		setLog((prev) => [...prev, entry])
		const delay = entry.type === "round" ? 1000 : 1600
		setTimeout(drainQueue, delay)
	}, [])

	const addLogs = useCallback((entries: CombatLogEntry[]) => {
		logQueueRef.current.push(...entries)
		if (!animating) {
			setAnimating(true)
			drainQueue()
		}
	}, [animating, drainQueue])

	const getCooldownRemaining = (cooldowns: Record<string, number>, attackName: string, currentRound: number): number => {
		const availableAt = cooldowns[attackName] ?? 0
		return Math.max(0, availableAt - currentRound)
	}

	const pickFoeAttack = useCallback((currentRound: number, currentFoeCooldowns: Record<string, number>): Attack | null => {
		const available = foe.attacks.filter((a) => {
			const availableAt = currentFoeCooldowns[a.name] ?? 0
			return currentRound >= availableAt
		})
		if (available.length === 0) return null
		return available[Math.floor(Math.random() * available.length)]
	}, [foe.attacks])

	const handleAttack = useCallback((attack: Attack) => {
		if (combatOver || !charRecord || !playerResistances || !classAttacks) return

		const currentRound = round
		const nextRound = currentRound + 1
		const newLogs: CombatLogEntry[] = [
			{ text: `Round ${nextRound}`, type: "round" },
		]

		// Check cooldown
		if (getCooldownRemaining(playerCooldowns, attack.name, currentRound) > 0) return

		// Set cooldown for this attack
		const newPlayerCooldowns = { ...playerCooldowns }
		if (attack.cooldown > 0) {
			newPlayerCooldowns[attack.name] = nextRound + attack.cooldown
		}

		// --- Player's attack ---
		const playerHits = rollHitCheck(attack.accuracy)
		let newFoeHp = foeHp
		let newFoeDots = [...foeDots]

		if (!playerHits) {
			newLogs.push({ text: `You use ${attack.name} but miss!`, type: "player" })
		} else {
			const foeBlocks = rollHitCheck(foe.defense)
			const rawDamage = rollDamage(attack.strength)
			const result = calculateDamage(rawDamage, attack.damageMix, foe.resistances, foeBlocks, attack.dotFalloff)

			newFoeHp = Math.max(0, foeHp - result.total)

			const blockText = foeBlocks ? " (partially blocked)" : ""
			newLogs.push({
				text: `You use ${attack.name}${blockText}: ${result.total} damage [${result.breakdown}]`,
				type: "player",
			})

			if (result.dots.length > 0) {
				newFoeDots = [...newFoeDots, ...result.dots]
				newLogs.push({
					text: `${foe.name} is afflicted by ${result.dots.map((d) => d.type).join(" and ")}!`,
					type: "player",
				})
			}

			if (newFoeHp <= 0) {
				newLogs.push({ text: `${foe.name} has been slain!`, type: "info" })
				setFoeHp(0)
				setFoeDots(newFoeDots)
				setPlayerCooldowns(newPlayerCooldowns)
				setRound(nextRound)
				addLogs(newLogs)
				setCombatOver(true)
				return
			}
		}

		// --- DoT damage on foe ---
		if (newFoeDots.length > 0) {
			const dotResult = tickDots(newFoeDots, foe.resistances)
			if (dotResult.damage > 0) {
				newFoeHp = Math.max(0, newFoeHp - dotResult.damage)
				newLogs.push({
					text: `${foe.name} takes ${dotResult.damage} ongoing damage [${dotResult.details.join(", ")}]`,
					type: "player",
				})
			}
			newFoeDots = dotResult.surviving

			if (newFoeDots.length === 0 && dotResult.damage > 0) {
				newLogs.push({ text: `${foe.name}'s lingering effects have worn off.`, type: "info" })
			}

			if (newFoeHp <= 0) {
				newLogs.push({ text: `${foe.name} succumbs to their wounds!`, type: "info" })
				setFoeHp(0)
				setFoeDots(newFoeDots)
				setPlayerCooldowns(newPlayerCooldowns)
				setRound(nextRound)
				addLogs(newLogs)
				setCombatOver(true)
				return
			}
		}

		// --- Foe's turn ---
		const newFoeCooldowns = { ...foeCooldowns }
		const foeAttack = pickFoeAttack(currentRound, foeCooldowns)
		let newPlayerHp = playerHp
		let newPlayerDots = [...playerDots]

		if (!foeAttack) {
			newLogs.push({ text: `${foe.name} hesitates — all attacks on cooldown.`, type: "foe" })
		} else {
			if (foeAttack.cooldown > 0) {
				newFoeCooldowns[foeAttack.name] = nextRound + foeAttack.cooldown
			}

			const foeHits = rollHitCheck(foeAttack.accuracy)
			if (!foeHits) {
				newLogs.push({ text: `${foe.name} uses ${foeAttack.name} but misses!`, type: "foe" })
			} else {
				const playerBlocks = rollHitCheck(classDefense)
				const rawDamage = rollDamage(foeAttack.strength)
				const result = calculateDamage(rawDamage, foeAttack.damageMix, playerResistances, playerBlocks, foeAttack.dotFalloff)

				newPlayerHp = Math.max(0, playerHp - result.total)

				const blockText = playerBlocks ? " (partially blocked)" : ""
				newLogs.push({
					text: `${foe.name} uses ${foeAttack.name}${blockText}: ${result.total} damage [${result.breakdown}]`,
					type: "foe",
				})

				if (result.dots.length > 0) {
					newPlayerDots = [...newPlayerDots, ...result.dots]
					newLogs.push({
						text: `You are afflicted by ${result.dots.map((d) => d.type).join(" and ")}!`,
						type: "foe",
					})
				}
			}
		}

		// --- DoT damage on player ---
		if (newPlayerDots.length > 0) {
			const dotResult = tickDots(newPlayerDots, playerResistances)
			if (dotResult.damage > 0) {
				newPlayerHp = Math.max(0, newPlayerHp - dotResult.damage)
				newLogs.push({
					text: `You take ${dotResult.damage} ongoing damage [${dotResult.details.join(", ")}]`,
					type: "foe",
				})
			}
			newPlayerDots = dotResult.surviving

			if (newPlayerDots.length === 0 && dotResult.damage > 0) {
				newLogs.push({ text: "Your lingering effects have worn off.", type: "info" })
			}
		}

		// --- Apply state ---
		setFoeHp(newFoeHp)
		setPlayerDots(newPlayerDots)
		setFoeDots(newFoeDots)
		setPlayerCooldowns(newPlayerCooldowns)
		setFoeCooldowns(newFoeCooldowns)
		setRound(nextRound)
		addLogs(newLogs)

		if (newPlayerHp <= 0) {
			addLogs([{ text: "You have fallen in combat...", type: "info" }])
			setCombatOver(true)
			saveCharacter({ ...charRecord, hitPoints: 0 })
		} else {
			saveCharacter({ ...charRecord, hitPoints: newPlayerHp })
		}
	}, [combatOver, charRecord, playerResistances, classAttacks, classDefense, round, playerCooldowns, foeCooldowns, foeHp, playerHp, playerDots, foeDots, foe, pickFoeAttack, addLogs, saveCharacter])

	const handleFlee = useCallback(() => {
		if (combatOver || !charRecord || !playerResistances) return

		const nextRound = round + 1
		const newLogs: CombatLogEntry[] = [
			{ text: `Round ${nextRound}`, type: "round" },
			{ text: "You attempt to flee!", type: "player" },
		]

		// Attack of opportunity — foe picks an available attack
		const foeAttack = pickFoeAttack(round, foeCooldowns)
		let newPlayerHp = playerHp

		if (foeAttack) {
			const foeHits = rollHitCheck(foeAttack.accuracy)
			if (!foeHits) {
				newLogs.push({ text: `${foe.name} swings at you as you flee but misses!`, type: "foe" })
			} else {
				const rawDamage = rollDamage(foeAttack.strength)
				const result = calculateDamage(rawDamage, foeAttack.damageMix, playerResistances, false, foeAttack.dotFalloff)
				newPlayerHp = Math.max(0, playerHp - result.total)
				newLogs.push({
					text: `${foe.name} strikes you as you flee: ${result.total} damage [${result.breakdown}]`,
					type: "foe",
				})
			}
		}

		setRound(nextRound)
		addLogs(newLogs)

		if (newPlayerHp <= 0) {
			addLogs([{ text: "You were struck down while fleeing...", type: "info" }])
			setCombatOver(true)
			saveCharacter({ ...charRecord, hitPoints: 0 })
		} else {
			addLogs([{ text: "You manage to escape!", type: "info" }])
			setCombatOver(true)
			saveCharacter({ ...charRecord, hitPoints: newPlayerHp })
		}
	}, [combatOver, charRecord, playerResistances, playerHp, foe, round, foeCooldowns, pickFoeAttack, addLogs, saveCharacter])

	const handleContinue = () => {
		if (playerHp <= 0) {
			navigate(foe.death.route)
		} else if (foeHp <= 0) {
			navigate(foe.victory.route)
		} else {
			navigate(foe.flee.route)
		}
	}

	if (!charRecord || !classAttacks || !playerResistances) {
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
					<p><strong>{foe.name} HP:</strong> {foeHp} / {foe.hitpoints}</p>
					{playerDots.length > 0 && (
						<p><strong>Effects on you:</strong> {playerDots.map((d) => `${d.type} (up to ${d.ceiling})`).join(", ")}</p>
					)}
					{foeDots.length > 0 && (
						<p><strong>Effects on foe:</strong> {foeDots.map((d) => `${d.type} (up to ${d.ceiling})`).join(", ")}</p>
					)}
				</div>

				<div className="combat-log">
					{log.map((entry, i) => (
						entry.type === "round" ? (
							<p key={i} className="combat-log-round">--- {entry.text} ---</p>
						) : (
							<p key={i} className={`combat-log-${entry.type}`}>
								{entry.text}
							</p>
						)
					))}
					<div ref={logEndRef} />
				</div>

				{!combatOver ? (
					<>
						<p>Choose your attack:</p>
						<span className="conversation-controls">
							{classAttacks.map((attack) => {
								const cd = getCooldownRemaining(playerCooldowns, attack.name, round)
								return (
									<Button
										key={attack.name}
										onClick={() => handleAttack(attack)}
										label={cd > 0 ? `${attack.name} (${cd})` : attack.name}
										disabled={cd > 0 || animating}
									/>
								)
							})}
							<Button onClick={handleFlee} label="Flee" disabled={animating} />
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
