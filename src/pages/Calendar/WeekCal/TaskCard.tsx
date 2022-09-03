import dayjs, { Dayjs } from "dayjs";
import { useRef } from "react";
import { Status, Task } from "../../../interfaces";
import styles from './WeekCal.module.scss'
import isBetween from 'dayjs/plugin/isBetween'
import { useNavigate } from "react-router-dom";
import useDataContext from "../../../hooks/useDataContext";

dayjs.extend(isBetween)

interface TaskCardProps {
    task: Task
    weekDay: Dayjs
}

const TaskCard = ({ task, weekDay }: TaskCardProps) => {
    const { statuses } = useDataContext()
    const navigate = useNavigate()
    const fromDate = dayjs.unix(task.fromDate!)
    const dueDate = dayjs.unix(task.dueDate!)
    const badgeEl = useRef<HTMLDivElement>(null);
    return (
        <div
            ref={badgeEl}
            className={styles.taskCard}
            onClick={() => { navigate(`/Dashboard/${task.id}`) }}
            style={{
                gridRowStart: fromDate.isSame(weekDay, 'day') ? fromDate.hour() : 1,
                gridRowEnd: dueDate.isSame(weekDay, 'day') ? dueDate.hour() + 1 : 25,
                backgroundColor: statuses?.find((status) => status.id! === task.statusId)?.color,
            }}
        >
            {task.description}
        </div>
    );
}

export default TaskCard;