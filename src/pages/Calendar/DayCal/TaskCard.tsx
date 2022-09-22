import dayjs, { Dayjs } from "dayjs";
import styles from './TaskCard.module.scss'
import { Status, Task } from "../../../interfaces";
import { useNavigate } from "react-router-dom";
import useDataContext from "../../../hooks/useDataContext";

interface TaskCardProps {
    task: Task
    date: Dayjs
}

const TaskCard = ({ task, date }: TaskCardProps) => {
    const navigate = useNavigate()
    const { statuses } = useDataContext()
    const fromDate = dayjs.unix(task.fromDate!)
    const dueDate = dayjs.unix(task.dueDate!)

    return (
        <div
            className={styles.container}
            style={{
                gridRowStart: fromDate.isSame(date, 'day') ? fromDate.hour() + 1 : 1,
                gridRowEnd: dueDate.isSame(date, 'day') ? dueDate.hour() + 1 : 25,
                backgroundColor: statuses?.find((status) => task.statusId === status.id!)?.color,
            }}
            onClick={() => { navigate(`/Dashboard/${task.id}`) }}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === 'Space') navigate(`/Dashboard/${task.id}`) }}
            aria-label={'Click to move to task page'}
            role='link'
            tabIndex={0}
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