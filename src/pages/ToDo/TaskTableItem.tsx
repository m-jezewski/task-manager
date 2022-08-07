import styles from './ToDo.module.scss'
import { Task } from '../../interfaces'
import ChangeTaskStatusBtn from '../../components/TaskComponents/ChangeTaskStatusBtn';
import ChangeTaskPrioBtn from '../../components/TaskComponents/ChangeTaskPrioBtn';
import DeleteTaskBtn from '../../components/TaskComponents/DeleteTaskBtn';
import DraggableContainer from '../../components/DragAndDrop/DraggableContainer';
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
            <td className={styles.small_cell}>
                <ChangeTaskStatusBtn task={todo} />
            </td>
            <td className={styles.td}>
                <p className={styles.item_text}>{todo.description}</p>
            </td>
            <td className={styles.small_cell}>
                <p className={styles.item_date}>{todo.dueDate && dayjs.unix(todo.dueDate).format('DD/MM')}</p>
            </td>
            <td className={styles.small_cell}>
                <ChangeTaskPrioBtn task={todo} />
            </td>
            <td className={styles.small_cell}>
                <DeleteTaskBtn task={todo} />
            </td>
        </DraggableContainer >
    );
}

export default TaskTableItem;