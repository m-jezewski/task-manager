import dayjs, { Dayjs } from "dayjs";
//interfaces
import { Task } from "../../../interfaces";
//hooks
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { useDataContext } from "../../../hooks/useDataContext";
//utils
import isBetween from 'dayjs/plugin/isBetween'
//styles
import styles from './WeekCal.module.scss'
import { withTaskLink } from "../../../components/hoc/withTaskLink";

dayjs.extend(isBetween)

interface TaskCardProps {
    task: Task
    date: Dayjs
}

const TaskCard = forwardRef<HTMLDivElement, TaskCardProps & ComponentPropsWithoutRef<'div'>>(({ task, date, ...props }, ref) => {
    const { statuses } = useDataContext()
    const fromDate = dayjs.unix(task.fromDate!)
    const dueDate = dayjs.unix(task.dueDate!)

    return (
        <div
            {...props}
            className={styles.taskCard}
            style={{
                gridRowStart: fromDate.isSame(date, 'day') ? fromDate.hour() + 1 : 1,
                gridRowEnd: dueDate.isSame(date, 'day') ? dueDate.hour() + 1 : 25,
                backgroundColor: statuses?.find((status) => status.id! === task.statusId)?.color,
            }}
        >
            <p>{task.description}</p>
        </div>
    );
})

export const TaskCardLink = withTaskLink(TaskCard)