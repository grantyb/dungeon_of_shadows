import { createContext, useContext } from "react"

export const RevealContext = createContext<{ revealed: boolean }>({ revealed: false })

export function useReveal() {
	return useContext(RevealContext)
}
