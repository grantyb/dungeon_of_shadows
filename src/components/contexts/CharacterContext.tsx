import React, { useCallback, useEffect, useRef, useState } from "react"
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
	const characterRef = useRef(character)
	const [preview, setPreview] = useState<CharacterRecord | null>(null)
	const [inventoryOpen, setInventoryOpen] = useState(false)
	const [combatState, setCombatStateRaw] = useState<CombatState | null>(null)
	const setCombatState = useCallback((state: CombatState | null) => {
		setCombatStateRaw(state)
	}, [])

	useEffect(() => {
		characterRef.current = character
	}, [character])

	const applyUpdate = useCallback((updater: (prev: CharacterRecord) => CharacterRecord): CharacterRecord | undefined => {
		const prev = characterRef.current
		if (!prev) return undefined
		const next = updater(prev)
		if (next === prev) return prev
		persistCharacter(next)
		characterRef.current = next
		setCharacter(next)
		return next
	}, [])

	const saveCharacter = useCallback((record: CharacterRecord) => {
		persistCharacter(record)
		characterRef.current = record
		setCharacter({ ...record })
	}, [])

	const addToInventory = useCallback((itemId: InventoryItemId, quantity = 1): void => {
		const prev = characterRef.current
		if (!prev) return
		const item = InventoryItem[itemId]
		const existing = prev.inventory.find((item) => item.id === itemId)
		if (existing && !item.expendable) {
			const name = existing.identified
				? item.identified.name
				: item.unidentified.name
			toast.success(`${name} is already in your inventory.`)
			return
		}
		let newInventory: typeof prev.inventory
		let toastMessage: string
		if (existing) {
			newInventory = prev.inventory.map((i) =>
				i.id === itemId ? { ...i, quantity: i.quantity + quantity } : i
			)
			const name = existing.identified
				? item.identified.name
				: item.unidentified.name
			toastMessage = `${name} x${quantity} added to inventory.`
		} else {
			newInventory = [...prev.inventory, { id: itemId, identified: false, quantity }]
			toastMessage = `${item.unidentified.name} added to inventory.`
		}
		const next = { ...prev, inventory: newInventory }
		persistCharacter(next)
		characterRef.current = next
		setCharacter(next)
		toast.success(toastMessage)
	}, [])

	const removeFromInventory = useCallback((itemId: InventoryItemId, quantity = 1): boolean => {
		const result = applyUpdate((prev) => {
			const item = prev.inventory.find((i) => i.id === itemId)
			if (!item || item.quantity < quantity) return prev
			const newQuantity = item.quantity - quantity
			const newInventory = newQuantity <= 0
				? prev.inventory.filter((i) => i.id !== itemId)
				: prev.inventory.map((i) => i.id === itemId ? { ...i, quantity: newQuantity } : i)
			return { ...prev, inventory: newInventory }
		})
		return result !== characterRef.current || result !== undefined
	}, [applyUpdate])

	const inventoryContains = useCallback((itemId: InventoryItemId): boolean => {
		const current = characterRef.current
		if (!current) return false
		return current.inventory.some((item) => item.id === itemId)
	}, [])

	const visit = useCallback((sceneId: string): boolean => {
		const current = characterRef.current
		if (!current) return false
		if (current.currentScene === sceneId && current.visitedScenes.includes(sceneId)) return true
		applyUpdate((prev) => {
			if (prev.currentScene === sceneId && prev.visitedScenes.includes(sceneId)) return prev
			const visited = prev.visitedScenes.includes(sceneId)
				? prev.visitedScenes
				: [...prev.visitedScenes, sceneId]
			return { ...prev, currentScene: sceneId, visitedScenes: visited }
		})
		return true
	}, [applyUpdate])

	const identifyItem = useCallback((itemId: InventoryItemId): boolean => {
		const prev = characterRef.current
		if (!prev) return false
		const idx = prev.inventory.findIndex((item) => item.id === itemId)
		if (idx === -1) return false
		applyUpdate((p) => {
			const newInventory = [...p.inventory]
			newInventory[idx] = { ...newInventory[idx], identified: true }
			return { ...p, inventory: newInventory }
		})
		return true
	}, [applyUpdate])

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
