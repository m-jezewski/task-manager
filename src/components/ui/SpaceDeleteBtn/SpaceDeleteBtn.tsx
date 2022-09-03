import { Space } from "../../../interfaces";
import { useState } from 'react'
import styles from './SpaceDeleteBtn.module.scss'
import { Dialog } from "@headlessui/react";
import useDataContext from "../../../hooks/useDataContext";
import useDb from "../../../hooks/useDb";

interface SpaceDeleteBtnProps {
    space: Space
    buttonStyles?: string
}

const SpaceDeleteBtn = ({ space, buttonStyles }: SpaceDeleteBtnProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const { tasks, statuses } = useDataContext()
    const { removeDocument: removeTask } = useDb('tasks')
    const { removeDocument: removeStatus } = useDb('statuses')
    const { removeDocument: removeSpace } = useDb('spaces')

    const handleDelete = () => {
        tasks?.filter(task => task.spaceId === space.id).forEach(task => removeTask(task.id!))
        statuses?.filter(status => status.spaceId === space.id).forEach(space => removeStatus(space.id!))
        removeSpace(space.id!)
        setIsOpen(false)
    }

    return (
        <>
            <button
                onClick={() => { setIsOpen(true) }}
                className={`${styles.openDialogButton} ${buttonStyles}`}
            />
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className={styles.dialogContainer}
            >
                <Dialog.Panel className={styles.panel}>
                    <Dialog.Title className={styles.title}>Remove Space</Dialog.Title>
                    <Dialog.Description className={styles.description}>
                        This action will pernamently remove this space and all associated with it statuses and tasks.<br />
                        Are you absolutely sure?
                    </Dialog.Description>

                    <button
                        onClick={handleDelete}
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
        </>
    );
}

export default SpaceDeleteBtn;