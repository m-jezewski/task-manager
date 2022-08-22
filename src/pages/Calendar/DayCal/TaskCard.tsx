import dayjs, { Dayjs } from "dayjs";
import styles from './TaskCard.module.scss'
import { Status, Task } from "../../../interfaces";
import { useNavigate } from "react-router-dom";

interface TaskCardProps {
    task: Task
    date: Dayjs
    statuses: Status[]
}

const TaskCard = ({ task, date, statuses }: TaskCardProps) => {
    const navigate = useNavigate()
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
            onClick={() => { navigate(`/Dashboard/${task.id}`) }}
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
}

export default TaskCard;