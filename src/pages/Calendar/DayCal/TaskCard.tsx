import dayjs, { Dayjs } from "dayjs";
//interfaces
import { Task } from "../../../interfaces";
import { ComponentPropsWithoutRef, forwardRef } from "react";
//hooks
import { useDataContext } from "../../../hooks/useDataContext";
//styles
import styles from './DayCal.module.scss'
import { withTaskLink } from "../../../components/hoc/withTaskLink";

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
            ref={ref}
            {...props}
            className={styles.taskCard}
            style={{
                gridRowStart: fromDate.isSame(date, 'day') ? fromDate.hour() + 1 : 1,
                gridRowEnd: dueDate.isSame(date, 'day') ? dueDate.hour() + 1 : 25,
                backgroundColor: statuses?.find((status) => task.statusId === status.id!)?.color,
            }}
        >
            <p>
                {task.description}
                <br />
                <span className={styles.timeSpan} >
                    {fromDate.format('HH:mm')}-{dueDate.format('HH:mm')}
                    <br />
                    {fromDate.format('DD/MM/RRRR') !== dueDate.format('DD/MM/RRRR') && <>{fromDate.format('DD/MM')}-{dueDate.format('DD/MM')}<br /></>}
                </span>
            </p>
        </div>
    );
})

export const TaskCardLink = withTaskLink(TaskCard)