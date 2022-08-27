import React from 'react';
import useDataContext from '../../../hooks/useDataContext';
import useDb from '../../../hooks/useDb';
import { Task } from '../../../interfaces';
import AnimatedPopover from '../../AnimatedPopover/AnimatedPopover'
import styles from './TaskStatusChangeBtn.module.scss'

interface TaskStatusChangeBtnProps {
    task: Task
}

const TaskStatusChangeBtn = ({ task }: TaskStatusChangeBtnProps) => {
    const { updateDocument, res } = useDb('tasks') // handle error res here
    const { statuses } = useDataContext()
    const btnColor = statuses?.find(status => status.name === task.status)!.color

    const handleStatusChange = (status: string) => {
        if (status !== task.status) {
            updateDocument(task.id!, { status: status })
            document.body.focus()
            document.body.click()
        }
    }

    return (
        <AnimatedPopover buttonClass={styles.outsideBtn} buttonColor={btnColor}>
            <div className={styles.container}>
                {statuses && statuses.map(({ name, color, id }) => (
                    <button
                        key={id}
                        onClick={(e: React.MouseEvent) => { e.stopPropagation(); handleStatusChange(name) }}
                        style={{ backgroundColor: color }}>
                        {name}
                    </button>
                ))}
            </div>
        </AnimatedPopover>
    );
}

export default TaskStatusChangeBtn;