import React from 'react'
import useDb from '../../hooks/useDb'
import { Task } from '../../interfaces'
import styles from './DeleteTaskBtn.module.scss'

interface DeleteTaskBtnProps {
    task: Task
}

const DeleteTaskBtn = ({ task }: DeleteTaskBtnProps) => {
    const { removeDocument } = useDb('tasks')

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        removeDocument(task.id!)
    }

    return (
        <button className={styles.deleteBtn} onClick={handleClick} />
    );
}

export default DeleteTaskBtn;