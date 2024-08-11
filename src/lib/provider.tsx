import { Fragment } from "react"
import { useOpenedModals } from "./useOpenedModals"

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const opened = useOpenedModals()
    return <>
        {children}
        {Object.values(opened).map((modal) => (
            <Fragment key={modal.id}>
                {modal.render(modal.props)}
            </Fragment>
        ))}
    </>
}