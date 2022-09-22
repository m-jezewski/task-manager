import { useNavigate, Outlet, useParams, NavLink, useOutletContext } from 'react-router-dom'
import dayjs, { Dayjs } from 'dayjs'
//styles
import styles from './Calendar.module.scss'
//components
import { Layout } from '../../components/Layout/Layout/Layout'
import { CalendarHelp } from './CalendarHelp'


export const useCalendarOutletContext = () => {
    return useOutletContext<{ date: Dayjs }>()
}

export const Calendar = () => {
    const navigate = useNavigate()
    const { date: dateParams } = useParams()
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
                    aria-label='Select date to open it in calendar'
                />
                <CalendarHelp />
            </div>
            <Outlet context={{ date }} />
        </Layout>
    );
}