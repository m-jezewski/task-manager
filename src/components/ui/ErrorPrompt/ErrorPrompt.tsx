import { Dialog } from "@headlessui/react";
import useErrorPromptContext from "../../../hooks/useErrorPromptContext";
import styles from './ErrorPrompt.module.scss'

const ErrorPrompt = () => {
    const { isError, setIsError } = useErrorPromptContext()

    return (
        <Dialog as='div' className={styles.dialog} open={isError} onClose={() => { setIsError(false) }}>
            <Dialog.Panel className={styles.panel}>
                <Dialog.Description>
                    Sorry! It looks like an error has occurred.
                </Dialog.Description>

                <button onClick={() => setIsError(false)}>Close</button>
            </Dialog.Panel>
        </Dialog>
    );
}

export default ErrorPrompt;