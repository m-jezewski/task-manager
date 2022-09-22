import dayjs, { Dayjs } from "dayjs";
//interfaces
import { Task } from "../../../interfaces";
//hooks
import { KeyboardEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../../../hooks/useDataContext";
//utils
import isBetween from 'dayjs/plugin/isBetween'
//styles
import styles from './WeekCal.module.scss'

dayjs.extend(isBetween)

interface TaskCardProps {
    task: Task
    weekDay: Dayjs
}

export const TaskCard = ({ task, weekDay }: TaskCardProps) => {
    const { statuses } = useDataContext()
    const navigate = useNavigate()
    const fromDate = dayjs.unix(task.fromDate!)
    const dueDate = dayjs.unix(task.dueDate!)
    const badgeEl = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        navigate(`/Dashboard/${task.id}`)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.code === 'Space' || e.code === 'Enter') {
            navigate(`/Dashboard/${task.id}`)
        }
    }

    return (
        <div
            ref={badgeEl}
            className={styles.taskCard}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            aria-label='Click to move to task page'
            tabIndex={0}
            role='link'
            style={{
                gridRowStart: fromDate.isSame(weekDay, 'day') ? fromDate.hour() + 1 : 1,
                gridRowEnd: dueDate.isSame(weekDay, 'day') ? dueDate.hour() + 1 : 25,
                backgroundColor: statuses?.find((status) => status.id! === task.statusId)?.color,
            }}
        >
            <p>{task.description}</p>
        </div>
    );
}