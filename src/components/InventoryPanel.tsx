import React, { useCallback, useState } from "react"
import { useCharacter, getMaxHp } from "data/character-data"
import { images, type CharacterRecord, type InventoryItemId } from "data/character-data"
import { InventoryItem, type ItemDefinition } from "data/inventory-items"
import type { DamageType, DotEffect } from "data/combat-data"
import classNames from "classnames"
import { toast } from "components/utils/toast"

import burningIcon from "assets/character/status-icons/burning.png"
import bleedingIcon from "assets/character/status-icons/bleeding.png"
import poisonedIcon from "assets/character/status-icons/poisoned.png"
import freezingIcon from "assets/character/status-icons/freezing.png"
import electrifiedIcon from "assets/character/status-icons/electrified.png"
import deadIcon from "assets/character/status-icons/dead.png"

const statusEffectTypes: DamageType[] = ["poison", "cold", "fire", "bleeding", "electricity"]

const statusIcons: Partial<Record<DamageType, string>> = {
	fire: burningIcon,
	bleeding: bleedingIcon,
	poison: poisonedIcon,
	cold: freezingIcon,
	electricity: electrifiedIcon,
}

interface InventoryPanelProps {
	characterRecord: CharacterRecord
}

const InventoryPanel: React.FC<InventoryPanelProps> = ({ characterRecord }) => {
	const [hoveredItem, setHoveredItem] = useState<string | null>(null)

	const { character, inventoryOpen: open, combatState, removeFromInventory, saveCharacter } = useCharacter()

	const inCombat = combatState?.inCombat ?? false
	const maxHp = character ? getMaxHp(character) : 100

	const consumeItem = useCallback((itemId: InventoryItemId) => {
		if (!character) return
		const def: ItemDefinition = InventoryItem[itemId]
		if (!def) return

		if (def.combatOnly && !inCombat) {
			toast.info("Not usable outside of combat.")
			return
		}

		switch (itemId) {
			case "HealingPotion": {
				const heal = Math.floor(Math.random() * 50) + 1
				const currentHp = character.hitPoints
				const newHp = Math.min(maxHp, currentHp + heal)
				saveCharacter({ ...character, hitPoints: newHp })
				removeFromInventory(itemId)
				toast.success(`Healed for ${heal} HP! (${newHp} HP)`)
				break
			}
			case "CauterizingPotion": {
				if (!inCombat || !combatState) {
					toast.info("Not usable outside of combat.")
					return
				}
				const hasBleeding = combatState.playerDots.some((d) => d.type === "bleeding")
				if (!hasBleeding) {
					toast.info("You have no bleeding effects to cure.")
					return
				}
				combatState.onPlayerDotsChange(combatState.playerDots.filter((d) => d.type !== "bleeding"))
				removeFromInventory(itemId)
				toast.success("Bleeding effects removed!")
				break
			}
			case "DowsingPotion": {
				if (!inCombat || !combatState) {
					toast.info("Not usable outside of combat.")
					return
				}
				const hasFire = combatState.playerDots.some((d) => d.type === "fire")
				if (!hasFire) {
					toast.info("You have no burning effects to cure.")
					return
				}
				combatState.onPlayerDotsChange(combatState.playerDots.filter((d) => d.type !== "fire"))
				removeFromInventory(itemId)
				toast.success("Burning effects extinguished!")
				break
			}
			case "AntidotePotion": {
				if (!inCombat || !combatState) {
					toast.info("Not usable outside of combat.")
					return
				}
				const hasPoison = combatState.playerDots.some((d) => d.type === "poison")
				if (!hasPoison) {
					toast.info("You have no poison effects to cure.")
					return
				}
				combatState.onPlayerDotsChange(combatState.playerDots.filter((d) => d.type !== "poison"))
				removeFromInventory(itemId)
				toast.success("Poison neutralised!")
				break
			}
			default: {
				const itemName = def.identified?.name || def.unidentified?.name || itemId
				toast.info(`Used ${itemName}.`)
				break
			}
		}
	}, [character, inCombat, maxHp, saveCharacter, removeFromInventory, combatState])

	return (
		<>
			{open && (
				<div className="inventory-panel">
					<h3>Inventory</h3>
					{characterRecord.inventory.length === 0 ? (
						<p>Your inventory is empty.</p>
					) : (
						<div className="inventory-list">
							{characterRecord.inventory.map((item) => {
								const def = InventoryItem[item.id]
								if (!def) return null
								const info = item.identified ? def.identified : def.unidentified
								const disabled = def.combatOnly && !inCombat

								return (
									<div
										key={item.id}
										className={`inventory-row ${disabled ? "inventory-row-disabled" : ""}`}
										onClick={() => consumeItem(item.id)}
										onMouseEnter={() => setHoveredItem(item.id)}
										onMouseLeave={() => setHoveredItem(null)}
									>
										<img className="inventory-item-image" src={def.image} alt={info.name} />
										<span className="inventory-item-name">{info.name}</span>
										{item.quantity > 1 && (
											<span className="inventory-item-quantity">x{item.quantity}</span>
										)}

										{hoveredItem === item.id && (
											<div className="inventory-tooltip">
												{info.description}
												{disabled && <p className="inventory-tooltip-disabled">Not usable during combat.</p>}
												{def.combatOnly && !inCombat && <p className="inventory-tooltip-disabled">Not usable outside of combat.</p>}
											</div>
										)}
									</div>
								)
							})}
						</div>
					)}
				</div>
			)}
		</>
	)
}

