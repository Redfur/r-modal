import { useCallback, useEffect, useMemo } from "react";
import { CustomModalProps, ModalDescription, ModalRenderFunc } from "./types";
import { createUniqueId } from "./utils";
import { modalsStore } from "./store";

const DEFAULT_PROPS: ModalDescription['defaultProps'] = {};

export const useModal = <P extends CustomModalProps>(modal: ModalRenderFunc<P>, defaultProps?: Partial<P>) => {
    const id = useMemo(() => {
        return createUniqueId();
    }, [])

    useEffect(() => {
        modalsStore.getState().registerModal({
            id,
            defaultProps: defaultProps || DEFAULT_PROPS,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            render: modal,
        });
    }, [defaultProps, id, modal]);
    useEffect(() => {
        return () => {
            modalsStore.getState().unregisterModal(id)
        }
    }, [id])
    const openModal = useCallback((props?: Omit<P['props'], 'id' | 'close' | 'opened'>) => {
        modalsStore.getState().openModal(id, props)
    }, [id])
    const closeModal = useCallback(() => {
        modalsStore.getState().closeModal(id)
    }, [id])
    return [openModal, closeModal] as const;
}