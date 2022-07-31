import dayjs, { Dayjs } from "dayjs";
import { useRef } from "react";
import useDataContext from "../../../hooks/useDataContext";
import { Status, Task } from "../../../interfaces";
import styles from './TaskBadge.module.scss'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isBetween)

interface TaskBadgeProps {
    task: Task
    weekDay: Dayjs
    statuses: Status[]
}

const TaskBadge = ({ task, weekDay, statuses }: TaskBadgeProps) => {
    const fromDate = dayjs.unix(task.fromDate!)
    const dueDate = dayjs.unix(task.dueDate!)
    const badgeEl = useRef<HTMLDivElement>(null);
    return (
        <div
            ref={badgeEl}
            className={styles.badge}
            style={{
                gridRowStart: fromDate.isSame(weekDay, 'day') ? fromDate.hour() : 1,
                gridRowEnd: dueDate.isSame(weekDay, 'day') ? dueDate.hour() + 1 : 25,
                backgroundColor: statuses && statuses.filter((status) => status.name === task.status)[0]!.color,
            }}
        >
            {task.description}
        </div>
    );
}

export default TaskBadge;