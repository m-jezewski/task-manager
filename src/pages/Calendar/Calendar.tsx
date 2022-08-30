import { useNavigate, Outlet, useParams, NavLink, useOutletContext } from 'react-router-dom'
//contexts
import useDataContext from '../../hooks/useDataContext'
//styles
import styles from './Calendar.module.scss'
//dayjs
import dayjs, { Dayjs } from 'dayjs'
//components
import Layout from '../../components/Layout/Layout/Layout'
import { Status, Task } from '../../interfaces'


export const useCalendarOutletContext = () => {
    return useOutletContext<{ date: Dayjs, tasks: Task[] | null, statuses: Status[] | null }>()
}

const Calendar = () => {
    const navigate = useNavigate()
    const { date: dateParams } = useParams()
    const { tasks } = useDataContext()
    const date = dayjs(dateParams, 'DD-MM-YYYY').isValid() ? dayjs(dateParams, 'DD-MM-YYYY') : dayjs()

    const handleChange = (e: any) => {
        navigate(`${dayjs(e.target.value).format('DD-MM-YYYY')}/Day`, { replace: true })
    }

    return (
        <Layout title='Calendar'>
            <div className={styles.calendarNav}>
                <NavLink
                    to={`${date.format('DD-MM-YYYY')}/Day`}
                    className={({ isActive }) => `${styles.tab} ${isActive && styles.tabActive}`}>
                    DAY
                </NavLink>
                <NavLink
                    to={`${date.format('DD-MM-YYYY')}/Week`}
                    className={({ isActive }) => `${styles.tab} ${isActive && styles.tabActive}`}>
                    WEEK
                </NavLink>
                <NavLink
                    to={`${date.format('DD-MM-YYYY')}/Month`}
                    className={({ isActive }) => `${styles.tab} ${isActive && styles.tabActive}`}>
                    MONTH
                </NavLink>
                <input
                    className={styles.dateInput}
                    value={date.format('YYYY-MM-DD')}
                    type={'date'}
                    onChange={handleChange}
                />
            </div>
            <Outlet context={{ date, tasks }} />
        </Layout>
    );
}

export default Calendar;