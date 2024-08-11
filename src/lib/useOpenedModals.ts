import { useStore } from "zustand"
import { modalsStore } from "./store"

export const useOpenedModals = () => {
    const opened = useStore(modalsStore, (state) => state.openedModals)
    return opened
}