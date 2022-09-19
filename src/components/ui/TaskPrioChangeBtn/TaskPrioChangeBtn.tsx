import useDb from "../../../hooks/useDb";
import { Task } from "../../../interfaces";
import styles from './TaskPrioChangeBtn.module.scss'


interface TaskPrioChangeProps {
    task: Task
}

const getPrio = (priority: string) => {
    if (priority === 'low') return 'medium'
    if (priority === 'medium') return 'high'
    if (priority === 'high') return 'low'
    return 'low'
}

const TaskPrioChange = ({ task: { id, priority } }: TaskPrioChangeProps) => {
    const { updateDocument } = useDb('tasks') // handle error res here

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        updateDocument(id!, { priority: getPrio(priority) })
    }

    return (
        <button
            className={`${styles.prioButton} ${styles[priority]}`}
            onClick={handleClick}
        />
    );
}

export default TaskPrioChange;