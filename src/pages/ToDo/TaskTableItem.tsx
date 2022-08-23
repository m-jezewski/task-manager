import styles from './ToDo.module.scss'
import { Task } from '../../interfaces'
import TaskStatusChangeBtn from '../../components/ui/TaskStatusChangeBtn/TaskStatusChangeBtn';
import TaskPrioChangeBtn from '../../components/ui/TaskPrioChangeBtn/TaskPrioChangeBtn';
import TaskDeleteBtn from '../../components/ui/TaskDeleteBtn/TaskDeleteBtn';
import DraggableContainer from '../../components/DragAndDrop/DraggableContainer/DraggableContainer';
import dayjs from 'dayjs';

interface TaskTableItemProps {
    todo: Task
}

const TaskTableItem = ({ todo }: TaskTableItemProps) => {

    return (
        <DraggableContainer
            Parent='tr'
            parentStyles={styles.taskTableItem}
            task={todo}
        >
            <td />
            <td className={styles.smallCell}>
                <TaskStatusChangeBtn task={todo} />
            </td>
            <td>
                <p className={styles.itemText}>{todo.description}</p>
            </td>
            <td className={styles.smallCell}>
                <p className={styles.itemDate}>{todo.dueDate ? dayjs.unix(todo.dueDate).format('DD/MM') : '-/-'}</p>
            </td>
            <td className={styles.smallCell}>
                <TaskPrioChangeBtn task={todo} />
            </td>
            <td className={styles.smallCell}>
                <TaskDeleteBtn task={todo} />
            </td>
        </DraggableContainer >
    );
}

export default TaskTableItem;