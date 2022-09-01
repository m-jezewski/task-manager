import { Dialog } from "@headlessui/react";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import useDataContext from "../../../hooks/useDataContext";
import useDb from "../../../hooks/useDb";
import { Task } from "../../../interfaces";
import styles from './TaskDeleteModal.module.scss'

interface TaskDeleteModalProps {
    task: Task
}

const TaskDeleteModal = ({ task }: TaskDeleteModalProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const { goalSteps } = useDataContext()
    const navigate = useNavigate()
    const { removeDocument: removeTask } = useDb('tasks')
    const { removeDocument: removeGoalStep } = useDb('goalSteps')

    const handleDelete = () => {
        removeTask(task.id!)
        const goalStep = goalSteps?.find(goalStep => goalStep.type === 'task' && goalStep.taskID === task.id)
        if (goalStep) {
            removeGoalStep(goalStep.id!)
        }
        setIsOpen(false)
        navigate(-1)
    }

    return (
        <>
            <button
                className={styles.openModalButton}
                type='button'
                onClick={() => { setIsOpen(true) }}>
                Delete task
            </button>
            <Dialog
                open={isOpen}
                onClose={() => { setIsOpen(false) }}
                className={styles.dialogContainer}
            >
                <Dialog.Panel className={styles.dialogPanel}>
                    <Dialog.Title className={styles.title}>Remove Task</Dialog.Title>
                    <Dialog.Description>
                        This action will permanently remove this task. <br />
                        If this task was created as a step of goal, it will be also removed from goal page.
                    </Dialog.Description>
                    <button className={styles.removeButton} onClick={handleDelete}>Remove</button>
                    <button className={styles.closeButton} onClick={() => { setIsOpen(false) }}>Cancel</button>
                </Dialog.Panel>
            </Dialog>
        </>
    );
}

export default TaskDeleteModal;