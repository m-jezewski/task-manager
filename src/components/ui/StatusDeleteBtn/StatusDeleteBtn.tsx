import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { Status, Task } from "../../../interfaces";
import styles from './StatusDeleteBtn.module.scss'
import useDataContext from "../../../hooks/useDataContext";
import useDb from "../../../hooks/useDb";
import { increment } from "firebase/firestore";

interface DeleteStatusDialogProps {
    status: Status
}


const DeleteStatusDialog = ({ status }: DeleteStatusDialogProps) => {
    const { removeDocument: removeStatus, updateDocument: updateStatus, res } = useDb('statuses') // handle error res here
    const { removeDocument: removeTask } = useDb('tasks')
    const { tasks, statuses } = useDataContext()

    const statusTasks = tasks?.filter(task => task.status === status.name)
    const [isOpen, setIsOpen] = useState(false)

    const handleDelete = () => {
        statuses?.forEach(status => { updateStatus(status.id!, { orderIndex: increment(-1) }) });
        removeStatus(status.id!)
        statusTasks && statusTasks.forEach(task => { removeTask(task.id!) })
        setIsOpen(false)
    }

    return (
        <>
            <button
                onClick={() => { setIsOpen(true) }}
                className={styles.openDialogButton}
            />
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className={styles.dialogContainer}
            >
                <Dialog.Panel className={styles.panel}>
                    <Dialog.Title className={styles.title}>Are you sure?</Dialog.Title>
                    <Dialog.Description className={styles.description}>
                        This action will pernamently remove this status and all associated with it tasks
                    </Dialog.Description>

                    <button
                        onClick={handleDelete}
                        className={styles.removeButton}>
                        Remove
                    </button>
                    <button
                        onClick={() => setIsOpen(false)}
                        className={styles.backButton}>
                        Go back
                    </button>
                </Dialog.Panel>
            </Dialog>
        </>
    );
}

export default DeleteStatusDialog;