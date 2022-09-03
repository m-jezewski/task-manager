import { Link } from "react-router-dom";
import useDataContext from "../../../hooks/useDataContext";
import { Status, Task } from "../../../interfaces";
import styles from './MonthCal.module.scss'

interface TaskBadgeProps {
    task: Task
}

const TaskBadge = ({ task }: TaskBadgeProps) => {

    const { statuses } = useDataContext()

    return (
        <Link
            style={{
                backgroundColor: statuses?.find((status) => status.id! === task.statusId)?.color,
            }}
            onClick={(e) => { e.stopPropagation() }}
            to={`/Dashboard/${task.id}`}
            className={styles.taskBadge}
        />
    );
}

export default TaskBadge;