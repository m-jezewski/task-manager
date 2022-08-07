import dayjs, { Dayjs } from "dayjs";
import useDataContext from "../../../hooks/useDataContext";
import TaskCard from "./TaskCard";
import styles from './DayCal.module.scss'
import isBetween from 'dayjs/plugin/isBetween'
import { Status, Task } from "../../../interfaces";
import SubHeader from '../SubHeader'

interface DayCalProps {
    date: Dayjs
    tasks: Task[]
    statuses: Status[]
}

dayjs.extend(isBetween)

const shouldTaskPass = (task: Task, hours: Dayjs[]) => {
    let shouldPass = false
    const from = dayjs.unix(task.fromDate!)
    const due = dayjs.unix(task.dueDate!)
    hours.forEach((hour) => { if (hour.isBetween(from, due) || hour.isSame(due, 'hour')) shouldPass = true })
    return shouldPass
}

const DayCal = ({ date, statuses, tasks }: DayCalProps) => {

    const hours: Dayjs[] = []
    for (let i = 1; i < 25; i++) { hours.push(date.hour(i)) }

    const filteredTasks = tasks && tasks.filter(task =>
        task.fromDate &&
        task.dueDate &&
        shouldTaskPass(task, hours)
    )

    return (
        <>
            <SubHeader
                date={date}
                statuses={statuses}
                moveBy={'day'}
                dateHeader={date.format('dddd DD/MM/YY')}
            />
            <div className={styles.table_container}>
                <table className={styles.daily_table}>
                    <tbody>
                        {hours.map((hour) => (
                            <tr key={hour.hour()} className={styles.tr}>
                                <td className={`${styles.small_cell} ${styles.td}`} >{hour.format('HH:00')}</td>
                                <td className={styles.td}></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className={styles.grid}>
                    <div style={{ gridColumn: 1, gridRowStart: 1, gridRowEnd: 25, }}></div>
                    {filteredTasks && filteredTasks.map((task) =>
                        <TaskCard key={task.id} task={task} date={date} statuses={statuses} />
                    )}
                </div>
            </div>
        </>
    );
}

export default DayCal;