import dayjs from 'dayjs';
import { Task } from '../../interfaces';
import DraggableContainer from '../DragAndDrop/DraggableContainer/DraggableContainer';
import TaskDeleteBtn from '../ui/TaskDeleteBtn/TaskDeleteBtn';
import TaskPrioChange from '../ui/TaskPrioChangeBtn/TaskPrioChangeBtn';
import TaskStatusChangeBtn from '../ui/TaskStatusChangeBtn/TaskStatusChangeBtn';
import styles from './TaskTableItem.module.scss'

interface TaskTableItemProps {
    task: Task
}

const TaskTableItem = ({ task }: TaskTableItemProps) => {

    return (
        <DraggableContainer task={task} Parent='tr' className={styles.tableRow}>
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
        </DraggableContainer>
    );
}

export default TaskTableItem;