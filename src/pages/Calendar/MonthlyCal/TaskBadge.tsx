import { useNavigate } from "react-router-dom";
import { Status, Task } from "../../../interfaces";
import styles from './MonthlyCal.module.scss'

interface TaskBadgeProps {
    task: Task
    statuses: Status[]
}

const TaskBadge = ({ task, statuses }: TaskBadgeProps) => {
    const navigate = useNavigate()

    return (
        <div
            style={{
                backgroundColor: statuses.filter((status) => status.name === task.status)[0].color,
            }}
            className={`${styles.taskBadge} darken_hover`}
            onClick={() => { navigate(`/Dashboard/${task.id}`) }}
        />
    );
}

export default TaskBadge;