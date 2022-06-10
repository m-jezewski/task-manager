import styles from './ToDoItem.module.css'
import { Todo } from '../interfaces'
import AnimatedPopover from './AnimatedPopover'
import close from './../assets/close.svg'

interface ToDoItemProps {
    todo: Todo
    list: {
        list: Todo[]
        key: string
    }
    status: string
    handleStatusChange: Function
    handlePrioChange: Function
    handleDelete: Function
}

const ToDoItem = ({ todo, handleStatusChange, handlePrioChange, handleDelete, list, status }: ToDoItemProps) => {

    return (
        <tr className={styles.item}>
            <td className={styles.small_cell}>
                <AnimatedPopover buttonStyles={`${styles[status]} ${styles.icon}`}>
                    <div className={styles.popover_panel}>
                        <button onClick={() => { handleStatusChange(todo, list.list, list.key, 'open') }} className={`${styles.popover_button} ${styles.open}`}>OPEN</button>
                        <button onClick={() => { handleStatusChange(todo, list.list, list.key, 'inProgress') }} className={`${styles.popover_button} ${styles.inProgress}`}>IN PROGRESS</button>
                        <button onClick={() => { handleStatusChange(todo, list.list, list.key, 'finished') }} className={`${styles.popover_button} ${styles.finished}`}>FINISHED</button>
                    </div>
                </AnimatedPopover>
            </td>
            <td>
                <p className={styles.item_text}>{todo.text}</p>
            </td>
            <td className={styles.small_cell}>
                <button className={`${styles[`${todo.priority}_prio`]} ${styles.icon} ${styles.circle}`} onClick={() => { handlePrioChange(todo, list.list, list.key) }}></button>
            </td>
            <td className={styles.small_cell}>
                <button className={`${styles.remove} ${styles.icon} ${styles.circle}`} style={{ background: close }} onClick={() => { handleDelete(todo, list.list, list.key) }}></button>
            </td>
        </tr >
    );
}

export default ToDoItem;