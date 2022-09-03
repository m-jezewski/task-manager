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
    const btnColor = statuses?.find(status => status.id === task.statusId)!.color

    const handleStatusChange = (statusId: string) => {
        if (statusId !== task.statusId) {
            updateDocument(task.id!, { statusId: statusId })
        }
    }

    return (
        <AnimatedPopover buttonClass={styles.outsideBtn} buttonColor={btnColor}>
            <div className={styles.container}>
                {statuses && statuses.map(({ name, color, id }) => (
                    <button
                        key={id}
                        onClick={(e: React.MouseEvent) => { e.stopPropagation(); handleStatusChange(id!) }}
                        style={{ backgroundColor: color }}>
                        {name}
                    </button>
                ))}
            </div>
        </AnimatedPopover>
    );
}

export default TaskStatusChangeBtn;