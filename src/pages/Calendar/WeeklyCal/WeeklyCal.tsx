import dayjs, { Dayjs } from "dayjs";
import { Status, Task } from "../../../interfaces";
import isBetween from 'dayjs/plugin/isBetween'
import styles from './WeeklyCal.module.scss'
import TaskBadge from "./TaskBadge";
import SubHeader from "../SubHeader";
import { Link, useOutletContext } from "react-router-dom";

interface WeeklyCalProps {
    date: Dayjs
    statuses: Status[]
    tasks: Task[]
}

dayjs.extend(isBetween)

const shouldTaskPass = (task: Task, weekDay: Dayjs) => {
    let shouldPass = false
    const from = dayjs.unix(task.fromDate!)
    const due = dayjs.unix(task.dueDate!)
    const weekDayHours: Dayjs[] = []
    for (let i = 1; i < 25; i++) { weekDayHours.push(weekDay.hour(i)) }
    weekDayHours.forEach((hour) => { if (hour.isBetween(from, due) || hour.isSame(due, 'hour')) shouldPass = true })
    return shouldPass
}

const WeeklyCal = () => {
    const { date, tasks, statuses } = useOutletContext() as { date: Dayjs, tasks: Task[], statuses: Status[] }

    const weekDays: Dayjs[] = []
    for (let i = 0; i < 7; i++) { weekDays.push(date.day(i)) }
    const hours: Dayjs[] = []
    for (let i = 1; i < 25; i++) {
        hours.push(date.hour(i))
    }

    const filteredTasks = (weekDay: Dayjs) => {
        return tasks && tasks.filter((task) =>
            task.fromDate &&
            task.dueDate &&
            shouldTaskPass(task, weekDay)
        )
    }

    return (
        tasks && statuses && date && <>
            <SubHeader
                date={date}
                moveBy={'week'}
                dateHeader={`${weekDays[0].format('DD/MM/YY')} - ${weekDays[6].format('DD/MM/YY')}`}
                statuses={statuses}
            />
            <div className={styles.tableHeaders}>
                <span style={{ minWidth: '3rem', width: '3rem' }} />
                {weekDays.map((weekDay) =>
                    <Link
                        key={weekDay.date()}
                        to={`../../${weekDay.format('DD-MM-YYYY')}/Day`}>
                        {weekDay.format('dddd').toUpperCase()}
                    </Link>
                )}
            </div>
            <div className={styles.tableContainer}>
                <table>
                    <tbody>
                        {hours.map((hour) =>
                            <tr key={hour.hour()}>
                                <td className={`${styles.smallCell}`}>{hour.format("HH:00")}</td>
                                {weekDays.map((weekday) => <td key={weekday.date()} />)}
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className={styles.grid}>
                    <>
                        <div style={{ gridColumn: 1 }}></div>
                        {weekDays.map(weekDay =>
                            <div className={styles.weekDayGrid} key={weekDay.date()}>
                                {filteredTasks(weekDay).map((task) => <TaskBadge key={task.id} task={task} weekDay={weekDay} statuses={statuses} />)}
                            </div>
                        )}
                    </>
                </div>
            </div>
        </>
    );
}

export default WeeklyCal;