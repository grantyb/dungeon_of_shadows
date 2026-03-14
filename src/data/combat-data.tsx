import type { CharacterClass, CharacterRace } from "./character-data"

export const DamageTypes = ["crushing", "bleeding", "poison", "fire", "electricity", "cold", "water"] as const
export type DamageType = typeof DamageTypes[number]

export const DotDamageTypes: DamageType[] = ["poison", "fire"]

/** Percentage multiplier per damage type. 100 = normal, 0 = immune, 200 = double damage */
export type Resistances = Record<DamageType, number>

export const defaultResistances: Resistances = {
	crushing: 100,
	bleeding: 100,
	poison: 100,
	fire: 100,
	electricity: 100,
	cold: 100,
	water: 100,
}

export const RaceResistances: Record<CharacterRace, Resistances> = {
	human: { ...defaultResistances },
	elf: {
		...defaultResistances,
		cold: 70,
		fire: 120,
	},
	dwarf: {
		...defaultResistances,
		fire: 70,
		crushing: 70,
		electricity: 130,
	},
}

/** Damage mixture: what fraction of the attack's damage is each type. Values should sum to 1. */
export type DamageMix = Partial<Record<DamageType, number>>

export type Attack = {
	name: string
	accuracy: number
	strength: number
	damageMix: DamageMix
	cooldown: number
}

export const ClassAttacks: Record<CharacterClass, Attack[]> = {
	warrior: [
		{
			name: "Sword Slash",
			accuracy: 75,
			strength: 45,
			damageMix: { bleeding: 0.7, crushing: 0.3 },
			cooldown: 0,
		},
		{
			name: "Shield Bash",
			accuracy: 80,
			strength: 40,
			damageMix: { crushing: 1.0 },
			cooldown: 1,
		},
		{
			name: "Heavy Strike",
			accuracy: 65,
			strength: 60,
			damageMix: { crushing: 0.5, bleeding: 0.5 },
			cooldown: 2,
		},
	],
	wizard: [
		{
			name: "Fireball",
			accuracy: 60,
			strength: 55,
			damageMix: { fire: 0.8, crushing: 0.2 },
			cooldown: 2,
		},
		{
			name: "Lightning Bolt",
			accuracy: 65,
			strength: 50,
			damageMix: { electricity: 0.9, crushing: 0.1 },
			cooldown: 2,
		},
		{
			name: "Arcane Blast",
			accuracy: 70,
			strength: 40,
			damageMix: { cold: 0.4, crushing: 0.3, electricity: 0.3 },
			cooldown: 1,
		},
	],
	rogue: [
		{
			name: "Backstab",
			accuracy: 70,
			strength: 50,
			damageMix: { bleeding: 0.6, crushing: 0.4 },
			cooldown: 1,
		},
		{
			name: "Poison Dart",
			accuracy: 75,
			strength: 40,
			damageMix: { poison: 0.7, crushing: 0.3 },
			cooldown: 3,
		},
		{
			name: "Dagger Throw",
			accuracy: 70,
			strength: 35,
			damageMix: { bleeding: 0.8, crushing: 0.2 },
			cooldown: 0,
		},
	],
}

export type FoeAttack = Attack

export function rollHit(accuracy: number): boolean {
	return Math.random() * 100 < accuracy
}

/** A DoT effect ticking on a target. Damage halves each round until < 1. */
export type DotEffect = {
	type: DamageType
	remaining: number
}

/**
 * Calculate damage dealt after applying resistances.
 * Returns total damage and any new DoT effects to apply.
 */
export function calculateDamage(
	rawDamage: number,
	damageMix: DamageMix,
	resistances: Resistances,
	blocked: boolean,
): { total: number; dots: DotEffect[]; breakdown: string } {
	let total = 0
	const dots: DotEffect[] = []
	const parts: string[] = []

	for (const [type, fraction] of Object.entries(damageMix) as [DamageType, number][]) {
		let typeDamage = Math.round(rawDamage * fraction)
		if (blocked) {
			typeDamage = Math.floor(typeDamage / 2)
		}
		const resistance = resistances[type]
		const effectiveDamage = Math.round(typeDamage * resistance / 100)
		total += effectiveDamage

		if (effectiveDamage > 0) {
			if (resistance !== 100) {
				parts.push(`${effectiveDamage} ${type} (${resistance}%)`)
			} else {
				parts.push(`${effectiveDamage} ${type}`)
			}
		} else if (resistance === 0) {
			parts.push(`0 ${type} (immune)`)
		}

		if (DotDamageTypes.includes(type) && effectiveDamage > 0) {
			dots.push({ type, remaining: Math.round(effectiveDamage * 0.5) })
		}
	}

	return { total, dots, breakdown: parts.join(", ") }
}

/** Tick all DoT effects. Returns total damage dealt this round and the surviving effects. */
export function tickDots(effects: DotEffect[], resistances: Resistances): { damage: number; surviving: DotEffect[]; details: string[] } {
	let damage = 0
	const surviving: DotEffect[] = []
	const details: string[] = []

	for (const dot of effects) {
		const resistance = resistances[dot.type]
		const tickDamage = Math.round(dot.remaining * resistance / 100)
		damage += tickDamage
		if (tickDamage > 0) {
			details.push(`${tickDamage} ${dot.type}`)
		}

		const nextRemaining = Math.floor(dot.remaining / 2)
		if (nextRemaining >= 1) {
			surviving.push({ type: dot.type, remaining: nextRemaining })
		}
	}

	return { damage, surviving, details }
}
