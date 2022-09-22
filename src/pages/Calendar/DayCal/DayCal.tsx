//hooks
import { useCalendarOutletContext } from "../Calendar";
import { useDataContext } from "../../../hooks/useDataContext";
//utils
import { getTasksWithinDay } from '../../../utils/getTasksWithinDay'
import { getHoursOfDate } from "../../../utils/getHoursOfDate";
//styles
import styles from './DayCal.module.scss'
//components
import { TaskCard } from "./TaskCard";
import { SubHeader } from '../Subheader/SubHeader'

export const DayCal = () => {
    const { date } = useCalendarOutletContext()
    const { tasks } = useDataContext()
    const hours = getHoursOfDate(date)

    return (
        <>
            <SubHeader
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
                    <div style={{ gridColumn: 1, gridRowStart: 1, gridRowEnd: 25, }} />
                    {tasks && getTasksWithinDay(tasks, hours).map((task) =>
                        <TaskCard
                            key={task.id}
                            task={task}
                            date={date}
                        />
                    )}
                </div>
            </div>
        </>
    );
}