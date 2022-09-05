import styles from './TodaySection.module.scss'
import dayjs from "dayjs";
import TaskTableItem from "../../../components/TaskTableItem/TaskTableItem";
import useDataContext from "../../../hooks/useDataContext";
import { getHoursOfDate } from "../../../utils/getHoursOfDate";
import { getTasksWithinDay } from "../../../utils/getTasksWithinDay";

const TodaySection = () => {
    const { tasks } = useDataContext()
    const todaysTasks = tasks && getTasksWithinDay(tasks, getHoursOfDate(dayjs()))


    return (
        <section className={styles.todaySection}>
            <table>
                <caption className={styles.todaysTasksCaption}>Today's tasks</caption>
                <tbody>
                    {!todaysTasks || todaysTasks.length === 0 ?
                        <tr>
                            <td className={styles.noTasks}>No task has been scheduled for today</td>
                        </tr> :
                        todaysTasks?.map(task =>
                            <TaskTableItem key={task.id} task={task} />
                        )}
                </tbody>
            </table>
        </section>
    );
}

export default TodaySection;