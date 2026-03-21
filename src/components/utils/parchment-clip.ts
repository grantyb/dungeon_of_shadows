/**
 * Observes the toast container and applies a randomly-generated torn-parchment
 * clip-path to each toast, with wobble density proportional to the element's
 * actual pixel dimensions so horizontal and vertical edges look consistent.
 *
 * Uses a seeded PRNG per element so that when an element grows (e.g. conversation
 * paragraphs revealed), the top and upper side edges stay visually stable.
 */

const WOBBLE_PX = 2
const MIN_SPACING_PX = 15
const MAX_SPACING_PX = 40

/** Simple mulberry32 seeded PRNG — returns a function that yields 0..1 each call. */
function mulberry32(seed: number): () => number {
	let s = seed | 0
	return () => {
		s = (s + 0x6d2b79f5) | 0
		let t = Math.imul(s ^ (s >>> 15), 1 | s)
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296
	}
}

function wobble(rand: () => number, base: number, maxPx: number, sizePx: number): number {
	const offset = (rand() * 2 - 1) * maxPx
	const pct = (offset / sizePx) * 100
	return Math.max(0, Math.min(100, base + pct))
}

/** Generate interior wobble points along an edge (excluding the corner endpoints). */
function generateEdgePoints(
	rand: () => number,
	axis: "x" | "y",
	fixedPct: number,
	from: number,
	to: number,
	edgePx: number,
	crossPx: number,
): string[] {
	const points: string[] = []
	const dir = Math.sign(to - from)
	let t = from

	while (true) {
		const stepPx = MIN_SPACING_PX + rand() * (MAX_SPACING_PX - MIN_SPACING_PX)
		const stepPct = (stepPx / edgePx) * 100 * dir
		const next = t + stepPct
		if (dir > 0 ? next >= to : next <= to) break
		t = next
		const w = wobble(rand, fixedPct, WOBBLE_PX, crossPx)
		points.push(axis === "x" ? `${t}% ${w}%` : `${w}% ${t}%`)
	}

	return points
}

type EdgeSeeds = { top: number; right: number; bottom: number; left: number }

function generateClipPath(width: number, height: number, seeds: EdgeSeeds): string {
	const corners = ["0% 0%", "100% 0%", "100% 100%", "0% 100%"]

	const top = generateEdgePoints(mulberry32(seeds.top), "x", 0, 0, 100, width, height)
	const right = generateEdgePoints(mulberry32(seeds.right), "y", 100, 0, 100, height, width)
	const bottom = generateEdgePoints(mulberry32(seeds.bottom), "x", 100, 100, 0, width, height)
	const left = generateEdgePoints(mulberry32(seeds.left), "y", 0, 100, 0, height, width)

	return `polygon(${[
		corners[0], ...top,
		corners[1], ...right,
		corners[2], ...bottom,
		corners[3], ...left,
	].join(", ")})`
}

const PARCHMENT_SELECTOR = ".Toastify__toast, .conversation"

const elementSeeds = new WeakMap<Element, EdgeSeeds>()

function getSeedsFor(el: Element): EdgeSeeds {
	let seeds = elementSeeds.get(el)
	if (!seeds) {
		seeds = {
			top: Math.random() * 4294967296,
			right: Math.random() * 4294967296,
			bottom: Math.random() * 4294967296,
			left: Math.random() * 4294967296,
		}
		elementSeeds.set(el, seeds)
	}
	return seeds
}

function applyParchmentClip() {
	const elements = document.querySelectorAll<HTMLElement>(PARCHMENT_SELECTOR)
	for (const el of elements) {
		const { width, height } = el.getBoundingClientRect()
		if (width <= 0 || height <= 0) continue

		const sizeKey = `${Math.round(width)}x${Math.round(height)}`
		if (el.dataset.parchmentSize === sizeKey) {
			// Same dimensions — re-apply cached clip-path (react-toastify may strip inline styles)
			el.style.clipPath = el.dataset.parchmentClip!
			continue
		}

		const seeds = getSeedsFor(el)
		const clip = generateClipPath(width, height, seeds)
		el.dataset.parchmentClip = clip
		el.dataset.parchmentSize = sizeKey
		el.style.clipPath = clip
	}
}

export function observeToasts(): () => void {
	// Apply immediately to any elements already in the DOM
	requestAnimationFrame(applyParchmentClip)

	const observer = new MutationObserver(() => {
		requestAnimationFrame(applyParchmentClip)
	})

	observer.observe(document.body, { childList: true, subtree: true })

	return () => observer.disconnect()
}
