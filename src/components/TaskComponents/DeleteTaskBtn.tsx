import React from 'react'
import useDb from '../../hooks/useDb'
import { GoalStep, Task } from '../../interfaces'
import styles from './DeleteTaskBtn.module.scss'

interface DeleteTaskBtnProps {
    task: Task
    goalStep?: GoalStep
}

const DeleteTaskBtn = ({ task, goalStep }: DeleteTaskBtnProps) => {
    const { removeDocument: removeTask } = useDb('tasks')
    const { removeDocument: removeGoalStep } = useDb('goalSteps')

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        removeTask(task.id!)

        if (goalStep) {
            removeGoalStep(goalStep.id!)
        }
    }

    return (
        <button className={styles.deleteBtn} onClick={handleClick} />
    );
}

export default DeleteTaskBtn;