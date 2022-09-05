import React from 'react'
import useDataContext from '../../../hooks/useDataContext'
import useDb from '../../../hooks/useDb'
import { Task } from '../../../interfaces'
import styles from './TaskDeleteBtn.module.scss'

interface TaskDeleteBtnProps {
    task: Task
}

const TaskDeleteBtn = ({ task }: TaskDeleteBtnProps) => {
    const { removeDocument: removeTask } = useDb('tasks')
    const { removeDocument: removeGoalStep } = useDb('goalSteps')
    const { goalSteps } = useDataContext()

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        removeTask(task.id!)

        const goalStep = goalSteps?.find(goalStep => goalStep.type === 'task' && goalStep.taskID === task.id)
        if (goalStep) {
            removeGoalStep(goalStep.id!)
        }
    }

    return (
        <button className={styles.deleteBtn} onClick={handleClick} />
    );
}

export default TaskDeleteBtn;