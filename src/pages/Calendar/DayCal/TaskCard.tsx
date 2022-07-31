import dayjs, { Dayjs } from "dayjs";
import { transform } from "typescript";
import useDataContext from "../../../hooks/useDataContext";
import styles from './TaskCard.module.scss'
import { Status, Task } from "../../../interfaces";

interface TaskCardProps {
    task: Task
    date: Dayjs
    statuses: Status[]
}

const TaskCard = ({ task, date, statuses }: TaskCardProps) => {
    const fromDate = dayjs.unix(task.fromDate!)
    const dueDate = dayjs.unix(task.dueDate!)

    return (
        <div
            className={styles.container}
            style={{
                gridRowStart: fromDate.isSame(date, 'day') ? fromDate.hour() : 1,
                gridRowEnd: dueDate.isSame(date, 'day') ? dueDate.hour() + 1 : 25,
                backgroundColor: statuses.filter((status) => task.status === status.name)[0].color,
            }}
        >
            <p>
                <span className={styles.time_span} >
                    {fromDate.format('HH:mm')}-{dueDate.format('HH:mm')}
                    <br />
                    {fromDate.format('DD/MM/RRRR') !== dueDate.format('DD/MM/RRRR') && <>{fromDate.format('DD/MM')}-{dueDate.format('DD/MM')}<br /></>}
                </span>
                <br />
                {task.description}
                <br>
                </br>
                {dayjs.unix(task.fromDate!).format('DD/MM/YYYY HH:mm')}
                <br></br>
                {dayjs.unix(task.dueDate!).format('DD/MM/YYYY HH:mm')}
            </p>
        </div>
    );
}

export default TaskCard;