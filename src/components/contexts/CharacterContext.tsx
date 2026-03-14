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
import { toast } from "react-toastify"

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
		if (!character) {
			toast.error("No character loaded!")
			return true
		}
		const existing = character.inventory.find((item) => item.id === itemId)
		if (existing) {
			existing.quantity += quantity
			const name = existing.identified
				? InventoryItem[itemId].identified.name
				: InventoryItem[itemId].unidentified.name
			toast.success(`${name} x${quantity} added to inventory.`)
		} else {
			character.inventory.push({ id: itemId, identified: false, quantity })
			toast.success(`${InventoryItem[itemId].unidentified.name} added to inventory.`)
		}
		saveCharacter({ ...character })
		return true
	}, [character, saveCharacter])

	const removeFromInventory = useCallback((itemId: InventoryItemId, quantity = 1): boolean => {
		if (!character) return false
		const item = character.inventory.find((i) => i.id === itemId)
		if (!item || item.quantity < quantity) return false
		item.quantity -= quantity
		const newInventory = item.quantity <= 0
			? character.inventory.filter((i) => i.id !== itemId)
			: [...character.inventory]
		saveCharacter({ ...character, inventory: newInventory })
		return true
	}, [character, saveCharacter])

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
		if (!character) return false
		const idx = character.inventory.findIndex((item) => item.id === itemId)
		if (idx === -1) return false
		const newInventory = [...character.inventory]
		newInventory[idx] = { ...newInventory[idx], identified: true }
		saveCharacter({ ...character, inventory: newInventory })
		return true
	}, [character, saveCharacter])

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
