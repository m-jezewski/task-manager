import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css'

import calendar from '../../assets/calendar.svg'
import checklist from '../../assets/checklist.svg'
import home from '../../assets/home.svg'
import width from '../../assets/width.svg'
import monitoring from '../../assets/monitoring.svg'

import { useLogout } from '../../hooks/useLogout'

const Sidebar = () => {
    const { logout } = useLogout()

    const handleClick = () => {
        logout()
    }

    return (
        <div className={styles.container}>
            <div>
                <h1>Task Tracker</h1>
                <hr />
                <nav>
                    <Link to='/Dashboard'><img src={home} alt='Dashboard' />Dashboard</Link>
                    <Link to='/Todo'><img src={checklist} alt='Todo List' />To-Do List</Link>
                    <Link to='/Kanban'><img src={width} alt='Kanban board' /> Kanban</Link>
                    <Link to='/Calendar'><img src={calendar} alt='Calendar' />Calendar</Link>
                    <Link to='/Goals'><img src={monitoring} alt='Goals' />Goals</Link>
                </nav>
            </div>
            <div className={styles.settings}>
                <hr />
                <button onClick={handleClick}>LOGOUT</button>
            </div>
        </div>
    );
}

export default Sidebar;