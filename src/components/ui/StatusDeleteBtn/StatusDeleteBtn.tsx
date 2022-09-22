import { increment } from "firebase/firestore";
//interfaces
import { Status } from "../../../interfaces";
//hooks
import { useState } from "react";
import { useDataContext } from "../../../hooks/useDataContext";
import { useDb } from "../../../hooks/useDb";
//styles
import styles from './StatusDeleteBtn.module.scss'
//components
import { DeleteModal } from "../../Modals/DeleteModal/DeleteModal";

interface DeleteStatusDialogProps {
    status: Status
}


export const StatusDeleteBtn = ({ status }: DeleteStatusDialogProps) => {
    const { removeDocument: removeStatus, updateDocument: updateStatus } = useDb('statuses')
    const { removeDocument: removeTask } = useDb('tasks')
    const { tasks, statuses } = useDataContext()
    const [isOpen, setIsOpen] = useState(false)

    const handleDelete = () => {
        statuses?.forEach(status => { updateStatus(status.id!, { orderIndex: increment(-1) }) });
        removeStatus(status.id!)
        tasks?.filter(task => task.statusId === status.id).forEach(task => { removeTask(task.id!) })
        setIsOpen(false)
    }

    return (
        <>
            <button
                onClick={() => { setIsOpen(true) }}
                className={styles.openDialogButton}
                aria-label='Click to open window where you can remove status'
            />
            <DeleteModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title='Remove Status'
                description='This action will pernamently remove this status and all associated with it tasks'
                handleDeleteBtnClick={handleDelete}
            />
        </>
    );
}
