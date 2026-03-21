/**
 * Observes the toast container and applies a randomly-generated torn-parchment
 * clip-path to each toast, with wobble density proportional to the element's
 * actual pixel dimensions so horizontal and vertical edges look consistent.
 */

const WOBBLE_PX = 2
const MIN_SPACING_PX = 15
const MAX_SPACING_PX = 40

function wobble(base: number, maxPx: number, sizePx: number): number {
	const offset = (Math.random() * 2 - 1) * maxPx
	const pct = (offset / sizePx) * 100
	return Math.max(0, Math.min(100, base + pct))
}

/** Generate interior wobble points along an edge (excluding the corner endpoints). */
function generateEdgePoints(
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
		const stepPx = MIN_SPACING_PX + Math.random() * (MAX_SPACING_PX - MIN_SPACING_PX)
		const stepPct = (stepPx / edgePx) * 100 * dir
		const next = t + stepPct
		if (dir > 0 ? next >= to : next <= to) break
		t = next
		const w = wobble(fixedPct, WOBBLE_PX, crossPx)
		points.push(axis === "x" ? `${t}% ${w}%` : `${w}% ${t}%`)
	}

	return points
}

function generateClipPath(width: number, height: number): string {
	const corners = ["0% 0%", "100% 0%", "100% 100%", "0% 100%"]

	const top = generateEdgePoints("x", 0, 0, 100, width, height)
	const right = generateEdgePoints("y", 100, 0, 100, height, width)
	const bottom = generateEdgePoints("x", 100, 100, 0, width, height)
	const left = generateEdgePoints("y", 0, 100, 0, height, width)

	return `polygon(${[
		corners[0], ...top,
		corners[1], ...right,
		corners[2], ...bottom,
		corners[3], ...left,
	].join(", ")})`
}

const applied = new WeakSet<Element>()

function applyToToasts() {
	const toasts = document.querySelectorAll<HTMLElement>(".Toastify__toast")
	for (const toast of toasts) {
		if (applied.has(toast)) continue
		applied.add(toast)
		const { width, height } = toast.getBoundingClientRect()
		if (width > 0 && height > 0) {
			toast.style.clipPath = generateClipPath(width, height)
		}
	}
}

export function observeToasts(): () => void {
	const observer = new MutationObserver(() => {
		requestAnimationFrame(applyToToasts)
	})

	observer.observe(document.body, { childList: true, subtree: true })

	return () => observer.disconnect()
}
