import { Link } from 'react-router-dom';
import styles from './Sidebar.module.scss'
import calendar from '../../../assets/calendar.svg'
import checklist from '../../../assets/checklist.svg'
import home from '../../../assets/home.svg'
import width from '../../../assets/width.svg'
import monitoring from '../../../assets/monitoring.svg'
import { useLogout } from '../../../hooks/useLogout'
import dayjs from 'dayjs';

const Sidebar = () => {
    const { logout } = useLogout()

    return (
        <div className={styles.container}>
            <div>
                <span className={styles.logo}>Taskify</span>
                <hr />
                <nav>
                    <Link to='/Dashboard'><img src={home} alt='Dashboard' />Dashboard</Link>
                    <Link to='/Todo'><img src={checklist} alt='Todo List' />To-Do List</Link>
                    <Link to='/Kanban'><img src={width} alt='Kanban board' /> Kanban</Link>
                    <Link to={`/Calendar/${dayjs().format('DD-MM-YYYY')}/Day`}><img src={calendar} alt='Calendar' />Calendar</Link>
                    <Link to='/Goals'><img src={monitoring} alt='Goals' />Goals</Link>
                </nav>
            </div>
            <div className={styles.settings}>
                <button onClick={() => { logout() }}>LOGOUT</button>
            </div>
        </div>
    );
}

export default Sidebar;