import dayjs from 'dayjs';
import { forwardRef } from 'react';
//interfaces
import { Task } from '../../interfaces';
import { ComponentPropsWithoutRef } from 'react'
//styles
import styles from './TaskTableItem.module.scss'
//components
import { withDraggable } from '../DragAndDrop/withDraggable';
import { TaskDeleteBtn } from '../ui/TaskDeleteBtn/TaskDeleteBtn';
import { TaskPrioChangeBtn } from '../ui/TaskPrioChangeBtn/TaskPrioChangeBtn';
import { TaskStatusChangeBtn } from '../ui/TaskStatusChangeBtn/TaskStatusChangeBtn';

interface TaskTableItemProps {
    task: Task
}

const TaskTableItem = forwardRef(({ task, ...props }: TaskTableItemProps & ComponentPropsWithoutRef<'tr'>, ref) => {
    return (
        <tr className={styles.tableRow} {...props} ref={ref as React.LegacyRef<HTMLTableRowElement>}>
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

export const DraggableTaskTableItem = withDraggable(TaskTableItem)
