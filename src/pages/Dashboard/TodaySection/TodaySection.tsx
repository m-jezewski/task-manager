import dayjs from "dayjs";
//hooks
import { useDataContext } from "../../../hooks/useDataContext";
//utils
import { getHoursOfDate } from "../../../utils/getHoursOfDate";
import { getTasksWithinDay } from "../../../utils/getTasksWithinDay";
//styles
import styles from './TodaySection.module.scss'
//components
import { DraggableTaskTableItem } from "../../../components/TaskTableItem/TaskTableItem";

export const TodaySection = () => {
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
                            <DraggableTaskTableItem key={task.id} task={task} />
                        )}
                </tbody>
            </table>
        </section>
    );
}