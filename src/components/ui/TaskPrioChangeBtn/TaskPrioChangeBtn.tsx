import useDb from "../../../hooks/useDb";
import { Task } from "../../../interfaces";
import styles from './TaskPrioChangeBtn.module.scss'


interface TaskPrioChangeProps {
    task: Task
}

const TaskPrioChange = ({ task }: TaskPrioChangeProps) => {
    const { updateDocument, res } = useDb('tasks') // handle error res here

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        const newPrio = task.priority === 'low' ? 'medium' : task.priority === 'medium' ? 'high' : 'low'
        updateDocument(task.id!, { priority: newPrio })
    }

    return (
        <button
            className={`${styles.prioButton} ${task.priority}_prio`}
            onClick={handleClick}
        />
    );
}

export default TaskPrioChange;