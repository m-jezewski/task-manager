import { Dialog } from "@headlessui/react";
import styles from './DeleteModal.module.scss'

interface DeleteModalProps {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    handleDeleteBtnClick: () => void
    title: string
    description: string
}

const DeleteModal = ({ isOpen, setIsOpen, handleDeleteBtnClick, title, description }: DeleteModalProps) => {
    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className={styles.dialogContainer}
        >
            <Dialog.Panel className={styles.panel}>
                <Dialog.Title className={styles.title}>{title}</Dialog.Title>
                <Dialog.Description className={styles.description}>
                    {description}
                </Dialog.Description>
                <button
                    onClick={handleDeleteBtnClick}
                    className={styles.removeButton}>
                    Remove
                </button>
                <button
                    onClick={() => setIsOpen(false)}
                    className={styles.backButton}>
                    Cancel
                </button>
            </Dialog.Panel>
        </Dialog>
    );
}

export default DeleteModal;