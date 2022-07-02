import styles from './ToDoItem.module.css'
import { Status, Task } from '../../interfaces'
import AnimatedPopover from '../../components/AnimatedPopover/AnimatedPopover'

//firebase
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

interface ToDoItemProps {
    todo: Task
    statuses: Status[]
    color: string
}

const ToDoItem = ({ todo, statuses, color }: ToDoItemProps) => {
    const ref = doc(collection(db, 'tasks'), todo.id)

    const handlePrioClick = () => {
        const newPrio = todo.priority === 'low' ? 'medium' : todo.priority === 'medium' ? 'high' : 'low'
        updateDoc(ref, { priority: newPrio })
    }

    const handleStatusChange = (status: string) => {
        updateDoc(ref, { status: status })
    }

    const handleRemoveTask = () => {
        deleteDoc(ref)
    }

    return (
        <tr className={styles.item}>
            <td style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}></td>
            <td className={styles.small_cell}>
                <AnimatedPopover buttonStyles='icon' buttonColor={color}>
                    <div className={styles.popover_panel}>
                        {statuses.map(({ status, color, id }) => (
                            <button
                                key={id}
                                onClick={() => { handleStatusChange(status) }}
                                className={styles.popover_button}
                                style={{ backgroundColor: color }}>
                                {status}
                            </button>
                        ))}
                    </div>
                </AnimatedPopover>
            </td>
            <td>
                <p className={styles.item_text}>{todo.text}</p>
            </td>
            <td className={styles.small_cell}>
                <button className={`${todo.priority}_prio icon circle`} onClick={handlePrioClick}></button>
            </td>
            <td className={styles.small_cell}>
                <button className='trashcan icon circle' style={{ border: 'none' }} onClick={handleRemoveTask}></button>
            </td>
        </tr >
    );
}

export default ToDoItem;