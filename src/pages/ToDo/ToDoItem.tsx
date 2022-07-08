import styles from './ToDoItem.module.css'
import { Status, Task } from '../../interfaces'
import ChangeTaskStatusBtn from '../../components/ChangeTaskStatusBtn/ChangeTaskStatusBtn';
import ChangeTaskPrioBtn from '../../components/ChangeTaskPrioBtn/ChangeTaskPrioBtn';
import DeleteTaskBtn from '../../components/DeleteTaskBtn/DeleteTaskBtn';
import DraggableContainer from '../../components/DraggableContainer/DraggableContainer';

interface ToDoItemProps {
    todo: Task
}

const ToDoItem = ({ todo }: ToDoItemProps) => {

    return (
        <DraggableContainer
            Parent='tr'
            parentStyles={styles.item}
            task={todo}
        >
            <td />
            <td className={styles.small_cell}>
                <ChangeTaskStatusBtn task={todo} />
            </td>
            <td>
                <p className={styles.item_text}>{todo.text}</p>
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

export default ToDoItem;