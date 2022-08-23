import dayjs, { Dayjs } from "dayjs";
import weekOfYear from 'dayjs/plugin/weekOfYear'
import isBetween from 'dayjs/plugin/isBetween'
import { Status, Task } from "../../../interfaces";
import styles from './MonthCal.module.scss'
import TaskBadge from "./TaskBadge";
import SubHeader from "../SubHeader";
import { useNavigate, useOutletContext } from "react-router-dom";

dayjs.extend(isBetween)
dayjs.extend(weekOfYear)

const shouldTaskPass = (task: Task, monthDay: Dayjs) => {
    let shouldPass = false
    const from = dayjs.unix(task.fromDate!)
    const due = dayjs.unix(task.dueDate!)
    if (monthDay.format('DD/MM/YYYY') === from.format('DD/MM/YYYY')
        || monthDay.format('DD/MM/YYYY') === due.format('DD/MM/YYYY')
        || monthDay.isBetween(from, due)) shouldPass = true
    return shouldPass
}

const MonthCal = () => {
    const navigate = useNavigate()
    const { date, tasks, statuses } = useOutletContext() as { date: Dayjs, tasks: Task[], statuses: Status[] }
    const monthDays: Dayjs[] = []
    const filteredTasks = (monthDay: Dayjs) => { return tasks.filter(task => task.dueDate && task.fromDate && shouldTaskPass(task, monthDay)) }
    for (let i = 1; i < date.daysInMonth() + 1; i++) { monthDays.push(date.date(i)) }
    const weekDays: Dayjs[] = []
    for (let i = 0; i < 7; i++) { weekDays.push(date.day(i)) }
    const weeks = monthDays
        .map(monthDay => monthDay.week())
        .filter((value, index, self) => self.indexOf(value) === index)

    return (
        tasks && statuses && date && <>
            <SubHeader
                date={date}
                moveBy={'month'}
                dateHeader={date.format('MMMM YYYY')}
                statuses={statuses}
            />
            <div className={styles.week}>
                {weekDays.map(weekDay =>
                    <div
                        key={weekDay.date()}
                        className={styles.weekDayHeader}>
                        {weekDay.format('dddd').toUpperCase()}
                    </div>)}
            </div>
            {weeks.map(week =>
                <div className={styles.week} key={week}>
                    {monthDays
                        .filter((monthDay) => monthDay.week() === week)
                        .map(monthDay =>
                            <div
                                key={monthDay.date()}
                                className={styles.day}
                                onClick={() => { navigate(`../../${monthDay.format('DD-MM-YYYY')}/Day`) }}>
                                <span>
                                    {monthDay.format('YYYY-MM-DD')}
                                </span>
                                <div className={styles.taskBadgeContainer}>
                                    {filteredTasks(monthDay).map((task) => <TaskBadge key={task.id} task={task} statuses={statuses} />)}
                                </div>
                            </div>)}
                </div>
            )}
        </>
    );
}

export default MonthCal;