import React, { useState, useCallback, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
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

type CombatStep = {
	log?: CombatLogEntry
	apply?: () => void
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
	const stepsRef = useRef<CombatStep[]>([])
	const animatingRef = useRef(false)
	const [animating, setAnimating] = useState(false)

	// Register combat state so the App-level InventoryPanel can use combat potions
	useEffect(() => {
		setCombatState({
			inCombat: !combatOver,
			playerDots,
			onPlayerDotsChange: setPlayerDots,
			foe: {
				name: foe.name,
				portrait: foe.backgroundImage,
				currentHp: foeHp,
				maxHp: foe.hitpoints,
				dots: foeDots,
			},
		})
		return () => { setCombatState(null) }
	}, [combatOver, playerDots, foeHp, foeDots, foe, setCombatState])

	useEffect(() => {
		logEndRef.current?.scrollIntoView({ behavior: "smooth" })
	}, [log, animating])

	const playSteps = useCallback((steps: CombatStep[]) => {
		stepsRef.current = steps
		animatingRef.current = true
		setAnimating(true)

		const playNext = () => {
			const step = stepsRef.current.shift()
			if (!step) {
				animatingRef.current = false
				setAnimating(false)
				return
			}
			if (step.log) setLog((prev) => [...prev, step.log!])
			if (step.apply) step.apply()

			if (step.log) {
				const delay = step.log.type === "round" ? 1000 : 1600
				setTimeout(playNext, delay)
			} else {
				playNext()
			}
		}

		playNext()
	}, [])

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
		if (combatOver || animatingRef.current || !charRecord || !playerResistances || !classAttacks) return

		const currentRound = round
		const nextRound = currentRound + 1
		const steps: CombatStep[] = []

		// Check cooldown
		if (getCooldownRemaining(playerCooldowns, attack.name, currentRound) > 0) return

		// Pre-compute cooldowns
		const newPlayerCooldowns = { ...playerCooldowns }
		if (attack.cooldown > 0) {
			newPlayerCooldowns[attack.name] = nextRound + attack.cooldown
		}

		// Snapshot existing dots — new dots from this round's attacks won't tick
		const existingFoeDots = [...foeDots]
		const existingPlayerDots = [...playerDots]

		// Round header
		steps.push({
			log: { text: `Round ${nextRound}`, type: "round" },
			apply: () => {
				setRound(nextRound)
				setPlayerCooldowns(newPlayerCooldowns)
			},
		})

		// --- Player's attack ---
		const playerHits = rollHitCheck(attack.accuracy)
		let runningFoeHp = foeHp
		let newFoeDotsFromAttack: DotEffect[] = []

		if (!playerHits) {
			steps.push({ log: { text: `You use ${attack.name} but miss!`, type: "player" } })
		} else {
			const foeBlocks = rollHitCheck(foe.defense)
			const rawDamage = rollDamage(attack.strength)
			const result = calculateDamage(rawDamage, attack.damageMix, foe.resistances, foeBlocks, attack.dotFalloff)

			runningFoeHp = Math.max(0, foeHp - result.total)

			const blockText = foeBlocks ? " (partially blocked)" : ""
			const capturedFoeHp = runningFoeHp
			steps.push({
				log: {
					text: `You use ${attack.name}${blockText}: ${result.total} damage [${result.breakdown}]`,
					type: "player",
				},
				apply: () => setFoeHp(capturedFoeHp),
			})

			if (result.dots.length > 0) {
				newFoeDotsFromAttack = result.dots
				const dotsWithNew = [...existingFoeDots, ...newFoeDotsFromAttack]
				const totalDoT = result.dots.reduce((sum, d) => sum + d.ceiling, 0)
				steps.push({
					log: {
						text: `${foe.name} is afflicted by ${result.dots.map((d) => d.type).join(" and ")} and will take up to ${totalDoT} damage next round!`,
						type: "player",
					},
					apply: () => setFoeDots(dotsWithNew),
				})
			}

			if (runningFoeHp <= 0) {
				steps.push({
					log: { text: `${foe.name} has been slain!`, type: "info" },
					apply: () => setCombatOver(true),
				})
				playSteps(steps)
				return
			}
		}

		// --- DoT tick on foe (pre-existing dots only) ---
		let survivingFoeDots = existingFoeDots
		if (existingFoeDots.length > 0) {
			const dotResult = tickDots(existingFoeDots)
			survivingFoeDots = dotResult.surviving
			const finalFoeDots = [...survivingFoeDots, ...newFoeDotsFromAttack]

			if (dotResult.damage > 0) {
				runningFoeHp = Math.max(0, runningFoeHp - dotResult.damage)
				const capturedFoeHp = runningFoeHp
				steps.push({
					log: {
						text: `${foe.name} takes ${dotResult.damage} ongoing damage [${dotResult.details.join(", ")}]`,
						type: "player",
					},
					apply: () => {
						setFoeHp(capturedFoeHp)
						setFoeDots(finalFoeDots)
					},
				})
			} else {
				steps.push({ apply: () => setFoeDots(finalFoeDots) })
			}

			if (survivingFoeDots.length === 0 && dotResult.damage > 0 && newFoeDotsFromAttack.length === 0) {
				steps.push({ log: { text: `${foe.name}'s lingering effects have worn off.`, type: "info" } })
			}

			if (runningFoeHp <= 0) {
				steps.push({
					log: { text: `${foe.name} succumbs to their wounds!`, type: "info" },
					apply: () => setCombatOver(true),
				})
				playSteps(steps)
				return
			}
		}

		// --- Foe's turn ---
		const newFoeCooldowns = { ...foeCooldowns }
		const foeAttack = pickFoeAttack(currentRound, foeCooldowns)
		let runningPlayerHp = playerHp
		let newPlayerDotsFromAttack: DotEffect[] = []

		if (!foeAttack) {
			steps.push({
				log: { text: `${foe.name} hesitates — all attacks on cooldown.`, type: "foe" },
				apply: () => setFoeCooldowns(newFoeCooldowns),
			})
		} else {
			if (foeAttack.cooldown > 0) {
				newFoeCooldowns[foeAttack.name] = nextRound + foeAttack.cooldown
			}

			const foeHits = rollHitCheck(foeAttack.accuracy)
			if (!foeHits) {
				steps.push({
					log: { text: `${foe.name} uses ${foeAttack.name} but misses!`, type: "foe" },
					apply: () => setFoeCooldowns(newFoeCooldowns),
				})
			} else {
				const playerBlocks = rollHitCheck(classDefense)
				const rawDamage = rollDamage(foeAttack.strength)
				const result = calculateDamage(rawDamage, foeAttack.damageMix, playerResistances, playerBlocks, foeAttack.dotFalloff)

				runningPlayerHp = Math.max(0, playerHp - result.total)

				const blockText = playerBlocks ? " (partially blocked)" : ""
				const capturedPlayerHp = runningPlayerHp
				steps.push({
					log: {
						text: `${foe.name} uses ${foeAttack.name}${blockText}: ${result.total} damage [${result.breakdown}]`,
						type: "foe",
					},
					apply: () => {
						setFoeCooldowns(newFoeCooldowns)
						saveCharacter({ ...charRecord, hitPoints: capturedPlayerHp })
					},
				})

				if (result.dots.length > 0) {
					newPlayerDotsFromAttack = result.dots
					const dotsWithNew = [...existingPlayerDots, ...newPlayerDotsFromAttack]
					const totalDoT = result.dots.reduce((sum, d) => sum + d.ceiling, 0)
					steps.push({
						log: {
							text: `You are afflicted by ${result.dots.map((d) => d.type).join(" and ")} and will take up to ${totalDoT} damage next round!`,
							type: "foe",
						},
						apply: () => setPlayerDots(dotsWithNew),
					})
				}
			}
		}

		// --- DoT tick on player (pre-existing dots only) ---
		let survivingPlayerDots = existingPlayerDots
		if (existingPlayerDots.length > 0) {
			const dotResult = tickDots(existingPlayerDots)
			survivingPlayerDots = dotResult.surviving
			const finalPlayerDots = [...survivingPlayerDots, ...newPlayerDotsFromAttack]

			if (dotResult.damage > 0) {
				runningPlayerHp = Math.max(0, runningPlayerHp - dotResult.damage)
				const capturedPlayerHp = runningPlayerHp
				steps.push({
					log: {
						text: `You take ${dotResult.damage} ongoing damage [${dotResult.details.join(", ")}]`,
						type: "foe",
					},
					apply: () => {
						saveCharacter({ ...charRecord, hitPoints: capturedPlayerHp })
						setPlayerDots(finalPlayerDots)
					},
				})
			} else {
				steps.push({
					apply: () => setPlayerDots(finalPlayerDots),
				})
			}

			if (survivingPlayerDots.length === 0 && dotResult.damage > 0 && newPlayerDotsFromAttack.length === 0) {
				steps.push({ log: { text: "Your lingering effects have worn off.", type: "info" } })
			}
		}

		// --- Final ---
		if (runningPlayerHp <= 0) {
			steps.push({
				log: { text: "You have fallen in combat...", type: "info" },
				apply: () => {
					setCombatOver(true)
					saveCharacter({ ...charRecord, hitPoints: 0 })
				},
			})
		} else {
			const finalHp = runningPlayerHp
			steps.push({
				apply: () => saveCharacter({ ...charRecord, hitPoints: finalHp }),
			})
		}

		playSteps(steps)
	}, [combatOver, charRecord, playerResistances, classAttacks, classDefense, round, playerCooldowns, foeCooldowns, foeHp, playerHp, playerDots, foeDots, foe, pickFoeAttack, saveCharacter, playSteps])

	const handleFlee = useCallback(() => {
		if (combatOver || animatingRef.current || !charRecord || !playerResistances) return

		const nextRound = round + 1
		const steps: CombatStep[] = []

		steps.push({
			log: { text: `Round ${nextRound}`, type: "round" },
			apply: () => setRound(nextRound),
		})

		steps.push({ log: { text: "You attempt to flee!", type: "player" } })

		// Attack of opportunity — foe picks an available attack
		const foeAttack = pickFoeAttack(round, foeCooldowns)
		let runningPlayerHp = playerHp

		if (foeAttack) {
			const foeHits = rollHitCheck(foeAttack.accuracy)
			if (!foeHits) {
				steps.push({ log: { text: `${foe.name} swings at you as you flee but misses!`, type: "foe" } })
			} else {
				const rawDamage = rollDamage(foeAttack.strength)
				const result = calculateDamage(rawDamage, foeAttack.damageMix, playerResistances, false, foeAttack.dotFalloff)
				runningPlayerHp = Math.max(0, playerHp - result.total)
				const capturedHp = runningPlayerHp
				steps.push({
					log: {
						text: `${foe.name} strikes you as you flee: ${result.total} damage [${result.breakdown}]`,
						type: "foe",
					},
					apply: () => saveCharacter({ ...charRecord, hitPoints: capturedHp }),
				})
			}
		}

		if (runningPlayerHp <= 0) {
			steps.push({
				log: { text: "You were struck down while fleeing...", type: "info" },
				apply: () => {
					setCombatOver(true)
					saveCharacter({ ...charRecord, hitPoints: 0 })
				},
			})
		} else {
			steps.push({
				log: { text: "You manage to escape!", type: "info" },
				apply: () => {
					setCombatOver(true)
					saveCharacter({ ...charRecord, hitPoints: runningPlayerHp })
				},
			})
		}

		playSteps(steps)
	}, [combatOver, charRecord, playerResistances, playerHp, foe, round, foeCooldowns, pickFoeAttack, saveCharacter, playSteps])

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

				{!combatOver && !animating ? (
					<>
						<p className="combat-action-prompt">Choose your action:
							<span className="conversation-controls">
								{classAttacks.map((attack) => {
									const cd = getCooldownRemaining(playerCooldowns, attack.name, round)
									return (
										<Button
											key={attack.name}
											onClick={() => cd > 0
												? toast.info(`${attack.name} is cooling down. ${cd} round${cd > 1 ? "s" : ""} remaining.`)
												: handleAttack(attack)
											}
											label={cd > 0 ? `${attack.name} (${cd})` : attack.name}
											disabled={false}
										/>
									)
								})}
								<Button onClick={handleFlee} label="Flee" />
							</span>
						</p>
					</>
				) : combatOver ? (
					<span className="conversation-controls">
						<Button onClick={handleContinue} label="Continue" />
					</span>
				) : null}
			</div>
			{props.children}
		</div>
	)
}

export default Combat
