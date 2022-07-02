import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { Status, Task } from "../../interfaces";
import styles from './DeleteStatusDialog.module.css'
import { collection, deleteDoc, doc, increment, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

interface DeleteStatusDialogProps {
    status: Status
    statuses: Status[]
    filteredTasks: Task[]
}


const DeleteStatusDialog = ({ status, statuses, filteredTasks }: DeleteStatusDialogProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleDelete = () => {
        const statusCol = collection(db, 'statuses')
        const taskCol = collection(db, 'tasks')

        statuses.forEach(status => {
            updateDoc(doc(statusCol, status.id), {
                orderIndex: increment(-1)
            })
        });
        deleteDoc(doc(statusCol, status.id))
        filteredTasks.forEach(task => {
            deleteDoc(doc(taskCol, task.id))
        })
        setIsOpen(false)
    }

    return (
        <>
            <button
                onClick={() => { setIsOpen(true) }}
                className='remove icon'
            />
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className={styles.container}
            >
                <Dialog.Panel className={styles.panel}>
                    <Dialog.Title className={styles.title}>Are you sure?</Dialog.Title>
                    <Dialog.Description className={styles.description}>
                        This action will pernamently remove this status and all associated with it tasks
                    </Dialog.Description>

                    <button
                        onClick={handleDelete}
                        className={styles.remove_button}>
                        Remove
                    </button>
                    <button
                        onClick={() => setIsOpen(false)}
                        className={styles.back_button}>
                        Go back
                    </button>
                </Dialog.Panel>
            </Dialog>
        </>
    );
}

export default DeleteStatusDialog;