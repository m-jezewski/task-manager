import { Dayjs } from "dayjs";
import { Status, Task } from "../../../interfaces";
import styles from './WeekCal.module.scss'
import TaskBadge from "./TaskBadge";
import SubHeader from "../SubHeader";
import { Link, useOutletContext } from "react-router-dom";
import { getTasksWithinWeek } from '../../../utils/getTasksWithinWeek'
import { getDaysOfWeek } from "../../../utils/getDaysOfWeek";
import { getHoursOfDate } from "../../../utils/getHoursOfDate";

const WeekCal = () => {
    const { date, tasks, statuses } = useOutletContext() as { date: Dayjs, tasks: Task[], statuses: Status[] }
    const weekDays: Dayjs[] = getDaysOfWeek(date)
    const hours = getHoursOfDate(date)

    return (
        tasks && statuses && date && <>
            <SubHeader
                date={date}
                moveBy={'week'}
                dateHeader={`${weekDays[0].format('DD/MM/YY')} - ${weekDays[6].format('DD/MM/YY')}`}
                statuses={statuses}
            />
            <div className={styles.tableHeaders}>
                <span />
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
                                {getTasksWithinWeek(tasks, weekDay).map((task) => <TaskBadge key={task.id} task={task} weekDay={weekDay} statuses={statuses} />)}
                            </div>
                        )}
                    </>
                </div>
            </div>
        </>
    );
}

export default WeekCal;