import dayjs from 'dayjs';
import { forwardRef, useRef } from 'react';
import { Task } from '../../interfaces';
import { withDraggable } from '../DragAndDrop/withDraggable';
import TaskDeleteBtn from '../ui/TaskDeleteBtn/TaskDeleteBtn';
import TaskPrioChange from '../ui/TaskPrioChangeBtn/TaskPrioChangeBtn';
import TaskStatusChangeBtn from '../ui/TaskStatusChangeBtn/TaskStatusChangeBtn';
import styles from './TaskTableItem.module.scss'

interface TaskTableItemProps {
    task: Task
}

const TaskTableItem = forwardRef(({ task, ...props }: TaskTableItemProps, ref) => {
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
                <TaskPrioChange task={task} />
            </td>
            <td className={styles.smallCell}>
                <TaskDeleteBtn task={task} />
            </td>
        </tr>
    );
})

const DraggableTaskTableItem = withDraggable(TaskTableItem)

export default DraggableTaskTableItem;