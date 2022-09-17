import { useState } from "react";
import { Status } from "../../../interfaces";
import styles from './StatusDeleteBtn.module.scss'
import useDataContext from "../../../hooks/useDataContext";
import useDb from "../../../hooks/useDb";
import { increment } from "firebase/firestore";
import DeleteModal from "../DeleteModal/DeleteModal";

interface DeleteStatusDialogProps {
    status: Status
}


const DeleteStatusDialog = ({ status }: DeleteStatusDialogProps) => {
    const { removeDocument: removeStatus, updateDocument: updateStatus, res } = useDb('statuses') // handle error res here
    const { removeDocument: removeTask } = useDb('tasks')
    const { tasks, statuses } = useDataContext()

    const statusTasks = tasks?.filter(task => task.statusId === status.id)
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

export default DeleteStatusDialog;