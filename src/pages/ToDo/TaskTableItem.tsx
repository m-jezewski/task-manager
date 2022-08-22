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
            <td className={styles.smallCell}>
                <ChangeTaskStatusBtn task={todo} />
            </td>
            <td>
                <p className={styles.itemText}>{todo.description}</p>
            </td>
            <td className={styles.smallCell}>
                <p className={styles.itemDate}>{todo.dueDate ? dayjs.unix(todo.dueDate).format('DD/MM') : '-/-'}</p>
            </td>
            <td className={styles.smallCell}>
                <ChangeTaskPrioBtn task={todo} />
            </td>
            <td className={styles.smallCell}>
                <DeleteTaskBtn task={todo} />
            </td>
        </DraggableContainer >
    );
}

export default TaskTableItem;