import { createContext, useContext } from "react"

type BackgroundContextType = {
	setBackgroundImage: (bg: string) => void
}

export const BackgroundContext = createContext<BackgroundContextType | null>(null)

export function useBackground() {
	const ctx = useContext(BackgroundContext)
	if (!ctx) throw new Error("useBackground must be used within a StandardPage")
	return ctx
}
