import { FC } from "react";

export type ModalProps = {
    opened: boolean;
    id: string;
    close: () => void;
};

export type ModalStore = {
    registeredModals: {
        [key: string]: ModalDescription
    }
    openedModals: {
        [key: string]: OpenedModalDescription
    },
    registerModal: (modal: ModalDescription) => void,
    unregisterModal: (modalId: string) => void,
    openModal: (id: string, props?: Record<string, unknown>) => void,
    closeModal: (id: string) => void,
}

export type CustomModalProps = {
    [key: string]: unknown;
};
export type OpenedModalProps<P extends CustomModalProps = CustomModalProps> = ModalProps & P;
export type ModalRenderFuncProps<P extends CustomModalProps = CustomModalProps> = ModalProps & P;

export type ModalRenderFunc<P extends CustomModalProps> = FC<ModalRenderFuncProps<P & ModalProps>>;
export type ModalDescription<P extends CustomModalProps = CustomModalProps> = {
    id: string;
    render: ModalRenderFunc<P>;
    defaultProps: P;
};

export type OpenedModalDescription<P extends CustomModalProps = CustomModalProps> = {
    id: string;
    render: ModalRenderFunc<P>;
    props: OpenedModalProps<P>;
}