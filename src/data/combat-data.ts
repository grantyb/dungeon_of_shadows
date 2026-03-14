import type { CharacterClass, CharacterRace } from "./character-data"

export const DamageTypes = ["crushing", "bleeding", "poison", "fire", "electricity", "cold", "water"] as const
export type DamageType = typeof DamageTypes[number]

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

/**
 * Per-damage-type DoT fall-off rate for an attack.
 * 1.0 = no recurring damage (100% fall-off, effect gone after initial hit).
 * 0.5 = damage potential halves each round.
 * 0.25 = damage potential drops to 25% each round (very lingering).
 * Omitted damage types have no DoT.
 */
export type DotFalloff = Partial<Record<DamageType, number>>

export type Attack = {
	name: string
	accuracy: number
	strength: number
	damageMix: DamageMix
	cooldown: number
	/** Optional: which damage types linger as DoT, and their per-round fall-off rate */
	dotFalloff?: DotFalloff
}

export const ClassAttacks: Record<CharacterClass, Attack[]> = {
	warrior: [
		{
			name: "Sword Slash",
			accuracy: 75,
			strength: 45,
			damageMix: { bleeding: 0.7, crushing: 0.3 },
			cooldown: 0,
			dotFalloff: { bleeding: 0.6 },
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
			dotFalloff: { bleeding: 0.5 },
		},
	],
	wizard: [
		{
			name: "Fireball",
			accuracy: 60,
			strength: 55,
			damageMix: { fire: 0.8, crushing: 0.2 },
			cooldown: 2,
			dotFalloff: { fire: 0.5 },
		},
		{
			name: "Lightning Bolt",
			accuracy: 65,
			strength: 50,
			damageMix: { electricity: 0.9, crushing: 0.1 },
			cooldown: 2,
			dotFalloff: { electricity: 0.7 },
		},
		{
			name: "Arcane Blast",
			accuracy: 70,
			strength: 40,
			damageMix: { cold: 0.4, crushing: 0.3, electricity: 0.3 },
			cooldown: 1,
			dotFalloff: { cold: 0.6 },
		},
	],
	rogue: [
		{
			name: "Backstab",
			accuracy: 70,
			strength: 50,
			damageMix: { bleeding: 0.6, crushing: 0.4 },
			cooldown: 1,
			dotFalloff: { bleeding: 0.5 },
		},
		{
			name: "Poison Dart",
			accuracy: 75,
			strength: 40,
			damageMix: { poison: 0.7, crushing: 0.3 },
			cooldown: 3,
			dotFalloff: { poison: 0.4 },
		},
		{
			name: "Dagger Throw",
			accuracy: 70,
			strength: 35,
			damageMix: { bleeding: 0.8, crushing: 0.2 },
			cooldown: 0,
			dotFalloff: { bleeding: 0.7 },
		},
	],
}

export type FoeAttack = Attack

export function rollHit(accuracy: number): boolean {
	return Math.random() * 100 < accuracy
}

/** A DoT effect ticking on a target. `ceiling` is the max random damage this tick. */
export type DotEffect = {
	type: DamageType
	ceiling: number
	falloff: number
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
	dotFalloff?: DotFalloff,
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
				parts.push(`${effectiveDamage} ${type} (${typeDamage} x ${resistance}%)`)
			} else {
				parts.push(`${effectiveDamage} ${type}`)
			}
		} else if (resistance === 0) {
			parts.push(`0 ${type} (immune)`)
		}

		// Create DoT if this attack has a falloff defined for this damage type
		const falloff = dotFalloff?.[type]
		if (falloff !== undefined && falloff < 1.0 && effectiveDamage > 0) {
			dots.push({
				type,
				ceiling: Math.round(effectiveDamage * (1 - falloff)),
				falloff,
			})
		}
	}

	return { total, dots, breakdown: parts.join(", ") }
}

/** Tick all DoT effects. Rolls random damage up to each effect's ceiling, then decays. Resistance is already baked into the ceiling at creation time. */
export function tickDots(effects: DotEffect[]): { damage: number; surviving: DotEffect[]; details: string[] } {
	let damage = 0
	const surviving: DotEffect[] = []
	const damageByType = new Map<DamageType, number>()

	for (const dot of effects) {
		const tickDamage = Math.floor(Math.random() * dot.ceiling) + 1
		damage += tickDamage
		if (tickDamage > 0) {
			damageByType.set(dot.type, (damageByType.get(dot.type) ?? 0) + tickDamage)
		}

		const nextCeiling = Math.floor(dot.ceiling * (1 - dot.falloff))
		if (nextCeiling >= 1) {
			surviving.push({ type: dot.type, ceiling: nextCeiling, falloff: dot.falloff })
		}
	}

	const details = [...damageByType.entries()].map(([type, dmg]) => `${dmg} ${type}`)

	return { damage, surviving, details }
}
