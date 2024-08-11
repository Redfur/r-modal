import { create } from "zustand"
import { ModalStore } from "./types"
import { devtools } from "zustand/middleware"

export const modalsStore = create<ModalStore>()(devtools((set, get) => ({
    registeredModals: {},
    openedModals: {},
    registerModal: (modal) => set((state) => ({ registeredModals: { ...state.registeredModals, [modal.id]: modal } })),
    unregisterModal: (id) => {
        const registeredModals = { ...get().registeredModals }
        delete registeredModals[id]
        set({ registeredModals })
        const opened = { ...get().openedModals }
        if (opened[id]) {
            delete opened[id]
            set({ openedModals: opened })
        }
    },
    openModal: (id, props = {}) => {
        const registered = get().registeredModals
        const modal = registered[id]
        if (!modal) {
            throw new Error(`Modal ${id} not found`)
        }
        set({
            openedModals: {
                ...get().openedModals,
                [id]: {
                    id: modal.id,
                    render: modal.render,
                    props: {
                        ...modal.defaultProps,
                        ...props,
                        opened: true,
                        id: modal.id,
                        close: () => modalsStore.getState().closeModal(id)
                    },
                }
            }
        })
    },
    closeModal: (id) => {
        const opened = { ...get().openedModals }
        delete opened[id]
        set({ openedModals: opened })
    }
})))


