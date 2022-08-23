import { Link } from "react-router-dom";
import { Status, Task } from "../../../interfaces";
import styles from './MonthCal.module.scss'

interface TaskBadgeProps {
    task: Task
    statuses: Status[]
}

const TaskBadge = ({ task, statuses }: TaskBadgeProps) => {
    return (
        <Link
            style={{
                backgroundColor: statuses.filter((status) => status.name === task.status)[0].color,
            }}
            onClick={(e) => { e.stopPropagation() }}
            to={`/Dashboard/${task.id}`}
            className={styles.taskBadge}
        />
    );
}

export default TaskBadge;