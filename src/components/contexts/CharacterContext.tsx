import React, { useCallback, useRef, useState } from "react"
import {
	CharacterContext,
	loadCharacterFromStorage,
	persistCharacter,
	type CharacterRecord,
	type CombatState,
	type InventoryItemId,
} from "data/character-data"
import { InventoryItem } from "data/inventory-items"
import { toast } from "components/utils/toast"

export const CharacterProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	const [character, setCharacter] = useState<CharacterRecord | undefined>(loadCharacterFromStorage)
	const [preview, setPreview] = useState<CharacterRecord | null>(null)
	const [inventoryOpen, setInventoryOpen] = useState(false)
	const combatStateRef = useRef<CombatState | null>(null)
	const [combatState, setCombatStateRaw] = useState<CombatState | null>(null)
	const setCombatState = useCallback((state: CombatState | null) => {
		combatStateRef.current = state
		setCombatStateRaw(state)
	}, [])

	const saveCharacter = useCallback((record: CharacterRecord) => {
		persistCharacter(record)
		setCharacter({ ...record })
	}, [])

	const updateCharacter = useCallback((updater: (prev: CharacterRecord) => CharacterRecord) => {
		setCharacter((prev) => {
			if (!prev) return prev
			const next = updater(prev)
			persistCharacter(next)
			return next
		})
	}, [])

	const addToInventory = useCallback((itemId: InventoryItemId, quantity = 1): boolean => {
		let added = false
		updateCharacter((prev) => {
			const existing = prev.inventory.find((item) => item.id === itemId)
			let newInventory: typeof prev.inventory
			if (existing) {
				newInventory = prev.inventory.map((i) =>
					i.id === itemId ? { ...i, quantity: i.quantity + quantity } : i
				)
				const name = existing.identified
					? InventoryItem[itemId].identified.name
					: InventoryItem[itemId].unidentified.name
				toast.success(`${name} x${quantity} added to inventory.`)
			} else {
				newInventory = [...prev.inventory, { id: itemId, identified: false, quantity }]
				toast.success(`${InventoryItem[itemId].unidentified.name} added to inventory.`)
			}
			added = true
			return { ...prev, inventory: newInventory }
		})
		return added
	}, [updateCharacter])

	const removeFromInventory = useCallback((itemId: InventoryItemId, quantity = 1): boolean => {
		let removed = false
		updateCharacter((prev) => {
			const item = prev.inventory.find((i) => i.id === itemId)
			if (!item || item.quantity < quantity) return prev
			const newQuantity = item.quantity - quantity
			const newInventory = newQuantity <= 0
				? prev.inventory.filter((i) => i.id !== itemId)
				: prev.inventory.map((i) => i.id === itemId ? { ...i, quantity: newQuantity } : i)
			removed = true
			return { ...prev, inventory: newInventory }
		})
		return removed
	}, [updateCharacter])

	const inventoryContains = useCallback((itemId: InventoryItemId): boolean => {
		if (!character) return false
		return character.inventory.some((item) => item.id === itemId)
	}, [character])

	const visit = useCallback((sceneId: string): boolean => {
		if (!character) return false
		if (character.currentScene === sceneId && character.visitedScenes.includes(sceneId)) return true
		updateCharacter((prev) => {
			if (prev.currentScene === sceneId && prev.visitedScenes.includes(sceneId)) return prev
			const visited = prev.visitedScenes.includes(sceneId)
				? prev.visitedScenes
				: [...prev.visitedScenes, sceneId]
			return { ...prev, currentScene: sceneId, visitedScenes: visited }
		})
		return true
	}, [character, updateCharacter])

	const identifyItem = useCallback((itemId: InventoryItemId): boolean => {
		let identified = false
		updateCharacter((prev) => {
			const idx = prev.inventory.findIndex((item) => item.id === itemId)
			if (idx === -1) return prev
			const newInventory = [...prev.inventory]
			newInventory[idx] = { ...newInventory[idx], identified: true }
			identified = true
			return { ...prev, inventory: newInventory }
		})
		return identified
	}, [updateCharacter])

	return (
		<CharacterContext.Provider value={{
			character,
			preview,
			setPreview,
			saveCharacter,
			addToInventory,
			removeFromInventory,
			inventoryContains,
			visit,
			identifyItem,
			inventoryOpen,
			setInventoryOpen,
			combatState,
			setCombatState,
		}}>
			{children}
		</CharacterContext.Provider>
	)
}
