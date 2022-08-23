import React from 'react'
import useDb from '../../../hooks/useDb'
import { GoalStep, Task } from '../../../interfaces'
import styles from './TaskDeleteBtn.module.scss'

interface TaskDeleteBtnProps {
    task: Task
    goalStep?: GoalStep
}

const TaskDeleteBtn = ({ task, goalStep }: TaskDeleteBtnProps) => {
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

export default TaskDeleteBtn;