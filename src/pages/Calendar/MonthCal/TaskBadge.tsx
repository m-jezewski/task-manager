//interfaces
import { Task } from "../../../interfaces";
//hooks
import { useDataContext } from "../../../hooks/useDataContext";
//styles
import styles from './MonthCal.module.scss'
//components
import { Link } from "react-router-dom";

interface TaskBadgeProps {
    task: Task
}

export const TaskBadge = ({ task }: TaskBadgeProps) => {
    const { statuses } = useDataContext()

    return (
        <Link
            style={{
                backgroundColor: statuses?.find((status) => status.id! === task.statusId)?.color,
            }}
            onClick={(e) => { e.stopPropagation() }}
            onKeyDown={(e) => { e.stopPropagation() }}
            to={`/Dashboard/${task.id}`}
            className={styles.taskBadge}
            aria-label='Click to move to task page'
        />
    );
}