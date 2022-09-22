//styles
import styles from './MonthCal.module.scss'
//hooks
import { useCalendarOutletContext } from "../Calendar";
import { useDataContext } from "../../../hooks/useDataContext";
import { useNavigate } from "react-router-dom";
//utils
import { getTasksWithinMonth } from '../../../utils/getTasksWithinMonth'
import { getDaysOfMonth } from '../../../utils/getDaysOfMonth'
import { getDaysOfWeek } from "../../../utils/getDaysOfWeek";
//components
import { TaskBadge } from "./TaskBadge";
import { SubHeader } from "../Subheader/SubHeader";

export const MonthCal = () => {
    const navigate = useNavigate()
    const { date } = useCalendarOutletContext()
    const { tasks } = useDataContext()
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
                                    tabIndex={0}
                                    aria-label={`Click to move to ${monthDay.format('YYYY-MM-DD')} day in calendar`}
                                    onClick={() => { navigate(`../../${monthDay.format('DD-MM-YYYY')}/Day`) }}
                                    onKeyDown={(e) => { if (e.key === 'Space' || e.key === 'Enter') navigate(`../../${monthDay.format('DD-MM-YYYY')}/Day`) }}
                                    role='link'
                                >
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