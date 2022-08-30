import dayjs, { Dayjs } from "dayjs";
import { Status, Task } from "../../../interfaces";
import styles from './MonthCal.module.scss'
import TaskBadge from "./TaskBadge";
import SubHeader from "../SubHeader";
import { useNavigate, useOutletContext } from "react-router-dom";
import { getTasksWithinMonth } from '../../../utils/getTasksWithinMonth'
import { getDaysOfMonth } from '../../../utils/getDaysOfMonth'
import { getDaysOfWeek } from "../../../utils/getDaysOfWeek";
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { useCalendarOutletContext } from "../Calendar";
dayjs.extend(weekOfYear)

const MonthCal = () => {
    const navigate = useNavigate()
    const { date, tasks } = useCalendarOutletContext()
    const monthDays = getDaysOfMonth(date)
    const weekDays = getDaysOfWeek(date)
    const weeksId = monthDays.map(monthDay => monthDay.week()).filter((value, index, self) => self.indexOf(value) === index)

    return (
        <>
            <SubHeader
                moveBy={'month'}
                dateHeader={date.format('MMMM YYYY')}
            />
            <div className={styles.calendarWrapper}>
                <div className={styles.week}>
                    {weekDays.map(weekDay =>
                        <div
                            key={weekDay.date()}
                            className={styles.weekDayHeader}>
                            {weekDay.format('dddd').toUpperCase()}
                        </div>)}
                </div>
                {weeksId.map(weekId =>
                    <div className={styles.week} key={weekId}>
                        {monthDays
                            .filter((monthDay) => monthDay.week() === weekId)
                            .map(monthDay =>
                                <div
                                    key={monthDay.date()}
                                    className={styles.day}
                                    onClick={() => { navigate(`../../${monthDay.format('DD-MM-YYYY')}/Day`) }}>
                                    <span>
                                        {monthDay.format('YYYY-MM-DD')}
                                    </span>
                                    <div className={styles.taskBadgeContainer}>
                                        {tasks && getTasksWithinMonth(tasks, monthDay).map((task) =>
                                            <TaskBadge
                                                key={task.id}
                                                task={task}
                                            />)}
                                    </div>
                                </div>)}
                    </div>
                )}
            </div>
        </>
    );
}

export default MonthCal;