import { Dayjs } from "dayjs";
import TaskCard from "./TaskCard";
import styles from './DayCal.module.scss'
import { Status, Task } from "../../../interfaces";
import SubHeader from '../SubHeader'
import { useOutletContext } from "react-router-dom";
import { getTasksWithinDay } from '../../../utils/getTasksWithinDay'
import { getHoursOfDate } from "../../../utils/getHoursOfDate";

const DayCal = () => {
    const { tasks, statuses, date } = useOutletContext() as { tasks: Task[], statuses: Status[], date: Dayjs }
    const hours = getHoursOfDate(date)
    const filteredTasks = tasks && getTasksWithinDay(tasks, hours)

    return (
        filteredTasks && statuses && date && <>
            <SubHeader
                date={date}
                statuses={statuses}
                moveBy={'day'}
                dateHeader={date.format('dddd DD/MM/YY')}
            />
            <div className={styles.tableContainer}>
                <table>
                    <tbody>
                        {hours.map((hour) => (
                            <tr key={hour.hour()}>
                                <td className={styles.smallCell} >{hour.format('HH:00')}</td>
                                <td></td>
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