const StatusEffects: React.FC<{ dots: DotEffect[] }> = ({ dots }) => {
	const activeEffects = new Set(dots.map((d) => d.type))

	const damageByCtype = new Map<DamageType, number>()
	for (const dot of dots) {
		damageByCtype.set(dot.type, (damageByCtype.get(dot.type) ?? 0) + dot.ceiling)
	}

	const sortedTypes = [...statusEffectTypes].sort((a, b) => {
		const aActive = activeEffects.has(a)
		const bActive = activeEffects.has(b)
		if (aActive && !bActive) return -1
		if (!aActive && bActive) return 1
		if (aActive && bActive) return (damageByCtype.get(b) ?? 0) - (damageByCtype.get(a) ?? 0)
		return 0
	})

	return (
		<div className="status-effects-slot">
			<div className="status-effects">
				{sortedTypes.map((type) => {
					const active = activeEffects.has(type)
					const damage = damageByCtype.get(type) ?? 0
					return (
						<div key={type} className={classNames("status-icon-wrapper", { "-active": active })}>
							<img
								className="status-icon"
								src={statusIcons[type]!}
								alt={type}
								title={type}
							/>
							{damage > 0 && <span className="status-badge">{damage}</span>}
						</div>
					)
				})}
			</div>
		</div>
	)
}

export const CharacterHud: React.FC<{ characterRecord: CharacterRecord }> = ({ characterRecord }) => {
	const { combatState } = useCharacter()
	const charImageDef = images[characterRecord.race][characterRecord.gender][characterRecord.characterClass]
	const displayName = characterRecord.name || "New Character"
	const maxHp = getMaxHp(characterRecord)
	const currentHp = characterRecord.hitPoints
	const hpPercent = Math.max(0, Math.min(100, (currentHp / maxHp) * 100))
	const isDead = currentHp <= 0

	return (
		<div className="character-hud">
			<div className="character-portrait">
				{isDead
					? <img src={deadIcon} alt="Dead" className="dead" />
					: <img src={charImageDef.src} alt={displayName} style={{ filter: `brightness(${charImageDef.brightness})` }} />
				}
			</div>
			<div className="character-hud-info">
				<div className="character-name">{displayName}</div>
				<div className="health-bar-container">
					<div className="health-bar-fill" style={{ width: `${hpPercent}%` }} />
					<span className="health-bar-text">{currentHp} HP</span>
				</div>
				<StatusEffects dots={combatState?.playerDots ?? []} />
			</div>
		</div>
	)
}

export const FoeHud: React.FC = () => {
	const { combatState } = useCharacter()
	if (!combatState?.inCombat) return null

	const { name, portrait, currentHp, maxHp, dots } = combatState.foe
	const hpPercent = Math.max(0, Math.min(100, (currentHp / maxHp) * 100))

	return (
		<div className="character-hud">
			<div className="character-portrait">
				<img src={portrait} alt={name} />
			</div>
			<div className="character-hud-info">
				<div className="character-name">{name}</div>
				<div className="health-bar-container">
					<div className="health-bar-fill foe-health-bar-fill" style={{ width: `${hpPercent}%` }} />
					<span className="health-bar-text">{currentHp} HP</span>
				</div>
				<StatusEffects dots={dots} />
			</div>
		</div>
	)
}

export default InventoryPanel
