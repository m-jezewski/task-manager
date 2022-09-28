import dayjs from 'dayjs';
import { forwardRef } from 'react';
//interfaces
import { Task } from '../../interfaces';
import { ComponentPropsWithoutRef } from 'react'
//styles
import styles from './TaskTableItem.module.scss'
//components
import { withDraggable } from '../hoc/withDraggable';
import { TaskDeleteBtn } from '../ui/TaskDeleteBtn/TaskDeleteBtn';
import { TaskPrioChangeBtn } from '../ui/TaskPrioChangeBtn/TaskPrioChangeBtn';
import { TaskStatusChangeBtn } from '../ui/TaskStatusChangeBtn/TaskStatusChangeBtn';
import { withTaskLink } from '../hoc/withTaskLink';

interface TaskTableItemProps {
    task: Task
}

export const TaskTableItem = forwardRef<HTMLTableRowElement, TaskTableItemProps & ComponentPropsWithoutRef<'tr'>>(({ task, ...props }, ref) => {
    return (
        <tr className={styles.tableRow} {...props} ref={ref}>
            <td className={styles.smallCell}>
                <TaskStatusChangeBtn task={task} />
            </td>
            <td>
                <p>{task.description}</p>
            </td>
            <td className={`${styles.smallCell} ${styles.itemDate}`}>
                {task.dueDate ? dayjs.unix(task.dueDate).format('DD/MM') : '-/-'}
            </td>
            <td className={styles.smallCell}>
                <TaskPrioChangeBtn task={task} />
            </td>
            <td className={styles.smallCell}>
                <TaskDeleteBtn task={task} />
            </td>
        </tr>
    );
})

export const LinkTaskTableItem = withTaskLink(TaskTableItem)

export const DraggableLinkTaskTableItem = withTaskLink(withDraggable(TaskTableItem))
