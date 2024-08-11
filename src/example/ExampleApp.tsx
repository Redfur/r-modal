import { ModalProvider, useModal } from "../lib"

type SomeModalProps = {
    title: string;
    onClose: () => void;
}

const SomeModal = ({ title, onClose }: SomeModalProps) => {
    return (
        <div>
            <h1>{title}</h1>
            <button type="button" onClick={onClose}>close</button>
        </div>
    )
}

const useSomeModal = () => {
    return useModal<SomeModalProps>(({ close, opened, title }) => {
        return opened ? <SomeModal title={title} onClose={close} /> : null
    }, { title: "default title" })
}

export const ExampleApp = () => {
    const [open, close] = useSomeModal();
    const [open2, close2] = useSomeModal();
    return (
        <ModalProvider>
            <div>
                <h1>Hello World</h1>
                <button type="button" onClick={() => { open() }}>open withoud props</button>
                <button type="button" onClick={() => { open({ title: "123" }) }}>open with title: 123</button>
                <button type="button" onClick={() => { open({ title: "888" }) }}>open with title: 888</button>
                <button type="button" onClick={close}>close</button>
                <hr />
                <button type="button" onClick={() => { open2() }}>open withoud props</button>
                <button type="button" onClick={() => { open2({ title: "123" }) }}>open with title: 123</button>
                <button type="button" onClick={() => { open2({ title: "888" }) }}>open with title: 888</button>
                <button type="button" onClick={close2}>close</button>
            </div>
        </ModalProvider>
    )
}
